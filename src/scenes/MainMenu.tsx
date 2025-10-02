import React from "react";
import GeneralGameButton from "../ui/GeneralGameButton";

interface Props {
    onStart: () => void;
    onCredits: () => void;
}

export default function MainMenu({ onCredits, onStart }: Props) {
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
        onCredits();
    };

    const handleQuit = () => {
        console.log("Quit game TODO");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", marginTop: "2rem" }}>
            <GeneralGameButton onClick={handleNewGame} >Start</GeneralGameButton>
            <GeneralGameButton onClick={handleOptions} >Options</GeneralGameButton>
            <GeneralGameButton onClick={handleSounds} >Sounds: on</GeneralGameButton>
            <GeneralGameButton onClick={handleMusic} >Music: on</GeneralGameButton>
            <GeneralGameButton onClick={handleCredits} >Credits</GeneralGameButton>
            <GeneralGameButton disabled onClick={handleQuit} >Quit</GeneralGameButton>
        </div>
    );
}
