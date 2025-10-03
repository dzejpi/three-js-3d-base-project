import React from "react";

interface GameUiTitleProps {
    children: React.ReactNode
}

export default function GameUiTitle({ children }: GameUiTitleProps){
    return (
        <h1 style={{ marginBottom: "2rem" }}>
            {children}
        </h1>
    )
}