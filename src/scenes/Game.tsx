import React from "react";
import TestingWorld from "../world/TestingWorld";

interface Props {
    onExit: () => void;
}

export default function Game({ onExit }: Props) {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
        {/* The 3D test world */}
        <TestingWorld onStart={() => {}} />

        {/* Temporary exit button overlay */}
            <button
                onClick={onExit}
                style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "8px 12px",
                background: "rgba(0,0,0,0.7)",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "6px"
                }}
            >
                Exit
            </button>
        </div>
    );
}