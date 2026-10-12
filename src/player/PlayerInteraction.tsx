import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import type { Object3D } from 'three';
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
	const targetRef = useRef<Object3D | null>(null);
	const focusedRef = useRef<Interactable | null>(null);

	useFrame(() => {
		// Looked up every frame, not only when the target changes. The object can also change its interaction
		const interactable = findInteractable(targetRef.current);

		// Several meshes can belong to one interactable, only report when it actually changes
		if (interactable !== focusedRef.current) {
			focusedRef.current = interactable;
			onFocusChange(interactable);
		}

		if (paused || !interactable) return;

		if (input.get('interact').justPressed) {
			interactable.interact();
		}
	});

	return (
		<FPSRaycaster
			maxDistance={maxDistance}
			onTargetChange={hit => {
				// Report to console for debugging
				console.log('Looking at:', hit?.object.name || null);

				targetRef.current = hit?.object ?? null;
			}}
		/>
	);
}
