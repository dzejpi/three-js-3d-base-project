import React from 'react';
import GameUiTitle from '../ui/GameUiTitle';
import GeneralGameButton from '../ui/GeneralGameButton';
import UICenterWrapper from '../ui/UICenterWrapper';
import GameUiTextSection from '../ui/GameUiTextSection';
import SettingsItem from '../ui/SettingsItem';
import SettingsItemLabel from '../ui/SettingsItemLabel';
import UIScrollArea from '../ui/UIScrollArea';
import UIBottomAction from '../ui/UIBottomAction';

interface Props {
	onBackToMenu: () => void;
}

export default function SettingsScreen({ onBackToMenu }: Props) {
	return (
		<UICenterWrapper>
			<GameUiTitle>Game settings</GameUiTitle>
			<UIScrollArea>
				<GameUiTextSection>Video settings</GameUiTextSection>
				<SettingsItem>
					<SettingsItemLabel>Fullscreen</SettingsItemLabel>
					<GeneralGameButton onClick={() => console.log('Video settings clicked')}>Off</GeneralGameButton>
				</SettingsItem>

				<GameUiTextSection>Audio settings</GameUiTextSection>
				<SettingsItem>
					<SettingsItemLabel>Music</SettingsItemLabel>
					<GeneralGameButton onClick={() => console.log('Music settings clicked')}>On</GeneralGameButton>
				</SettingsItem>
				<SettingsItem>
					<SettingsItemLabel>SFX</SettingsItemLabel>
					<GeneralGameButton onClick={() => console.log('SFX settings clicked')}>On</GeneralGameButton>
				</SettingsItem>

				<GameUiTextSection>Gameplay</GameUiTextSection>
				<SettingsItem>
					<SettingsItemLabel>Mouse sensitivity</SettingsItemLabel>
					<GeneralGameButton onClick={() => console.log('Gameplay settings clicked')}>100 %</GeneralGameButton>
				</SettingsItem>
				<SettingsItem>
					<SettingsItemLabel>FOV</SettingsItemLabel>
					<GeneralGameButton onClick={() => console.log('Gameplay settings clicked')}>90</GeneralGameButton>
				</SettingsItem>
				<SettingsItem>
					<SettingsItemLabel>Invert Y-Axis</SettingsItemLabel>
					<GeneralGameButton onClick={() => console.log('Gameplay settings clicked')}>Off</GeneralGameButton>
				</SettingsItem>
			</UIScrollArea>

			<UIBottomAction>
				<GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
			</UIBottomAction>
		</UICenterWrapper>
	);
}
