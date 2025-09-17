import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import PlayerController from "../player/PlayerController";

interface Props {
    onStart: () => void;
}

export default function TestingWorld({ onStart }: Props) {
    return (
        <Canvas
            camera={{ position: [0, 2, 5], fov: 75 }}
            style={{ width: "100vw", height: "100vh", background: "skyblue" }}
            >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} />

            <Physics gravity={[0, -9.81, 0]}>
                {/* Ground plane */}
                <RigidBody type="fixed">
                <mesh receiveShadow>
                    <boxGeometry args={[20, 1, 20]} />
                    <meshStandardMaterial color="green" />
                </mesh>
                </RigidBody>

                {/* Test cube */}
                <RigidBody colliders="cuboid" position={[0, 2, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="lightgrey" />
                </mesh>
                </RigidBody>

                {/* Player controller */}
                <PlayerController />
            </Physics>
        </Canvas>
    );
}