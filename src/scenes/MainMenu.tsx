import React, { useState } from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import UIWrapper from '../ui/UIWrapper';
import GameUiTitle from '../ui/GameUiTitle';
import UICenterWrapper from '../ui/UICenterWrapper';

interface Props {
	onStart: () => void;
	onCredits: () => void;
}

export default function MainMenu({ onCredits, onStart }: Props) {
	const [soundsOn, setSoundsOn] = useState(true);
	const [musicOn, setMusicOn] = useState(true);

	const handleNewGame = () => {
		onStart();
	};

	const handleOptions = () => {
		console.log('Options TODO');
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
		<UIWrapper>
			<UICenterWrapper>
				<GameUiTitle>Game Name</GameUiTitle>
				<GeneralGameButton onClick={handleNewGame}>Start</GeneralGameButton>
				<GeneralGameButton onClick={handleOptions}>Options</GeneralGameButton>
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
			</UICenterWrapper>
		</UIWrapper>
	);
}
