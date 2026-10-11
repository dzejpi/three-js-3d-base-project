import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import FPSRaycaster from './FPSRaycaster';
import { input } from '../config/input/inputManager';
import { findInteractable, type Interactable } from '../world/interactable';

interface Props {
	paused: boolean;
	onFocusChange: (interactable: Interactable | null) => void;
	maxDistance?: number;
}

// Find the interactable the player is looking at and trigger with interact key
export default function PlayerInteraction({ paused, onFocusChange, maxDistance = 3 }: Props) {
	const focusedRef = useRef<Interactable | null>(null);

	useFrame(() => {
		if (paused || !focusedRef.current) return;

		if (input.get('interact').justPressed) {
			focusedRef.current.interact();
		}
	});

	return (
		<FPSRaycaster
			maxDistance={maxDistance}
			onTargetChange={hit => {
				// Report to console for debugging
				console.log('Looking at:', hit?.object.name || null);

				const interactable = findInteractable(hit?.object ?? null);

				// The raycaster reports every new mesh, several meshes can belong to one interactable
				if (interactable !== focusedRef.current) {
					focusedRef.current = interactable;
					onFocusChange(interactable);
				}
			}}
		/>
	);
}
