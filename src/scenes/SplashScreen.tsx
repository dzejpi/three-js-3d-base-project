import React, { useEffect, useState } from "react";

interface Props {
    onContinue: () => void;
}

const logos: string[] = [
    "assets/sprites/splash/logo-jam.png",
    "assets/sprites/splash/logo-main.png"
]

const fadeInTime: number = 1000;
const displayTime: number = 2000;
const fadeOutTime: number = 1000;

export default function SplashScreen({ onContinue }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeState, setFadeState] = useState<"fade-in" | "display" | "fade-out">("fade-in");

    useEffect(() => {
        let timer: number;

        if (fadeState === "fade-in") {
            timer = setTimeout(() => setFadeState("display"), fadeInTime);
        } else if (fadeState === "display"){
            timer = window.setTimeout(() => setFadeState("fade-out"), displayTime);
        } else if (fadeState === "fade-out") {
            timer = window.setTimeout(() => {
                if (currentIndex < logos.length - 1) {
                    setCurrentIndex((i) => i + 1);
                    setFadeState("fade-in");
                } else {
                    onContinue();
                }
            }, fadeOutTime);
        }
        return () => clearTimeout(timer);
    }, [fadeState, currentIndex, onContinue]);

    const opacity =
        fadeState === "fade-in" ? 0 :
        fadeState === "display" ? 1 :
        fadeState === "fade-out" ? 0 : 1;

    const style: React.CSSProperties = {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity,
        transition: `opacity ${
        fadeState === "fade-in"
            ? fadeInTime
            : fadeState === "fade-out"
            ? fadeOutTime
            : 0
        }ms`,
    };

    return (
        <div style={style}>
            <img src={logos[currentIndex]} alt={`logo ${currentIndex}`} />
        </div>
    );
}
