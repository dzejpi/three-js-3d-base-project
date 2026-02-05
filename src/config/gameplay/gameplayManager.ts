import { gameplayDefaults } from './gameplayDefaults';
import { GameplaySetting, GameplayValue } from './gameplayTypes';

class GameplayManager {
	private values = new Map<GameplaySetting, GameplayValue>();

	constructor() {
		Object.entries(gameplayDefaults).forEach(([key, value]) => {
			this.values.set(key as GameplaySetting, value);
		});
	}

	get<T extends GameplayValue>(setting: GameplaySetting): T {
		return this.values.get(setting) as T;
	}

	set(setting: GameplaySetting, value: GameplayValue) {
		this.values.set(setting, value);
	}
}

export const gameplay = new GameplayManager();
