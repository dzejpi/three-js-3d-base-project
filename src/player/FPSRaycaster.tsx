import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

interface FPSRaycasterProps {
	onTargetChange: (target: THREE.Intersection | null) => void;
	maxDistance?: number;
}

const SCREEN_CENTER = new THREE.Vector2(0, 0);

export default function FPSRaycaster({ onTargetChange, maxDistance = 3 }: FPSRaycasterProps) {
	const { camera, scene } = useThree();
	const raycaster = useRef(new THREE.Raycaster());
	const lastTargetRef = useRef<THREE.Object3D | null>(null);

	useFrame(() => {
		raycaster.current.setFromCamera(SCREEN_CENTER, camera);
		raycaster.current.far = maxDistance;
		const intersects = raycaster.current.intersectObjects(scene.children, true);

		// Raycaster can hit invisible objects (hidden COL_ collider meshes), skip them
		const hit = intersects.find(i => i.object.visible) ?? null;
		const target = hit?.object ?? null;

		// Only report when the target changes
		if (target !== lastTargetRef.current) {
			lastTargetRef.current = target;
			onTargetChange(hit);
		}
	});

	return null;
}
