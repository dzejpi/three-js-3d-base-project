import React, { useState } from "react";
import GeneralGameButton from "../ui/GeneralGameButton";

interface Props {
    onStart: () => void;
    onCredits: () => void;
}

export default function MainMenu({ onCredits, onStart }: Props) {
    const [soundsOn, setSoundsOn] = useState(true);
    const [musicOn, setMusicOn] = useState(true);

    const handleNewGame = () => {
        onStart();
    };
    
    const handleOptions = () => {
        console.log("Options TODO");
    };

    const handleSounds = () => {
        setSoundsOn((prev) => !prev);
    };

    const handleMusic = () => {
        setMusicOn((prev) => !prev);
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
            <GeneralGameButton onClick={handleSounds} toggle active={soundsOn}>Sounds: {soundsOn ? "on" : "off"}</GeneralGameButton>
            <GeneralGameButton onClick={handleMusic} toggle active={musicOn}>Music: {musicOn ? "on" : "off"}</GeneralGameButton>
            <GeneralGameButton onClick={handleCredits} >Credits</GeneralGameButton>
            <GeneralGameButton disabled onClick={handleQuit} >Quit</GeneralGameButton>
        </div>
    );
}
