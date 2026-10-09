import { useFrame } from '@react-three/fiber';
import { input } from './inputManager';

// Update every frame, negative priority to ensure input is updated before other components read it
export default function InputUpdater() {
	useFrame(() => {
		input.update();
	}, -1);

	return null;
}
