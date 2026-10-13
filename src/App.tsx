import React, { useState, useEffect } from 'react';
import Game from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import SplashScreen from './scenes/SplashScreen';
import FadeOverlay from './ui/FadeOverlay';
import EndGameScreen from './scenes/EndGameScreen';
import DialogBox from './ui/DialogBox';
import Credits from './scenes/Credits';
import UIWrapper from './ui/UIWrapper';
import SettingsScreen from './scenes/SettingsScreen';

type Scene = 'splash' | 'menu' | 'game' | 'credits' | 'endgame' | 'dialog' | 'settings';
const SCENES: Scene[] = ['splash', 'menu', 'game', 'credits', 'endgame', 'dialog', 'settings'];
const FADE_DURATION_MS = 500;
const SCENE_STORAGE_KEY = 'dev-scene';

// When running dev, start on the scene from the URL (?scene=game) or the one open before the last reload
function getInitialScene(): Scene {
	if (!import.meta.env.DEV) return 'splash';

	const fromUrl = new URLSearchParams(window.location.search).get('scene');
	let fromStorage: string | null = null;
	try {
		fromStorage = sessionStorage.getItem(SCENE_STORAGE_KEY);
	} catch {}

	const saved = fromUrl ?? fromStorage;
	return SCENES.includes(saved as Scene) ? (saved as Scene) : 'splash';
}

export default function App() {
	const [scene, setScene] = useState<Scene>(getInitialScene);

	useEffect(() => {
		if (!import.meta.env.DEV) return;
		try {
			sessionStorage.setItem(SCENE_STORAGE_KEY, scene);
		} catch {}
	}, [scene]);
	const [fading, setFading] = useState(false);
	const [showDialog, setShowDialog] = useState(true);

	const switchScene = (nextScene: Scene) => {
		setFading(true);
		setTimeout(() => {
			setScene(nextScene);
			setFading(false);
		}, FADE_DURATION_MS);
	};

	return (
		<>
			<UIWrapper>
				{scene === 'splash' && <SplashScreen onContinue={() => switchScene('menu')} />}
				{scene === 'menu' && (
					<MainMenu
						onCredits={() => switchScene('credits')}
						onStart={() => switchScene('game')}
						onSettings={() => switchScene('settings')}
					/>
				)}
				{scene === 'game' && <Game onExit={() => switchScene('menu')} />}
				{scene === 'credits' && <Credits onBackToMenu={() => switchScene('menu')} />}
				{scene === 'settings' && <SettingsScreen onBack={() => switchScene('menu')}></SettingsScreen>}

				{/* For debugging */}
				{scene === 'endgame' && (
					<EndGameScreen isGameWon={false} score={12340} highScore={50000} onMainMenu={() => switchScene('menu')} />
				)}

				{scene === 'dialog' && (
					<>
						{showDialog && (
							<DialogBox
								lines={['Hello, traveler.', 'This world is not what it seems...', 'Be careful out there!']}
								autoDismiss={false}
								letterDelay={75}
								onComplete={() => setShowDialog(false)}
							/>
						)}
					</>
				)}

				<FadeOverlay visible={fading} duration={FADE_DURATION_MS / 1000} />
			</UIWrapper>
		</>
	);
}
