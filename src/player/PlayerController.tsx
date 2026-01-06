import React, { useRef, useEffect, useState } from 'react';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useThree, useFrame } from '@react-three/fiber';
import { input } from '../config/InputManager';

const WALK_SPEED = 5;
const SPRINT_MULTIPLIER = 1.8;
const JUMP_FORCE = 8;

export default function PlayerController() {
	const bodyRef = useRef<any>(null);
	const { camera, gl } = useThree();

	const yawRef = useRef(0);
	const pitchRef = useRef(0);

	const posRef = useRef({ x: 0, y: 0, z: 0 });

	// Pointer lock and mouse look
	useEffect(() => {
		const handleClick = () => {
			if (!document.pointerLockElement) {
				gl.domElement.requestPointerLock();
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (document.pointerLockElement) {
				yawRef.current -= e.movementX * 0.002;
				pitchRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchRef.current - e.movementY * 0.002));
			}
		};

		gl.domElement.addEventListener('click', handleClick);
		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			gl.domElement.removeEventListener('click', handleClick);
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [gl.domElement]);

	// Main player loop
	useFrame(() => {
		if (!bodyRef.current) return;

		// Update input manager
		input.update();
		const actions = input.actions;

		// Player movement
		const moveX = actions.get('move_right')!.value - actions.get('move_left')!.value;
		const moveZ = actions.get('move_forward')!.value - actions.get('move_backward')!.value;

		const forward = { x: -Math.sin(yawRef.current), z: -Math.cos(yawRef.current) };
		const right = { x: Math.cos(yawRef.current), z: -Math.sin(yawRef.current) };

		let worldX = right.x * moveX + forward.x * moveZ;
		let worldZ = right.z * moveX + forward.z * moveZ;

		const len = Math.hypot(worldX, worldZ);
		if (len > 0) {
			let speed = WALK_SPEED;
			if (actions.get('sprint')!.pressed) speed *= SPRINT_MULTIPLIER;

			worldX = (worldX / len) * speed;
			worldZ = (worldZ / len) * speed;
		}

		// Apply velocity
		const linvel = bodyRef.current.linvel();
		bodyRef.current.setLinvel({ x: worldX, y: linvel.y, z: worldZ }, true);

		// Jump
		if (actions.get('jump')!.justPressed && Math.abs(linvel.y) < 0.05) {
			bodyRef.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
		}

		// Camera rotation
		const lookX = actions.get('look_x')!.value;
		const lookY = actions.get('look_y')!.value;

		yawRef.current -= lookX * 0.04;
		pitchRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchRef.current - lookY * 0.04));

		// Camera position
		const pos = bodyRef.current.translation();
		posRef.current = pos;

		camera.position.x = pos.x;
		camera.position.z = pos.z;

		// Smooth Y out
		camera.position.y += (pos.y + 0.5 - camera.position.y) * 0.5;

		// Apply camera rotation
		camera.rotation.order = 'YXZ';
		camera.rotation.y = yawRef.current;
		camera.rotation.x = pitchRef.current;
		camera.rotation.z = 0;
	});

	return (
		<RigidBody ref={bodyRef} colliders={false} mass={1} position={[0, 2, 5]} enabledRotations={[false, false, false]}>
			<CapsuleCollider args={[0.5, 0.5]} />
		</RigidBody>
	);
}
