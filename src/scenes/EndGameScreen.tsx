import React, { useRef, useEffect, useState } from "react";

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

            <button
                onClick={onMainMenu}
                style={{
                marginTop: "1rem",
                padding: "8px 12px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid white",
                borderRadius: "6px",
                cursor: "pointer",
                }}
            >
                Return to Main menu
            </button>
        </div>
    );
}