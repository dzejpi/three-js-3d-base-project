import { useEffect } from 'react';
import { useRapier } from '@react-three/rapier';
import { setRapierWorld } from './physicsContext';

// To be placed in <Physics>
export function PhysicsBridge() {
	const { world } = useRapier();

	useEffect(() => {
		setRapierWorld(world);
	}, [world]);

	return null;
}
