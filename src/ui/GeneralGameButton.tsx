import React from "react";

interface GeneralGameButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    toggle?: boolean;
    active?: boolean;
    minWidth?: string | number;
    children: React.ReactNode;
}

export default function GeneralGameButton({
onClick,
    disabled = false,
    toggle = false,
    active = false,
    minWidth = "160px",
    children,
}: GeneralGameButtonProps) {
    return(
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            style={{
                padding: "0.8rem 1.6rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "2px solid white",
                background: disabled
                ? "rgba(158, 158, 158)"
                : toggle && active
                ? "rgba(0, 150, 255, 0.7)"
                : "rgba(0, 0, 0, 0.7)",
                color: "white",
                cursor: disabled ? "not-allowed" : "pointer",
                minWidth,
                transition: "all 0.2s ease",
            }}
            >
            {children}
        </button>
    );
}