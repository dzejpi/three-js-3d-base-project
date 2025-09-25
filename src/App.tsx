import React, { useState, useEffect } from "react";
import Game from "./scenes/Game";
import MainMenu from "./scenes/MainMenu";
import SplashScreen from "./scenes/SplashScreen";
import FadeOverlay from "./ui/FadeOverlay";

type Scene = "splash" | "menu" | "game";
let isDebug: boolean = false;

export default function App() {
    const [scene, setScene] = useState<Scene>(isDebug ? "game" : "splash");
    const [fading, setFading] = useState(false);

    const switchScene = (nextScene: Scene) => {
        setFading(true);
        setTimeout(() => {
            setScene(nextScene);
            setFading(false);
        }, 1000);
    };

    return (
        <>
            {scene === "splash" && <SplashScreen onContinue={() => switchScene("menu")} />}
            {scene === "menu" && <MainMenu onStart={() => switchScene("game")} />}
            {scene === "game" && <Game onExit={() => switchScene("menu")} />}

            <FadeOverlay visible={fading} duration={1} />
        </>
    );
}
