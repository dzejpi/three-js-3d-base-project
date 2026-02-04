import { Action, ActionState, KeyBinding } from './inputTypes';
import { bindings as defaultBindings } from './inputDefaults';

class InputManager {
	private keys = new Set<string>();
	private actions = new Map<Action, ActionState>();
	private prevActions = new Map<Action, boolean>();

	private bindings = new Map<Action, KeyBinding>();

	constructor() {
		// Initialize bindings
		Object.entries(defaultBindings).forEach(([action, binding]) => {
			this.bindings.set(action as Action, binding);
		});

		window.addEventListener('keydown', e => this.keys.add(e.code));
		window.addEventListener('keyup', e => this.keys.delete(e.code));
	}

	getBinding(action: Action): KeyBinding {
		return this.bindings.get(action)!;
	}

	setBinding(action: Action, binding: KeyBinding) {
		this.bindings.set(action, binding);
	}

	// Runtime
	get(action: Action): ActionState {
		return (
			this.actions.get(action) ?? {
				pressed: false,
				justPressed: false,
				value: 0,
			}
		);
	}

	update() {
		const gamepad = navigator.getGamepads?.()[0];

		for (const [action, binding] of this.bindings) {
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
