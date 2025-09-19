import React from "react";

interface Props {
    onStart: () => void;
}

export default function MainMenu({ onStart }: Props) {
    const handleNewGame = () => {
        onStart();
    };
    
    const handleOptions = () => {
        console.log("Options TODO");
    };

    const handleSounds = () => {
        console.log("Sounds TODO");
    };

    const handleMusic = () => {
        console.log("Music TODO");
    };

    const handleCredits = () => {
        console.log("Credits TODO");
    };

    const handleQuit = () => {
        console.log("Quit game TODO");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", marginTop: "2rem" }}>
            <button onClick={handleNewGame}>Start</button>
            <button onClick={handleOptions}>Options</button>
            <button onClick={handleSounds}>Sounds: on</button>
            <button onClick={handleMusic}>Music: on</button>
            <button onClick={handleCredits}>Credits</button>
            <button onClick={handleQuit}>Quit</button>
        </div>
    );
}
