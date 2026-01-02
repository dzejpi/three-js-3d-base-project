import React, { useRef, useEffect, useState } from 'react';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useThree, useFrame } from '@react-three/fiber';

const WALK_SPEED = 5;
const SPRINT_MULTIPLIER = 1.8;
const JUMP_FORCE = 8;

export default function PlayerController() {
	const bodyRef = useRef<any>(null);
	const { camera, gl } = useThree();

	const [keys, setKeys] = useState<Record<string, boolean>>({});
	const yawRef = useRef(0);
	const pitchRef = useRef(0);

	const posRef = useRef({ x: 0, y: 0, z: 0 });

	const deadzone = (value: number, threshold = 0.15) => (Math.abs(value) < threshold ? 0 : value);

	// Key presses
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key.toLowerCase()]: true }));
		const handleKeyUp = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key.toLowerCase()]: false }));

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	// Pointer
	useEffect(() => {
		const handleClick = () => {
			if (!document.pointerLockElement) {
				gl.domElement.requestPointerLock();
			}
		};
		gl.domElement.addEventListener('click', handleClick);

		const handleMouseMove = (e: MouseEvent) => {
			if (document.pointerLockElement) {
				yawRef.current -= e.movementX * 0.002;
				pitchRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchRef.current - e.movementY * 0.002));
			}
		};
		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			gl.domElement.removeEventListener('click', handleClick);
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [gl.domElement]);

	// Main game loop
	useFrame(() => {
		if (!bodyRef.current) return;

		const gamepad = navigator.getGamepads?.()[0];
		const gamepadLookSensitivity = 0.02;

		let moveX = 0;
		let moveZ = 0;

		if (gamepad) {
			const leftX = deadzone(gamepad.axes[0]);
			const leftY = deadzone(gamepad.axes[1]);
			const rightX = deadzone(gamepad.axes[2]);
			const rightY = deadzone(gamepad.axes[3]);

			// Movement
			moveX += leftX;
			moveZ -= leftY;

			// Camera
			yawRef.current -= rightX * gamepadLookSensitivity;
			pitchRef.current = Math.max(
				-Math.PI / 2,
				Math.min(Math.PI / 2, pitchRef.current - rightY * gamepadLookSensitivity)
			);

			// Jump
			if (gamepad.buttons[0].pressed) {
				const linvel = bodyRef.current.linvel();

				if (Math.abs(linvel.y) < 0.05) {
					bodyRef.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
				}
			}
		}

		// Calculate direction from camera yaw
		const forward = {
			x: -Math.sin(yawRef.current),
			z: -Math.cos(yawRef.current),
		};
		const right = {
			x: Math.cos(yawRef.current),
			z: -Math.sin(yawRef.current),
		};

		if (keys['w'] || keys['arrowup']) moveZ += 1;
		if (keys['s'] || keys['arrowdown']) moveZ -= 1;
		if (keys['a'] || keys['arrowleft']) moveX -= 1;
		if (keys['d'] || keys['arrowright']) moveX += 1;

		const worldX = right.x * moveX + forward.x * moveZ;
		const worldZ = right.z * moveX + forward.z * moveZ;

		let speed = WALK_SPEED;
		if (keys['shift'] || gamepad?.buttons[10]?.pressed) {
			speed *= SPRINT_MULTIPLIER;
		}

		// Normalize movement vector
		const len = Math.hypot(worldX, worldZ);
		const finalX = len > 0 ? (worldX / len) * speed : 0;
		const finalZ = len > 0 ? (worldZ / len) * speed : 0;

		// Apply velocity (keep y for gravity/jumps)
		const linvel = bodyRef.current.linvel();
		bodyRef.current.setLinvel({ x: finalX, y: linvel.y, z: finalZ }, true);

		// Jump
		if (keys[' '] && Math.abs(linvel.y) < 0.05) {
			bodyRef.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
		}

		// Sync camera to player position
		const pos = bodyRef.current.translation();
		posRef.current = pos;
		camera.position.x = posRef.current.x;
		camera.position.z = posRef.current.z;

		// Smoother jump/fall
		const targetY = posRef.current.y + 0.5;
		camera.position.y += (targetY - camera.position.y) * 0.5;

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
