import React, { useRef, useEffect, useState } from "react";
import GeneralGameButton from "../ui/GeneralGameButton";

interface Props {
    isGameWon: boolean,
    score: number,
    highScore: number,
    onMainMenu: () => void;
}

export default function EndGameScreen({ isGameWon, score, highScore, onMainMenu }: Props) {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                zIndex: 30,
            }}
        >
            <h1>{isGameWon ? "You won!" : "Game over"}</h1>

            <p>Your score: {score}</p>
            <p>Highest score: {highScore}</p>
            <GeneralGameButton onClick={onMainMenu}>Return to Main menu</GeneralGameButton>
        </div>
    );
}