import { useFrame, useThree } from '@react-three/fiber';
import { input } from '../config/input/inputManager';

interface PauseListenerProps {
	setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PauseListener({ setPaused }: PauseListenerProps) {
	const canvas = useThree(state => state.gl.domElement);

	useFrame(() => {
		const pauseAction = input.get('pause');
		if (pauseAction.justPressed) {
			setPaused(p => {
				if (canvas) {
					if (p) {
						// Resume
						canvas.requestPointerLock();
					} else {
						// Pause
						document.exitPointerLock();
					}
				}
				return !p;
			});
		}
	});

	return null;
}
