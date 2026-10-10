import React, { useRef, useEffect, useState } from 'react';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useThree, useFrame } from '@react-three/fiber';
import { input } from '../config/input/inputManager';

const WALK_SPEED = 5;
const SPRINT_MULTIPLIER = 1.8;
const JUMP_FORCE = 8;

interface Props {
	paused: boolean;
}

export default function PlayerController({ paused }: Props) {
	const bodyRef = useRef<any>(null);
	const { camera, gl } = useThree();

	// Ref so that the click handler always sees the current value without re-registering
	const pausedRef = useRef(paused);
	pausedRef.current = paused;

	const yawRef = useRef(0);
	const pitchRef = useRef(0);

	const posRef = useRef({ x: 0, y: 0, z: 0 });

	// Pointer lock and mouse look
	useEffect(() => {
		const handleClick = () => {
			// While paused, only the Continue button may lock the pointer (and resume the game)
			if (!document.pointerLockElement && !pausedRef.current) {
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

		// Player movement
		const moveX = input.get('move_right').value - input.get('move_left').value;
		const moveZ = input.get('move_forward').value - input.get('move_backward').value;

		const forward = { x: -Math.sin(yawRef.current), z: -Math.cos(yawRef.current) };
		const right = { x: Math.cos(yawRef.current), z: -Math.sin(yawRef.current) };

		let worldX = right.x * moveX + forward.x * moveZ;
		let worldZ = right.z * moveX + forward.z * moveZ;

		const len = Math.hypot(worldX, worldZ);
		if (len > 0) {
			let speed = WALK_SPEED;
			if (input.get('sprint').pressed) speed *= SPRINT_MULTIPLIER;

			worldX = (worldX / len) * speed;
			worldZ = (worldZ / len) * speed;
		}

		// Apply velocity
		const linvel = bodyRef.current.linvel();
		bodyRef.current.setLinvel({ x: worldX, y: linvel.y, z: worldZ }, true);

		// Jump
		if (input.get('jump').justPressed && Math.abs(linvel.y) < 0.05) {
			bodyRef.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
		}

		// Camera rotation
		const lookX = input.get('look_x').value;
		const lookY = input.get('look_y').value;

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
