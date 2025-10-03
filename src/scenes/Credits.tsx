import React from "react";
import GeneralGameButton from "../ui/GeneralGameButton";
import GameUiTitle from "../ui/GameUiTitle";
import GameUiText from "../ui/GameUiText";

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
            <GameUiTitle>Credits</GameUiTitle>
            <GameUiText>Very nice credits.</GameUiText>
            
            <GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
        </div>
    );
}