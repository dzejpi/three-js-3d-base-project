import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

interface FPSRaycasterProps {
	onTargetChange: (target: THREE.Intersection | null) => void;
}

export default function FPSRaycaster({ onTargetChange }: FPSRaycasterProps) {
	const { camera, scene } = useThree();
	const raycaster = useRef(new THREE.Raycaster());
	const screenCenter = new THREE.Vector2(0, 0);

	useFrame(() => {
		raycaster.current.setFromCamera(screenCenter, camera);
		const intersects = raycaster.current.intersectObjects(scene.children, true);

		if (intersects.length > 0) {
			onTargetChange(intersects[0]);
		} else {
			onTargetChange(null);
		}
	});

	return null;
}
