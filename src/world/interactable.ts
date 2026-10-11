import type { Object3D } from 'three';

export type Interactable = {
	// Shown in the UI prompt
	label: string;
	interact: () => void;
};

const USER_DATA_KEY = 'interactable';

export function setInteractable(object: Object3D, interactable: Interactable | null) {
	if (interactable) object.userData[USER_DATA_KEY] = interactable;
	else delete object.userData[USER_DATA_KEY];
}

export function findInteractable(object: Object3D | null): Interactable | null {
	for (let obj = object; obj; obj = obj.parent) {
		const interactable = obj.userData[USER_DATA_KEY] as Interactable | undefined;
		if (interactable) return interactable;
	}

	return null;
}
