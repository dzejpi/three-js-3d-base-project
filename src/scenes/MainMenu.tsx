import React, { useState } from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';
import UICenterWrapper from '../ui/UICenterWrapper';
import UIScrollArea from '../ui/UIScrollArea';
import UIBottomAction from '../ui/UIBottomAction';
import GameUiText from '../ui/GameUiText';

interface Props {
	onStart: () => void;
	onCredits: () => void;
	onSettings: () => void;
}

export default function MainMenu({ onCredits, onStart, onSettings }: Props) {
	const [soundsOn, setSoundsOn] = useState(true);
	const [musicOn, setMusicOn] = useState(true);

	const handleNewGame = () => {
		onStart();
	};

	const handleOptions = () => {
		onSettings();
	};

	const handleSounds = () => {
		setSoundsOn(prev => !prev);
	};

	const handleMusic = () => {
		setMusicOn(prev => !prev);
	};

	const handleCredits = () => {
		onCredits();
	};

	const handleQuit = () => {
		console.log('Quit game TODO');
	};

	return (
		<UICenterWrapper>
			<GameUiTitle>Game Name</GameUiTitle>

			<UIScrollArea>
				<GeneralGameButton onClick={handleNewGame}>Start</GeneralGameButton>
				<GeneralGameButton onClick={handleOptions}>Settings</GeneralGameButton>
				<GeneralGameButton onClick={handleSounds} toggle active={soundsOn}>
					Sounds: {soundsOn ? 'on' : 'off'}
				</GeneralGameButton>
				<GeneralGameButton onClick={handleMusic} toggle active={musicOn}>
					Music: {musicOn ? 'on' : 'off'}
				</GeneralGameButton>
				<GeneralGameButton onClick={handleCredits}>Credits</GeneralGameButton>
				<GeneralGameButton disabled onClick={handleQuit}>
					Quit
				</GeneralGameButton>
			</UIScrollArea>
		</UICenterWrapper>
	);
}
