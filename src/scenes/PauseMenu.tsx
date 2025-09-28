import React from "react";

interface Props {
    onResume: () => void;
    onMainMenu: () => void;
}

export default function PauseMenu({ onResume, onMainMenu }: Props) {
    return(
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                zIndex: 20,
            }}
            >
            <h1>Paused</h1>
            <button onClick={onResume} style={{ margin: "1rem" }}>
                Continue
            </button>
            <button onClick={onMainMenu} style={{ margin: "1rem" }}>
                Quit to menu
            </button>
        </div>
    );
}