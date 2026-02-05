import { AudioSetting, AudioValue } from './audioTypes';

export const audioDefaults: Record<AudioSetting, AudioValue> = {
	masterVolume: 1,
	musicVolume: 1,
	sfxVolume: 1,
	muted: false,
};
