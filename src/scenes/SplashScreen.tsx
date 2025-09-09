import React from "react";

interface Props {
    onContinue: () => void;
}

export default function SplashScreen({ onContinue }: Props) {
    return (
        <div>
            <p>This is a splash screen.</p>
        </div>
    );
}
