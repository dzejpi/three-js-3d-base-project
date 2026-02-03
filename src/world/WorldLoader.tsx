import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { createTerrainCollider, createPrimitiveCollider, destroyWorldColliders } from './worldPhysics';

type WorldLoaderProps = {
	world_path: string;
};

/*
    Loads a GLTF world and sets up colliders based on mesh name prefixes:
    TER_ -> Detailed terrain collider
    COL_ -> Primitive collider
    No prefix -> Visible object with no collider 
*/
export function WorldLoader({ world_path }: WorldLoaderProps) {
	const { scene } = useGLTF(world_path);

	useEffect(() => {
		// Clear out any existing colliders
		destroyWorldColliders();

		scene.traverse(obj => {
			if (!(obj instanceof Mesh)) return;

			const name = obj.name;

			if (name.startsWith('TER_')) {
				createTerrainCollider(obj);
			}

			if (name.startsWith('COL_')) {
				createPrimitiveCollider({ mesh: obj, rigidBody: undefined });
				// Hide collider mesh
				obj.visible = false;
			}
		});

		return () => {
			destroyWorldColliders();
		};
	}, [scene]);

	return <primitive object={scene as Group} />;
}
