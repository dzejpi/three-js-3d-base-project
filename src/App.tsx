import React, { useState, useEffect } from "react";
import Game from "./scenes/Game";
import MainMenu from "./scenes/MainMenu";
import SplashScreen from "./scenes/SplashScreen";
import FadeOverlay from "./ui/FadeOverlay";
import EndGameScreen from "./scenes/EndGameScreen";
import DialogBox from "./ui/DialogBox";

type Scene = "splash" | "menu" | "game" | "endgame" | "dialog";
let isDebug: boolean = false;

export default function App() {
    const [scene, setScene] = useState<Scene>(isDebug ? "dialog" : "splash");
    const [fading, setFading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

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

            {/* For debugging */}
            {scene === "endgame" && (
                <EndGameScreen
                    isGameWon={false}
                    score={12340}
                    highScore={50000}
                    onMainMenu={() => switchScene("menu")}
                />
            )}

            {scene === "dialog" && (
                <DialogBox
                    lines={[
                        "Hello, traveler.",
                        "This world is not what it seems...",
                        "Be careful out there!"
                    ]}
                    autoDismiss={false}
                    letterDelay={75}
                    onComplete={() => setShowDialog(false)}
                />
            )}

            <FadeOverlay visible={fading} duration={1} />
        </>
    );
}
