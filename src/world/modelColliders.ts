import * as THREE from 'three';

/*
    Collider meshes are modelled in Blender and exported with the model. The name prefix picks the shape:
    COL_BOX_     -> cuboid, fitted to the mesh bounds
    COL_SPHERE_  -> ball, fitted to the mesh bounds
    COL_CAPSULE_ -> capsule along the local Y axis (Blender's Z axis, the glTF exporter converts Z-up to Y-up)
    COL_HULL_    -> convex hull of the mesh vertices
    COL_*        -> exact triangle mesh (static and kinematic only, dynamic bodies fall back to hull)

    Parent collider meshes to the object they belong to in Blender (e.g. COL_BOX_door under obj_door),
    so they follow it when it's animated.
*/
export const COLLIDER_PREFIX = 'COL_';

export type ColliderShape = 'cuboid' | 'ball' | 'capsule' | 'hull' | 'trimesh';

export function getColliderShape(name: string): ColliderShape {
	if (name.startsWith('COL_BOX_')) return 'cuboid';
	if (name.startsWith('COL_SPHERE_')) return 'ball';
	if (name.startsWith('COL_CAPSULE_')) return 'capsule';
	if (name.startsWith('COL_HULL_')) return 'hull';
	return 'trimesh';
}

type ColliderBase = {
	name: string;
	// The collider mesh in the model, followed when the model is animated
	node: THREE.Mesh;
	// Center of the primitive shape in the mesh's local space
	center: THREE.Vector3;
	// Pose relative to the rigid body
	position: THREE.Vector3;
	quaternion: THREE.Quaternion;
};

export type ColliderDef = ColliderBase &
	(
		| { shape: 'cuboid'; args: [number, number, number] }
		| { shape: 'ball'; args: [number] }
		| { shape: 'capsule'; args: [number, number] }
		| { shape: 'hull'; args: [Float32Array] }
		| { shape: 'trimesh'; args: [Float32Array, Uint32Array] }
	);

const _matrix = new THREE.Matrix4();
const _scaleMatrix = new THREE.Matrix4();

// Pose of the collider relative to the model root, with the model scale applied. Uses local matrices,
// so it works before the model is mounted and right after the animation mixer moved the nodes
export function getColliderPose(
	def: Pick<ColliderBase, 'node' | 'center'>,
	root: THREE.Object3D,
	modelScale: THREE.Vector3,
	outPosition: THREE.Vector3,
	outQuaternion: THREE.Quaternion,
	outScale: THREE.Vector3
) {
	_matrix.makeTranslation(def.center.x, def.center.y, def.center.z);

	for (let obj: THREE.Object3D | null = def.node; obj; obj = obj === root ? null : obj.parent) {
		obj.updateMatrix();
		_matrix.premultiply(obj.matrix);
	}

	_matrix.premultiply(_scaleMatrix.makeScale(modelScale.x, modelScale.y, modelScale.z));
	_matrix.decompose(outPosition, outQuaternion, outScale);
}

function getScaledVertices(geometry: THREE.BufferGeometry, scale: THREE.Vector3) {
	const position = geometry.attributes.position;
	const vertices = new Float32Array(position.count * 3);

	for (let i = 0; i < position.count; i++) {
		vertices[i * 3 + 0] = position.getX(i) * scale.x;
		vertices[i * 3 + 1] = position.getY(i) * scale.y;
		vertices[i * 3 + 2] = position.getZ(i) * scale.z;
	}

	return vertices;
}

function getIndices(geometry: THREE.BufferGeometry) {
	if (geometry.index) return Uint32Array.from(geometry.index.array);

	// Non-indexed geometry, every 3 vertices make a triangle
	return Uint32Array.from({ length: geometry.attributes.position.count }, (_, i) => i);
}

// Builds a collider definition from a single mesh, posed relative to the root
export function createColliderDef(
	mesh: THREE.Mesh,
	shape: ColliderShape,
	root: THREE.Object3D,
	modelScale: THREE.Vector3
): ColliderDef {
	const geometry = mesh.geometry as THREE.BufferGeometry;
	if (!geometry.boundingBox) geometry.computeBoundingBox();

	const box = geometry.boundingBox!;
	const size = box.getSize(new THREE.Vector3());

	// Primitives are centered on the mesh bounds, hull and trimesh use the vertices as they are
	const isPrimitive = shape === 'cuboid' || shape === 'ball' || shape === 'capsule';
	const center = isPrimitive ? box.getCenter(new THREE.Vector3()) : new THREE.Vector3();

	const position = new THREE.Vector3();
	const quaternion = new THREE.Quaternion();
	const scale = new THREE.Vector3();
	getColliderPose({ node: mesh, center }, root, modelScale, position, quaternion, scale);

	// Collider shapes can't be scaled, so the scale goes into the shape itself
	size.multiply(scale);
	const base = { name: mesh.name, node: mesh, center, position, quaternion };

	switch (shape) {
		case 'cuboid':
			return { ...base, shape, args: [size.x / 2, size.y / 2, size.z / 2] };
		case 'ball':
			return { ...base, shape, args: [Math.max(size.x, size.y, size.z) / 2] };
		case 'capsule': {
			const radius = Math.max(size.x, size.z) / 2;
			const halfHeight = Math.max(0, size.y / 2 - radius);
			return { ...base, shape, args: [halfHeight, radius] };
		}
		case 'hull':
			return { ...base, shape, args: [getScaledVertices(geometry, scale)] };
		case 'trimesh':
			return { ...base, shape, args: [getScaledVertices(geometry, scale), getIndices(geometry)] };
	}
}

// Finds all COL_ meshes in the model and builds collider definitions from them
export function buildColliderDefs(root: THREE.Object3D, modelScale: THREE.Vector3, dynamic: boolean): ColliderDef[] {
	const defs: ColliderDef[] = [];

	root.traverse(obj => {
		if (!(obj instanceof THREE.Mesh) || !obj.name.startsWith(COLLIDER_PREFIX)) return;

		let shape = getColliderShape(obj.name);

		// Rapier can't compute mass or resolve contacts properly for a trimesh on a dynamic body
		if (shape === 'trimesh' && dynamic) {
			console.warn(`Collider "${obj.name}" is a trimesh on a dynamic body, using a convex hull instead`);
			shape = 'hull';
		}

		defs.push(createColliderDef(obj, shape, root, modelScale));
	});

	return defs;
}
