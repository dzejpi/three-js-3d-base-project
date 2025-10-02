import React from "react";
import GeneralGameButton from "../ui/GeneralGameButton";

interface Props {
    onBackToMenu: () => void;
}

export default function Credits({ onBackToMenu }: Props) {
    return (
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
            <h1 style={{ marginBottom: "2rem" }}>Credits</h1>
            <p style={{ marginBottom: "2rem", lineHeight: "1.5rem" }}>
                Very nice credits.
            </p>
            <GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
        </div>
    );
}