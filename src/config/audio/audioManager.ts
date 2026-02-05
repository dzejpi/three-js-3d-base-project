import { audioDefaults } from './audioDefaults';
import { AudioSetting, AudioValue } from './audioTypes';

class AudioManager {
	private values = new Map<AudioSetting, AudioValue>();

	constructor() {
		Object.entries(audioDefaults).forEach(([key, value]) => {
			this.values.set(key as AudioSetting, value);
		});
	}

	get<T extends AudioValue>(setting: AudioSetting): T {
		return this.values.get(setting) as T;
	}

	set(setting: AudioSetting, value: AudioValue) {
		this.values.set(setting, value);
	}
}

export const audio = new AudioManager();
