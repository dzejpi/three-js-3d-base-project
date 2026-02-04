import { Action, KeyBinding } from './inputTypes';

export const bindings: Record<Action, KeyBinding> = {
	move_forward: {
		keys: ['KeyW', 'ArrowUp'],
		axis: { index: 1, scale: -1, deadzone: 0.15 },
	},
	move_backward: {
		keys: ['KeyS', 'ArrowDown'],
		axis: { index: 1, scale: 1, deadzone: 0.15 },
	},
	move_left: {
		keys: ['KeyA', 'ArrowLeft'],
		axis: { index: 0, scale: -1, deadzone: 0.15 },
	},
	move_right: {
		keys: ['KeyD', 'ArrowRight'],
		axis: { index: 0, scale: 1, deadzone: 0.15 },
	},
	jump: {
		keys: ['Space'],
		buttons: [0],
	},
	sprint: {
		keys: ['ShiftLeft', 'ShiftRight'],
		buttons: [10],
	},
	pause: {
		keys: ['Escape', 'KeyP'],
		buttons: [9],
	},
	look_x: {
		axis: { index: 2, deadzone: 0.1 },
	},
	look_y: {
		axis: { index: 3, deadzone: 0.1 },
	},
};
