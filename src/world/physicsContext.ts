let rapierWorld: any = null;

export function setRapierWorld(world: any) {
	rapierWorld = world;
}

export function getRapierWorld() {
	if (!rapierWorld) {
		throw new Error('Rapier world not initialized yet!');
	}
	return rapierWorld;
}
