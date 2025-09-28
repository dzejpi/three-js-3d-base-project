import React, { useEffect, useState } from "react";
import TestingWorld from "../world/TestingWorld";
import PauseMenu from "./PauseMenu";

interface Props {
    onExit: () => void;
}

export default function Game({ onExit }: Props) {
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" || e.key.toLowerCase() === "p") {
                setPaused((p) => !p);
                if (!paused) {
                // Unlock pointer when pausing
                document.exitPointerLock();
                } else {
                // Re-lock pointer when unpausing
                const canvas = document.querySelector("canvas");
                if (canvas) canvas.requestPointerLock();
                }
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [paused]);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
        {/* The 3D test world */}
        <TestingWorld onStart={() => {}} />

        {/* Pause overlay */}
        {paused && (
            <PauseMenu
            onResume={() => {
                setPaused(false);
                const canvas = document.querySelector("canvas");
                if (canvas) canvas.requestPointerLock();
            }}
            onMainMenu={onExit}
            />
        )}

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