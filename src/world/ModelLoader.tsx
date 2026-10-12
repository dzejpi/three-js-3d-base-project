import { useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, type Ref } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {
	RigidBody,
	CuboidCollider,
	BallCollider,
	CapsuleCollider,
	ConvexHullCollider,
	TrimeshCollider,
	type RigidBodyProps,
	type RapierRigidBody,
	type RapierCollider,
} from '@react-three/rapier';
import { buildColliderDefs, getColliderPose, type ColliderDef } from './modelColliders';
import { setInteractable } from './interactable';

/*
    static    -> Never moves (furniture, walls, props). Animations can still play, but colliders stay where they are.
    kinematic -> Moved by code or animations, not by physics (doors, drawers, elevators, NPCs).
                 Colliders follow their animated COL_ meshes every frame.
    dynamic   -> Moved by physics (crates, balls, anything that can be pushed or fall over).
*/
export type ModelType = 'static' | 'kinematic' | 'dynamic';

const BODY_TYPES = {
	static: 'fixed',
	kinematic: 'kinematicPosition',
	dynamic: 'dynamic',
} as const;

type AnimationActions = ReturnType<typeof useAnimations>['actions'];

export type PlayOptions = { loop?: boolean; fade?: number; reverse?: boolean };

export type ModelHandle = {
	root: THREE.Object3D;
	body: RapierRigidBody | null;
	actions: AnimationActions;
	mixer: THREE.AnimationMixer;
	// Play an animation by its Blender action name
	play: (clip: string, options?: PlayOptions) => THREE.AnimationAction | null;
};

type ModelLoaderProps = {
	modelPath: string;

	type?: ModelType;
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: number | [number, number, number];

	// Clips looped from the start (idle, ambient motion)
	autoPlay?: string | string[];
	debugColliders?: boolean;

	// Makes the model interactable, called when the player looks at it and presses the interact key
	onInteract?: (model: ModelHandle) => void;

	// Shown in the interaction prompt, e.g. "open", "talk"
	interactLabel?: string;

	// Extra body settings, e.g. mass or enabledRotations
	rigidBodyProps?: Omit<RigidBodyProps, 'type' | 'position' | 'rotation' | 'colliders'>;

	ref?: Ref<ModelHandle>;
};

const _position = new THREE.Vector3();
const _quaternion = new THREE.Quaternion();
const _scale = new THREE.Vector3();

export function ModelLoader({
	modelPath,
	type = 'static',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
	scale = 1,
	autoPlay,
	debugColliders = false,
	onInteract,
	interactLabel = 'interact',
	rigidBodyProps,
	ref,
}: ModelLoaderProps) {
	const bodyRef = useRef<RapierRigidBody>(null);
	const colliderRefs = useRef<(RapierCollider | null)[]>([]);

	const { scene, animations } = useGLTF(modelPath);

	// useGLTF caches the scene per path, clone it so that the same model can be placed multiple times
	const root = useMemo(() => cloneSkinned(scene), [scene]);
	const { actions, mixer } = useAnimations(animations, root);

	const [sx, sy, sz] = typeof scale === 'number' ? [scale, scale, scale] : scale;
	const modelScale = useMemo(() => new THREE.Vector3(sx, sy, sz), [sx, sy, sz]);

	const colliders = useMemo(() => buildColliderDefs(root, modelScale, type === 'dynamic'), [root, modelScale, type]);
	const colliderSetters = useMemo(
		() =>
			colliders.map((_, i) => (collider: RapierCollider | null) => {
				colliderRefs.current[i] = collider;
			}),
		[colliders]
	);

	// Colliders are moved, layout effect used so that they're hidden before the first frame is drawn
	useLayoutEffect(() => {
		for (const def of colliders) def.node.visible = debugColliders;
	}, [colliders, debugColliders]);

	// Move colliders along with the animated COL_ meshes
	const followAnimation = type === 'kinematic' && animations.length > 0;

	useFrame(() => {
		if (!followAnimation) return;

		colliders.forEach((def, i) => {
			const collider = colliderRefs.current[i];
			if (!collider) return;

			getColliderPose(def, root, modelScale, _position, _quaternion, _scale);
			collider.setTranslationWrtParent(_position);
			collider.setRotationWrtParent(_quaternion);
		});
	});

	const autoPlayKey = [autoPlay ?? []].flat().join('|');

	useEffect(() => {
		if (!autoPlayKey) return;

		const clips = autoPlayKey.split('|');
		for (const clip of clips) {
			if (!actions[clip]) console.warn(`Clip "${clip}" not found in ${modelPath}`);
			actions[clip]?.reset().play();
		}

		return () => {
			for (const clip of clips) actions[clip]?.stop();
		};
	}, [actions, autoPlayKey, modelPath]);

	const handle = useMemo<ModelHandle>(
		() => ({
			root,
			get body() {
				return bodyRef.current;
			},
			actions,
			mixer,
			play(clip, { loop = false, fade = 0.2, reverse = false } = {}) {
				const action = actions[clip];
				if (!action) {
					console.warn(`Clip "${clip}" not found in ${modelPath}`);
					return null;
				}

				// Playing, or finished and holding its last frame
				const inEffect = action.isScheduled() && action.enabled;
				const duration = action.getClip().duration;
				const time = action.time;

				// Already at the end in this direction (one-shot finished), play it again from the start
				const atEnd = reverse ? time <= 0 : time >= duration;

				action.reset();
				action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);

				// Keep the last frame of one-shot clips (door stays open)
				action.clampWhenFinished = !loop;
				action.timeScale = reverse ? -1 : 1;
				action.time = inEffect && !atEnd ? time : reverse ? duration : 0;

				// Fading in from the rest pose only makes sense when the clip isn't shown already
				if (!inEffect) action.fadeIn(fade);
				action.play();

				return action;
			},
		}),
		[root, actions, mixer, modelPath]
	);

	useImperativeHandle(ref, () => handle, [handle]);

	// Latest callback in a ref, so an inline onInteract doesn't re-register the interactable every render
	const onInteractRef = useRef(onInteract);
	onInteractRef.current = onInteract;
	const interactable = onInteract !== undefined;

	useEffect(() => {
		if (!interactable) return;

		setInteractable(root, { label: interactLabel, interact: () => onInteractRef.current?.(handle) });
		return () => setInteractable(root, null);
	}, [root, handle, interactable, interactLabel]);

	return (
		<RigidBody
			ref={bodyRef}
			type={BODY_TYPES[type]}
			position={position}
			rotation={rotation}
			// Colliders come from the COL_ meshes
			colliders={false}
			{...rigidBodyProps}
		>
			<group scale={modelScale}>
				<primitive object={root} />
			</group>

			{colliders.map((def, i) => (
				<ModelCollider key={def.node.uuid} def={def} colliderRef={colliderSetters[i]} />
			))}
		</RigidBody>
	);
}

type ModelColliderProps = {
	def: ColliderDef;
	colliderRef?: (collider: RapierCollider | null) => void;
};

// Colliders are direct children of the body, the scale is already baked into their pose and shape
export function ModelCollider({ def, colliderRef }: ModelColliderProps) {
	const props = { name: def.name, position: def.position, quaternion: def.quaternion, ref: colliderRef };

	switch (def.shape) {
		case 'cuboid':
			return <CuboidCollider {...props} args={def.args} />;
		case 'ball':
			return <BallCollider {...props} args={def.args} />;
		case 'capsule':
			return <CapsuleCollider {...props} args={def.args} />;
		case 'hull':
			return <ConvexHullCollider {...props} args={def.args} />;
		case 'trimesh':
			return <TrimeshCollider {...props} args={def.args} />;
	}
}
