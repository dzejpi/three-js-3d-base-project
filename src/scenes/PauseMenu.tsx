import React, { useState } from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';
import UICenterWrapper from '../ui/UICenterWrapper';
import UIScrollArea from '../ui/UIScrollArea';
import SettingsScreen from './SettingsScreen';

interface Props {
	onResume: () => void;
	onMainMenu: () => void;
}

export default function PauseMenu({ onResume, onMainMenu }: Props) {
	const [showSettings, setShowSettings] = useState(false);

	if (showSettings) {
		return (
			<div className="relative z-10 h-full">
				<SettingsScreen onBack={() => setShowSettings(false)} backLabel="Back" />
			</div>
		);
	}

	return (
		<UICenterWrapper>
			<div className="z-10">
				<GameUiTitle>Paused</GameUiTitle>

				<UIScrollArea>
					<GeneralGameButton onClick={onResume}>Continue</GeneralGameButton>
					<GeneralGameButton onClick={() => setShowSettings(true)}>Settings</GeneralGameButton>
					<GeneralGameButton onClick={onMainMenu}>Quit to menu</GeneralGameButton>
				</UIScrollArea>
			</div>
		</UICenterWrapper>
	);
}
