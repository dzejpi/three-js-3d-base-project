import React from "react";
import { RigidBody } from "@react-three/rapier";

interface Props {
    onStart: () => void;
}

export default function TestingWorld({ onStart }: Props) {
    return (        
        <>
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
        </>
    );
}