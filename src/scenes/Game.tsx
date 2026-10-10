import React, { useEffect, useState } from 'react';
import TestingWorld from '../world/TestingWorld';
import PauseMenu from './PauseMenu';
import PlayerController from '../player/PlayerController';
import { Physics } from '@react-three/rapier';
import { Canvas } from '@react-three/fiber';
import PlayerUi from '../ui/PlayerUi';
import InputUpdater from '../config/input/InputUpdater';
import PauseListener from '../player/PauseListener';
import { input } from '../config/input/inputManager';

interface Props {
	onExit: () => void;
}

export default function Game({ onExit }: Props) {
	const [paused, setPaused] = useState(false);

	// Pressing Escape while the pointer is locked just releases the lock. Pause the game when the lock is lost, unpause otherwise
	useEffect(() => {
		const handleLockChange = () => {
			setPaused(!document.pointerLockElement);
		};

		document.addEventListener('pointerlockchange', handleLockChange);
		return () => document.removeEventListener('pointerlockchange', handleLockChange);
	}, []);

	const pause = () => {
		document.exitPointerLock();
		setPaused(true);
	};

	const resume = () => {
		const canvas = document.querySelector('canvas');

		// Pointer lock needs a user gesture (mouse/keyboard), gamepad input doesn't count as one.
		// Without it, resume right away and the pointer gets locked on the next click on the canvas.
		// Same when Escape is held, the browser would release the lock right after acquiring it
		if (!canvas || navigator.userActivation?.isActive === false || input.isKeyDown('Escape')) {
			setPaused(false);
			return;
		}

		// Keep the game paused if there's a browser's cooldown
		Promise.resolve(canvas.requestPointerLock()).catch(() => {});
	};

	return (
		<>
			<Canvas camera={{ position: [0, 2, 5], fov: 75 }} className="fixed! inset-0 bg-[skyblue]">
				<InputUpdater />
				<PauseListener paused={paused} onPause={pause} onResume={resume} />

				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 10, 5]} />

				<Physics gravity={[0, -9.81, 0]}>
					{/* The 3D test world */}
					<TestingWorld onStart={() => {}} />

					{/* Player controller */}
					<PlayerController paused={paused} />
				</Physics>
			</Canvas>

			<PlayerUi hidden={paused} />

			{/* Pause overlay */}
			{paused && <PauseMenu onResume={resume} onMainMenu={onExit} />}
		</>
	);
}
