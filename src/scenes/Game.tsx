import React from "react";

interface Props {
    onExit: () => void;
}

export default function Game({ onExit }: Props) {
    return (
        <div>
            <p>This is a game room.</p>
        </div>
    );
}
