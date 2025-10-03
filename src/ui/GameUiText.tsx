import React from "react";

interface GameUiTextProps {
    children: React.ReactNode
}

export default function GameTextTitle({ children }: GameUiTextProps){
    return (
        <p>
            {children}
        </p>
    )
}