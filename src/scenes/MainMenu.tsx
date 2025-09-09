import React from "react";

interface Props {
    onStart: () => void;
}

export default function MainMenu({ onStart }: Props) {
    return (
        <div>
            <p>This is a main menu.</p>
        </div>
    );
}
