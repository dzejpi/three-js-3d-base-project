import React, { useEffect, useState } from 'react';
import TestingWorld from '../world/TestingWorld';
import PauseMenu from './PauseMenu';
import GeneralGameButton from '../ui/GeneralGameButton';
import PlayerController from '../player/PlayerController';
import { Physics } from '@react-three/rapier';
import { Canvas } from '@react-three/fiber';

interface Props {
	onExit: () => void;
}

export default function Game({ onExit }: Props) {
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
				setPaused(p => !p);
				if (!paused) {
					// Unlock pointer when pausing
					document.exitPointerLock();
				} else {
					// Re-lock pointer when unpausing
					const canvas = document.querySelector('canvas');
					if (canvas) canvas.requestPointerLock();
				}
			}
		};

		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [paused]);

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas
				camera={{ position: [0, 2, 5], fov: 75 }}
				style={{ width: '100vw', height: '100vh', background: 'skyblue' }}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[5, 10, 5]} />

				<Physics gravity={[0, -9.81, 0]}>
					{/* The 3D test world */}
					<TestingWorld onStart={() => {}} />

					{/* Player controller */}
					<PlayerController />
				</Physics>
			</Canvas>

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

			{/* Temporary exit button overlay */}
			<div
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					padding: '8px 12px',
				}}
			>
				<GeneralGameButton onClick={onExit}>Exit</GeneralGameButton>
			</div>
		</div>
	);
}
