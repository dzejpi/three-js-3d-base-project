import { useFrame, useThree } from '@react-three/fiber';
import { input } from '../config/InputManager';

interface PauseListenerProps {
	setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PauseListener({ setPaused }: PauseListenerProps) {
	const canvas = useThree(state => state.gl.domElement);

	useFrame(() => {
		input.update();
		const pauseAction = input.actions.get('pause')!;
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
