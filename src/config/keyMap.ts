type Action = "forward" | "backward" | "left" | "right" | "jump" | "sprint";

export const keyMap: Record<string, Action> = {
    KeyW: "forward",
    ArrowUp: "forward",
    KeyS: "backward",
    ArrowDown: "backward",
    KeyA: "left",
    KeyD: "right",
    ArrowLeft: "left",
    ArrowRight: "right",
    Space: "jump",
    ShiftLeft: "sprint",
    ShiftRight: "sprint",
};