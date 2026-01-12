import { Action, ActionState } from './inputTypes';
import { bindings } from './bindings';

class InputManager {
	private keys = new Set<string>();
	private prevActions = new Map<Action, boolean>();

	public actions = new Map<Action, ActionState>();

	constructor() {
		window.addEventListener('keydown', e => this.keys.add(e.code));
		window.addEventListener('keyup', e => this.keys.delete(e.code));
	}

	update() {
		const gamepad = navigator.getGamepads?.()[0];

		for (const action in bindings) {
			const binding = bindings[action as Action];

			let value = 0;
			let pressed = false;

			// Keyboard keys
			if (binding.keys) {
				for (const key of binding.keys) {
					if (this.keys.has(key)) {
						pressed = true;
						value = 1;
					}
				}
			}

			// Gamepad buttons
			if (gamepad && binding.buttons) {
				for (const b of binding.buttons) {
					if (gamepad.buttons[b]?.pressed) {
						pressed = true;
						value = 1;
					}
				}
			}

			// Gamepad sticks
			if (gamepad && binding.axis) {
				const { index, scale = 1, deadzone = 0.15 } = binding.axis;
				const raw = gamepad.axes[index] * scale;
				const v = Math.abs(raw) < deadzone ? 0 : raw;

				value = Math.abs(v) > Math.abs(value) ? v : value;
				pressed ||= v !== 0;
			}

			const prev = this.prevActions.get(action as Action) ?? false;

			this.actions.set(action as Action, {
				pressed,
				justPressed: pressed && !prev,
				value,
			});

			this.prevActions.set(action as Action, pressed);
		}
	}
}

export const input = new InputManager();
