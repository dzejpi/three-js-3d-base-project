import React from 'react';
import GameUiTitle from '../ui/GameUiTitle';
import GeneralGameButton from '../ui/GeneralGameButton';
import UICenterWrapper from '../ui/UICenterWrapper';
import GameUiTextSection from '../ui/GameUiTextSection';
import SettingsItem from '../ui/SettingsItem';
import SettingsItemLabel from '../ui/SettingsItemLabel';

interface Props {
	onBackToMenu: () => void;
}

export default function SettingsScreen({ onBackToMenu }: Props) {
	return (
		<UICenterWrapper>
			<GameUiTitle>Game settings</GameUiTitle>
			<div className="flex flex-1 flex-col overflow-y-auto py-4">
				<div className="flex flex-col items-start gap-6 ">
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
				</div>
			</div>
			<div className="w-48 self-center py-16">
				<GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
			</div>
		</UICenterWrapper>
	);
}
