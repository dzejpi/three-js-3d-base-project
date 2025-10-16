import React from 'react';
import GameUiTitle from '../ui/GameUiTitle';
import GeneralGameButton from '../ui/GeneralGameButton';
import OptionsKeybinds from '../settings/OptionsKeybinds';
import UIWrapper from '../ui/UIWrapper';
import UICenterWrapper from '../ui/UICenterWrapper';

interface Props {
	onBackToMenu: () => void;
}

export default function OptionsScreen({ onBackToMenu }: Props) {
	return (
		<UIWrapper>
			<UICenterWrapper>
				<GameUiTitle>Settings</GameUiTitle>

				<OptionsKeybinds />

				<GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
			</UICenterWrapper>
		</UIWrapper>
	);
}
