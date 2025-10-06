import React from "react";
import { ColorTokens } from "../styles/colors";

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
                border: "1px solid white",
                background: disabled
                ? ColorTokens.button_disabled
                : toggle && active
                ? ColorTokens.button_pressed
                : ColorTokens.button_primary,
                color: ColorTokens.button_text,
                cursor: disabled ? "not-allowed" : "pointer",
                minWidth,
                transition: "all 0.2s ease",
            }}
            >
            {children}
        </button>
    );
}