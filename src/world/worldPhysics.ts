import { Mesh, Box3, Vector3, Quaternion } from 'three';
import { getRapierWorld } from './physicsContext';

const worldBodies: any[] = [];
const worldColliders: any[] = [];

export function createFixedBody(position: Vector3, rotation: Quaternion) {
	const world = getRapierWorld();
	const body = world.createRigidBody({
		type: 'fixed',
		translation: position,
		rotation: rotation,
	});

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

	const collider = world.createCollider({ type: 'trimesh', vertices, indices }, body);

	worldColliders.push(collider);
}

export function createPrimitiveCollider(mesh: Mesh) {
	const world = getRapierWorld();
	mesh.updateWorldMatrix(true, false);

	const position = mesh.getWorldPosition(new Vector3());
	const rotation = mesh.getWorldQuaternion(new Quaternion());
	const scale = mesh.getWorldScale(new Vector3());

	const body = createFixedBody(position, rotation);
	const name = mesh.name;

	let colliderDesc: any;

	// Box collider
	if (name.startsWith('COL_BOX_')) {
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		colliderDesc = {
			type: 'cuboid',
			halfExtents: [size.x / 2, size.y / 2, size.z / 2],
		};
	} else if (name.startsWith('COL_SPH_')) {
		// Sphere collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		const radius = Math.max(size.x, size.y, size.z) / 2;

		colliderDesc = {
			type: 'ball',
			radius,
		};
	} else if (name.startsWith('COL_CAP_')) {
		// Capsule collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		const radius = Math.max(size.x, size.z) / 2;
		const halfHeight = Math.max(0, size.y / 2 - radius);

		colliderDesc = {
			type: 'capsule',
			halfHeight,
			radius,
		};
	} else if (name.startsWith('COL_CYL_')) {
		// Cylinder collider
		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		const radius = Math.max(size.x, size.z) / 2;
		const halfHeight = size.y / 2;

		colliderDesc = {
			type: 'cylinder',
			halfHeight,
			radius,
		};
	} else if (name.startsWith('COL_MESH_')) {
		// Mesh collider
		const geometry = mesh.geometry;
		const vertices = geometry.attributes.position.array;
		const indices = geometry.index?.array;

		colliderDesc = {
			type: 'trimesh',
			vertices,
			indices,
		};
	} else {
		// Fallback to box collider
		console.warn(`Unknown collider prefix on "${name}", falling back to box`);

		const box = new Box3().setFromObject(mesh);
		const size = new Vector3();
		box.getSize(size);

		colliderDesc = {
			type: 'cuboid',
			halfExtents: [size.x / 2, size.y / 2, size.z / 2],
		};
	}

	const collider = world.createCollider(colliderDesc, body);
	worldColliders.push(collider);
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
