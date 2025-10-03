import React from "react";

interface GameUiTitleProps {
    children: React.ReactNode
}

export default function GameUiTitle({ children }: GameUiTitleProps){
    return (
        <h1>
            {children}
        </h1>
    )
}