import React, { useEffect, useState } from 'react';
import TestingWorld from '../world/TestingWorld';
import PauseMenu from './PauseMenu';
import PlayerController from '../player/PlayerController';
import { Physics } from '@react-three/rapier';
import { Canvas } from '@react-three/fiber';
import PlayerUi from '../ui/PlayerUi';
import InputUpdater from '../config/input/InputUpdater';
import PauseListener from '../player/PauseListener';

interface Props {
	onExit: () => void;
}

export default function Game({ onExit }: Props) {
	const [paused, setPaused] = useState(false);

	// Pressing Escape while the pointer is locked just releases the lock, so, pause the game when the lock is lost
	useEffect(() => {
		const handleLockChange = () => {
			if (!document.pointerLockElement) setPaused(true);
		};

		document.addEventListener('pointerlockchange', handleLockChange);
		return () => document.removeEventListener('pointerlockchange', handleLockChange);
	}, []);

	return (
		<>
			<Canvas camera={{ position: [0, 2, 5], fov: 75 }} style={{ position: 'fixed', inset: 0, background: 'skyblue' }}>
				<InputUpdater />
				<PauseListener paused={paused} setPaused={setPaused} />

				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 10, 5]} />

				<Physics gravity={[0, -9.81, 0]}>
					{/* The 3D test world */}
					<TestingWorld onStart={() => {}} />

					{/* Player controller */}
					<PlayerController />
				</Physics>
			</Canvas>

			<PlayerUi hidden={paused} />

			{/* Pause overlay */}
			{paused && (
				<PauseMenu
					onResume={() => {
						setPaused(false);
						const canvas = document.querySelector('canvas');
						if (canvas) canvas.requestPointerLock();
					}}
					onMainMenu={onExit}
				/>
			)}
		</>
	);
}
