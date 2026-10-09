import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ToggleKey = 'invertYAxis';
type CycleKey = 'music' | 'sfx' | 'mouseSensitivity' | 'fov';

export const CYCLE_OPTIONS: Record<CycleKey, number[]> = {
	music: [0, 20, 40, 60, 80, 100],
	sfx: [0, 20, 40, 60, 80, 100],
	mouseSensitivity: [25, 50, 75, 100, 125, 150, 175, 200],
	fov: [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120],
};

interface SettingsState {
	fullscreen: boolean;
	music: number;
	sfx: number;
	mouseSensitivity: number;
	fov: number;
	invertYAxis: boolean;

	toggle: (key: ToggleKey) => void;
	cycle: (key: CycleKey) => void;
	toggleFullscreen: () => void;
}

export const useSettings = create<SettingsState>()(
	persist(
		set => ({
			fullscreen: false,
			music: 100,
			sfx: 100,
			mouseSensitivity: 100,
			fov: 90,
			invertYAxis: false,

			// Flips a boolean setting
			toggle: key =>
				set(state => {
					const currentValue = state[key];
					return { [key]: !currentValue };
				}),

			// Moves a setting to the next value
			cycle: key =>
				set(state => {
					const options = CYCLE_OPTIONS[key];
					const currentIndex = options.indexOf(state[key]);
					let nextIndex = currentIndex + 1;

					if (nextIndex >= options.length) {
						nextIndex = 0;
					}

					return { [key]: options[nextIndex] };
				}),
			// Must be called from a click handler, browsers block fullscreen otherwise
			toggleFullscreen: () => {
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					document.documentElement
						.requestFullscreen()
						.catch(error => console.warn('Fullscreen request failed:', error));
				}
			},
		}),
		{
			name: 'game-settings',
			// Not restoring fullscreen on reload, browsers go full screen only on user input
			partialize: ({ fullscreen, ...rest }) => rest,
		}
	)
);

// Sync with the real fullscreen state (so that cancelling by Escape is picked up)
document.addEventListener('fullscreenchange', () => {
	useSettings.setState({ fullscreen: document.fullscreenElement !== null });
});
