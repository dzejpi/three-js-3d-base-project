import { graphicsDefaults } from './graphicsDefaults';
import { GraphicsSetting, GraphicsValue } from './graphicsTypes';

class GraphicsManager {
	private values = new Map<GraphicsSetting, GraphicsValue>();

	constructor() {
		Object.entries(graphicsDefaults).forEach(([key, value]) => {
			this.values.set(key as GraphicsSetting, value);
		});
	}

	get<T extends GraphicsValue>(setting: GraphicsSetting): T {
		return this.values.get(setting) as T;
	}

	set(setting: GraphicsSetting, value: GraphicsValue) {
		this.values.set(setting, value);
	}
}

export const graphics = new GraphicsManager();
