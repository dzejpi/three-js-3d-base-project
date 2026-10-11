import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { RigidBody } from '@react-three/rapier';
import { createColliderDef, type ColliderDef } from './modelColliders';
import { ModelCollider } from './ModelLoader';

type WorldLoaderProps = {
	worldPath: string;
};

const NO_SCALE = new Vector3(1, 1, 1);

export function WorldLoader({ worldPath }: WorldLoaderProps) {
	const { scene } = useGLTF(worldPath);

	const colliders = useMemo(() => {
		const defs: ColliderDef[] = [];

		scene.traverse(obj => {
			if (obj instanceof Mesh) defs.push(createColliderDef(obj, 'trimesh', scene, NO_SCALE));
		});

		return defs;
	}, [scene]);

	return (
		<RigidBody type="fixed" colliders={false}>
			<primitive object={scene} />

			{colliders.map(def => (
				<ModelCollider key={def.node.uuid} def={def} />
			))}
		</RigidBody>
	);
}
