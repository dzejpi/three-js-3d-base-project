import { Mesh, Box3, Vector3, Quaternion } from 'three';
import { getRapierWorld } from './physicsContext';
import * as RAPIER from '@dimforge/rapier3d-compat';

const worldBodies: any[] = [];
const worldColliders: any[] = [];

type PrimitiveColliderParams = {
	mesh: Mesh;
	// Rapier RigidBody
	rigidBody: any;
};

export function createFixedBody(position: Vector3, rotation: Quaternion) {
	const world = getRapierWorld();
	const body = world.createRigidBody(
		RAPIER.RigidBodyDesc.fixed().setTranslation(position.x, position.y, position.z).setRotation(rotation)
	);

	worldBodies.push(body);
	return body;
}

export function createTerrainCollider(mesh: Mesh) {
	const world = getRapierWorld();
	mesh.updateWorldMatrix(true, false);

	const position = mesh.getWorldPosition(new Vector3());
	const rotation = mesh.getWorldQuaternion(new Quaternion());

	const body = createFixedBody(position, rotation);

	const geometry = mesh.geometry;
	const vertices = geometry.attributes.position.array;
	const indices = geometry.index?.array;

	const collider = world.createCollider(
		RAPIER.ColliderDesc.trimesh(vertices as Float32Array, indices as Uint32Array),
		body
	);

	worldColliders.push(collider);
}

export function createPrimitiveCollider({ mesh, rigidBody }: PrimitiveColliderParams) {
	const world = getRapierWorld();
	if (!world) return null;

	mesh.updateWorldMatrix(true, false);
	const scale = mesh.getWorldScale(new Vector3());

	if (!rigidBody) {
		rigidBody = createFixedBody(mesh.getWorldPosition(new Vector3()), mesh.getWorldQuaternion(new Quaternion()));
	}

	const name = mesh.name;
	let desc: RAPIER.ColliderDesc | null = null;

	if (name.startsWith('COL_BOX_')) {
		// Box collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		desc = RAPIER.ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2);
	} else if (name.startsWith('COL_SPH_')) {
		// Sphere collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		const radius = Math.max(size.x, size.y, size.z) / 2;
		desc = RAPIER.ColliderDesc.ball(radius);
	} else if (name.startsWith('COL_CAP_')) {
		// Capsule collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		const radius = Math.max(size.x, size.z) / 2;
		const halfHeight = Math.max(0, size.y / 2 - radius);

		desc = RAPIER.ColliderDesc.capsule(halfHeight, radius);
	} else if (name.startsWith('COL_CYL_')) {
		// Cyllinder collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		const radius = Math.max(size.x, size.z) / 2;
		const halfHeight = size.y / 2;

		desc = RAPIER.ColliderDesc.cylinder(halfHeight, radius);
	} else if (name.startsWith('COL_MESH_')) {
		// Mesh collider
		const geom = mesh.geometry;
		const pos = geom.attributes.position;

		if (!geom.index) return null;

		const vertices = new Float32Array(pos.count * 3);
		for (let i = 0; i < pos.count; i++) {
			vertices[i * 3 + 0] = pos.getX(i) * scale.x;
			vertices[i * 3 + 1] = pos.getY(i) * scale.y;
			vertices[i * 3 + 2] = pos.getZ(i) * scale.z;
		}

		desc = RAPIER.ColliderDesc.trimesh(vertices, new Uint32Array(geom.index.array as Iterable<number>));
	} else {
		// Fallback to box collider
		console.warn(`Unknown collider prefix on "${name}", falling back to box`);

		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		desc = RAPIER.ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2);
	}

	if (!desc) return null;

	const collider = world.createCollider(desc, rigidBody);
	return collider;
}

export function destroyWorldColliders() {
	const world = getRapierWorld();

	for (const collider of worldColliders) {
		world.removeCollider(collider, true);
	}
	for (const body of worldBodies) {
		world.removeRigidBody(body);
	}

	worldColliders.length = 0;
	worldBodies.length = 0;
}
