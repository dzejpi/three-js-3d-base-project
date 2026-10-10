import { useFrame, useThree } from '@react-three/fiber';
import { input } from '../config/input/inputManager';

interface PauseListenerProps {
	paused: boolean;
	setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PauseListener({ paused, setPaused }: PauseListenerProps) {
	const canvas = useThree(state => state.gl.domElement);

	useFrame(() => {
		const pauseAction = input.get('pause');
		if (pauseAction.justPressed) {
			if (paused) {
				// Resume
				canvas.requestPointerLock();
			} else {
				// Pause
				document.exitPointerLock();
			}
			setPaused(!paused);
		}
	});

	return null;
}
