import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { createPrimitiveCollider } from './worldPhysics';

type ModelType = 'dynamic' | 'kinematic' | 'static';

export type LoadedModel = {
	scene: THREE.Group;
	// Rapier RigidBody API
	body: any;
	colliders: any[];
	animations?: ReturnType<typeof useAnimations>['actions'];
};

type ModelLoaderProps = {
	modelPath: string;

	type?: ModelType;
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];

	enabled?: boolean;
	debugColliders?: boolean;

	onLoaded?: (model: LoadedModel) => void;
};

export function ModelLoader({
	modelPath,
	type = 'dynamic',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	scale = 1,
	enabled = true,
	debugColliders = false,
	onLoaded,
}: ModelLoaderProps) {
	if (!enabled) return null;

	const groupRef = useRef<THREE.Group>(null);
	const rigidBodyRef = useRef<any>(null);

	const { scene, animations } = useGLTF(modelPath);
	const { actions } = useAnimations(animations, groupRef);

	useEffect(() => {
		if (!groupRef.current || !rigidBodyRef.current) return;

		const colliders: any[] = [];

		scene.traverse(obj => {
			if (!(obj instanceof THREE.Mesh)) return;

			if (!obj.name.startsWith('COL_')) return;

			// Hide or show collider meshes
			obj.visible = debugColliders;

			const collider = createPrimitiveCollider({
				mesh: obj,
				rigidBody: rigidBodyRef.current,
			});

			if (collider) colliders.push(collider);
		});

		onLoaded?.({
			scene: groupRef.current,
			body: rigidBodyRef.current,
			colliders,
			animations: actions,
		});
	}, [scene, actions, onLoaded, debugColliders]);

	// No RigidBodyType import
	const bodyType = type === 'dynamic' ? 'dynamic' : type === 'kinematic' ? 'kinematicPosition' : 'fixed';

	return (
		<RigidBody
			ref={rigidBodyRef}
			type={bodyType}
			position={position}
			rotation={rotation}
			// We generate colliders manually
			colliders={false}
		>
			<group ref={groupRef} scale={scale}>
				<primitive object={scene} />
			</group>
		</RigidBody>
	);
}
