# React Three Fiber 3D videogame template

This is a base 3D videogame project made in React Three Fiber. You can use it as a starting project for your videogame jams, or even for your feature complete game as well, if you're brave enough!

This project contains:

- Splash screen showing two logos (one for game jam logo, and second for yours)
- Simple main menu
- Simple settings menu with minimalistic:
- - Graphics settings (with HTML5 in mind)
- - Sound settings
- - Gameplay settings
- Simple credits screen
- Starting game world with primitive ground and a physics cube.
- Simple FPS controller which you can use as a starting project for your game jams.

The goal of this project is to be a reusable template that gives you an opportunity to avoid the boring busywork and gives you an option to rapidly develop your 3D game, so, it should be particularly useful for game jams.
This project should comply with the Ludum Dare Compo rules, which state: `You’re free to start with any base-code you may have.`

## How to install & run

Clone the repository and then install the project by running:

`npm install`

Which will install all dependencies. Then you can run the project by running:

`npm run dev`

This will build the project using `Vite` and once it's done, you can access your project on `http://localhost:5173/`.

### Debug

Since this project supports hot reload, making any changes in the code while the project is running will refresh the project and let you inspect your changes right away. However, without turning debugging on, this would always take you to the splash screen, which would be a waste of time for you.

If you're making changes on a particular screen, you can activate the `debug` mode and change the default screen.

Go to `App.tsx`, and change `isDebug: boolean` to `true`.

This will bypass the default `SplashScreen.tsx` -> `MainMenu.tsx` flow and let you set any default screen you want. Then find:

`const [scene, setScene] = useState<Scene>(isDebug ? 'settings' : 'splash');`

And change `settings` to whatever scene you want to load immediately.

Do not forget to switch `isDebug` to `off` when making a public build.

## Assets

Put your assets into the `public/assets` folder. If you don't use `public` folder, your assets will not be exported! Then, insert assets anywhere in your code by using `./assets` path. Example:

`./assets/sprites/splash/logo-jam.png`

## Import from Blender

Importing here needs to follow a specific structure, because React Three Fiber is not an engine, so, we cannot work with objects as we would usually do in Unity or Godot, which means some compromises.

I have tested only Blender, but this should work with all 3D modeling tools that export glTF, as long as you follow the structure described below. Export your models as `.glb` (or `.gltf`) and put them into some `public/...` folder.

There are two kinds of files you will export:

- **World** - the terrain (ground, hills, walls) in one file, which is loaded with `WorldLoader`. Every mesh in it becomes a trimesh collider.
- **Objects** - every object (furniture, doors, crates, ...) in its own file together with its colliders, each loaded with `ModelLoader`.

One object file is one physics body. If you export a chair and a table into one file, they will be one object.

### Colliders

You need to create colliders yourself in Blender as meshes. Use simple shapes. These will be hidden and converted into colliders. Collider meshes must be prefixed with `COL_`, the rest of the prefix picks the shape:

| Prefix         | Collider                                                   |
| -------------- | ---------------------------------------------------------- |
| `COL_BOX_`     | cuboid, fitted to the mesh bounds                          |
| `COL_SPHERE_`  | sphere, fitted to the mesh bounds                          |
| `COL_CAPSULE_` | capsule, fitted to the mesh bounds, along Blender's Z axis |
| `COL_HULL_`    | convex hull of the mesh vertices                           |
| `COL_` + other | exact triangle mesh (e.g. `COL_MESH_`)                     |

Rapier does not handle triangle mesh colliders on dynamic objects properly, so, on `dynamic` objects, they are turned into convex hulls automatically (with a warning in the console).

Blender's `.001` suffixes (like `COL_BOX_chair.001`) are fine.

How to best work with Blender:

- **Parent colliders to the part they belong to** (e.g. `COL_BOX_door` under `door`). This is necessary especially for animated objects, because otherwise the collider won't follow the animation.
- **Rotate box, sphere and capsule colliders in Object Mode, not in Edit Mode.** They are fitted to the mesh bounds in the mesh's own space, so a cube rotated in Edit Mode becomes a bigger, unrotated box.
- **Use a single material (or none) on collider meshes.** Meshes with multiple materials are split on export and may lose their `COL_` name.
- **Don't hide colliders in Blender** if you export with "Visible Objects" (or "Selected Objects") only, they won't be exported. They're hidden in the game anyway, display them as wire or put them into their own collection if they're in the way.

### World

`WorldLoader` creates an exact trimesh collider for every mesh in the file, no prefix needed. That's what you want for the terrain, but it also means:

- Every mesh is solid, there's no way to make one walk-through (grass, small decorations), so keep those out of the world file.
- `COL_` meshes are not supported in the world file. Anything that needs its own simplified collider should be an object.
- Keep the polycount reasonable; a 50k triangle mesh means a 50k triangle collider.

Example of the component for your world:

```tsx
import { useGLTF } from '@react-three/drei';
import { WorldLoader } from '../WorldLoader';

const WORLD_PATH = './assets/models/terrain/world_terrain.glb';

export function TerrainWorld() {
	return <WorldLoader worldPath={WORLD_PATH} />;
}

// Starts downloading the model right away, not when the component mounts
useGLTF.preload(WORLD_PATH);
```

### Objects

Export each object into its own file, with its collider meshes in the same file. Object without `COL_` mesh(es) has no collisions.

`ModelLoader` supports three types of objects, set by the `type` prop:

| Type        | Use for                                                     | Colliders                                     |
| ----------- | ----------------------------------------------------------- | --------------------------------------------- |
| `static`    | Things that never move (furniture, props). Default.         | Stay where they are, even if animations play. |
| `kinematic` | Things moved by code or animations (doors, drawers, NPCs).  | Follow their animated `COL_` meshes.          |
| `dynamic`   | Things moved by physics (crates, balls, anything pushable). | Move with the physics body.                   |

Create a component for each object:

```tsx
import { useGLTF } from '@react-three/drei';
import { ModelLoader } from '../ModelLoader';

const MODEL_PATH = './assets/models/cupboard/cupboard.glb';

type CupboardProps = {
	position?: [number, number, number];
	rotation?: [number, number, number];
};

// Static cupboard, collider comes from COL_BOX_cupboard in the model
export function Cupboard({ position, rotation }: CupboardProps) {
	return <ModelLoader modelPath={MODEL_PATH} type="static" position={position} rotation={rotation} />;
}

useGLTF.preload(MODEL_PATH);
```

Then put the world and the objects together in your game world:

```tsx
import { TerrainWorld } from './worlds/TerrainWorld';
import { Cupboard } from './objects/Cupboard';

export default function MyWorld() {
	return (
		<>
			<TerrainWorld />
			<Cupboard position={[-2, 0.5, 2.5]} />
		</>
	);
}
```

Other useful `ModelLoader` props:

- `scale` - typical `[x, y, z]` parameters, colliders are scaled with the model.
- `autoPlay` - animation clip name(s) looped from the start (idle, ambient motion). Clip names must match the Blender animation names.
- `onInteract` and `interactLabel` - makes the object interactable. If player looks at it, the UI shows the label (e.g. "open") and pressing the interact key calls `onInteract`.
- `debugColliders` - shows the `COL_` meshes.
- `rigidBodyProps` - extra Rapier body settings, e.g. `mass` or `enabledRotations`.
- `ref` - gives you the model handle, with `play(clip, { loop, fade, reverse })` to play animations, plus the `root` object, the physics `body`, `actions` and `mixer`.

`onInteract` also gets the model handle. For example, if we have doors that open and close when the player interacts with them, then one `DoorOpen` clip is enough, because closing just plays opening backwards. Interrupting it (closing a door that's still opening) continues from the current frame. The interaction prompt switches between "open" and "close" right away.

```tsx
export function Door({ position, rotation }: DoorProps) {
	const [open, setOpen] = useState(false);

	return (
		<ModelLoader
			modelPath="./assets/models/door/door.glb"
			type="kinematic"
			position={position}
			rotation={rotation}
			interactLabel={open ? 'close' : 'open'}
			onInteract={door => {
				door.play('DoorOpen', { reverse: open });
				setOpen(!open);
			}}
		/>
	);
}
```

Calling `play` again on a one-shot clip that has already finished replays it (e.g. a wave), so keep track of the state yourself for things like doors, as above.

## Export to itch.io (and other platforms)

You can build and export the project by simply running:

`npm run export`

This type-checks the project (and stops if there are any type errors), builds it and packs the build into a `.zip` file named after the `name` field in `package.json` (e.g. `three-js-3d-base-project.zip`). The file is ready to be uploaded to itch.io right away.

The `.zip` file is saved into the `export` folder, which is ignored by git.

### Manual way

You can create a new build by running:

`npm run build`

This type-checks the project (and stops if there are any type errors), then creates a `dist` folder with `index.html` in the root, as expected by itch.io. Build also creates an `assets` folder, which will match your `public/assets` folder.

Then simply zip the contents of the `dist` folder into a `.zip` file and upload it to itch.io.
