import React, { useState, useEffect } from "react";
import Game from "./scenes/Game";
import MainMenu from "./scenes/MainMenu";
import SplashScreen from "./scenes/SplashScreen";

type Scene = "splash" | "menu" | "game";
let isDebug: boolean = false;

export default function App() {
    const [scene, setScene] = useState<Scene>(isDebug ? "game" : "splash");

    return (
        <>
            {scene === "splash" && <SplashScreen onContinue={() => setScene("menu")} />}
            {scene === "menu" && <MainMenu onStart={() => setScene("game")} />}
            {scene === "game" && <Game onExit={() => setScene("menu")} />}
        </>
    );
}
