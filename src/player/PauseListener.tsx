import { useFrame } from '@react-three/fiber';
import { input } from '../config/input/inputManager';

interface PauseListenerProps {
	paused: boolean;
	onPause: () => void;
	onResume: () => void;
}

export default function PauseListener({ paused, onPause, onResume }: PauseListenerProps) {
	useFrame(() => {
		const pauseAction = input.get('pause');
		if (pauseAction.justPressed) {
			if (paused) onResume();
			else onPause();
		}
	});

	return null;
}
