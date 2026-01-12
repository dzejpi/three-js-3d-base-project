export type Action =
	| 'move_forward'
	| 'move_backward'
	| 'move_left'
	| 'move_right'
	| 'jump'
	| 'sprint'
	| 'pause'
	| 'look_x'
	| 'look_y';

export type KeyBinding = {
	keys?: string[];
	buttons?: number[];
	axis?: {
		index: number;
		scale?: number;
		deadzone?: number;
	};
};

export type ActionState = {
	pressed: boolean;
	justPressed: boolean;
	value: number;
};
