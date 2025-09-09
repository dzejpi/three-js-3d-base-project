import React, { useState, useEffect } from "react";
import Game from "./scenes/Game";
import MainMenu from "./scenes/MainMenu";
import SplashScreen from "./scenes/SplashScreen";

type Scene = "splash" | "menu" | "game";

export default function App() {
    const [scene, setScene] = useState<Scene>("splash");

    useEffect(() => {
        if (scene === "splash") {
            // TODO temporary hardcoded timeout
            const timer = setTimeout(() => setScene("menu"), 4000);
            return () => clearTimeout(timer);
        }
    }, [scene]);

    return (
        <>
            {scene === "splash" && <SplashScreen onContinue={() => setScene("menu")} />}
            {scene === "menu" && <MainMenu onStart={() => setScene("game")} />}
            {scene === "game" && <Game onExit={() => setScene("menu")} />}
        </>
    );
}
