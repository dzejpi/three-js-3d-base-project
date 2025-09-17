import React, { useRef, useEffect, useState } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useThree, useFrame } from "@react-three/fiber";

const WALK_SPEED = 5;
const SPRINT_MULTIPLIER = 1.8;
const JUMP_FORCE = 8;

export default function PlayerController() {
    const bodyRef = useRef<any>(null);
    const { camera, gl } = useThree();

    const [keys, setKeys] = useState<Record<string, boolean>>({});
    const yawRef = useRef(0);
    const pitchRef = useRef(0);

    // Key presses
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
        const handleKeyUp = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Pointer
    useEffect(() => {
        const handleClick = () => {
            if (!document.pointerLockElement) {
                gl.domElement.requestPointerLock();
            }
        };
        gl.domElement.addEventListener("click", handleClick);

        const handleMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement) {
                yawRef.current -= e.movementX * 0.002;
                pitchRef.current = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitchRef.current - e.movementY * 0.002));
            }
        };
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            gl.domElement.removeEventListener("click", handleClick);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [gl.domElement]);

    // Main game loop
    useFrame(() => {
        if (!bodyRef.current) return;

        // Calculate direction from camera yaw
        const forward = {
            x: -Math.sin(yawRef.current),
            z: -Math.cos(yawRef.current),
        };
        const right = {
            x: Math.cos(yawRef.current),
            z: -Math.sin(yawRef.current),
        };

        let speed = WALK_SPEED;
        if (keys["shift"]) speed *= SPRINT_MULTIPLIER;

        let moveX = 0;
        let moveZ = 0;

        if (keys["w"] || keys["arrowup"]) {
            moveX += forward.x;
            moveZ += forward.z;
        }

        if (keys["s"] || keys["arrowdown"]) {
            moveX -= forward.x;
            moveZ -= forward.z;
        }

        if (keys["a"] || keys["arrowleft"]) {
            moveX -= right.x;
            moveZ -= right.z;
        }

        if (keys["d"] || keys["arrowright"]) {
            moveX += right.x;
            moveZ += right.z;
        }

        // Normalize movement vector
        const len = Math.hypot(moveX, moveZ);
        if (len > 0) {
            moveX = (moveX / len) * speed;
            moveZ = (moveZ / len) * speed;
        }

        // Apply velocity (keep y for gravity/jumps)
        const linvel = bodyRef.current.linvel();
        bodyRef.current.setLinvel({ x: moveX, y: linvel.y, z: moveZ }, true);

        // Jump
        if (keys[" "] && Math.abs(linvel.y) < 0.05) {
            bodyRef.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
        }

        // Sync camera to player position
        const pos = bodyRef.current.translation();
        camera.position.set(pos.x, pos.y + 0.5, pos.z); // 0.5 offset for eyes
        camera.rotation.order = "YXZ";
        camera.rotation.y = yawRef.current;
        camera.rotation.x = pitchRef.current;
        camera.rotation.z = 0;
    });

    return (
        <RigidBody
            ref={bodyRef}
            colliders={false}
            mass={1}
            position={[0, 2, 5]}
            enabledRotations={[false, false, false]}
        >
            <CapsuleCollider args={[0.5, 0.5]} />
        </RigidBody>
    );
}
