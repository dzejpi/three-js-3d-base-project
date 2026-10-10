import React from 'react';
import GameUiTitle from '../ui/GameUiTitle';
import GeneralGameButton from '../ui/GeneralGameButton';
import UICenterWrapper from '../ui/UICenterWrapper';
import GameUiTextSection from '../ui/GameUiTextSection';
import SettingsItem from '../ui/SettingsItem';
import SettingsItemLabel from '../ui/SettingsItemLabel';
import UIScrollArea from '../ui/UIScrollArea';
import UIBottomAction from '../ui/UIBottomAction';
import { useSettings } from '../config/settingsStore';

interface Props {
	onBack: () => void;
	backLabel?: string;
}

export default function SettingsScreen({ onBack, backLabel = 'Back to menu' }: Props) {
	const fullscreen = useSettings(s => s.fullscreen);
	const music = useSettings(s => s.music);
	const sfx = useSettings(s => s.sfx);
	const mouseSensitivity = useSettings(s => s.mouseSensitivity);
	const fov = useSettings(s => s.fov);
	const invertYAxis = useSettings(s => s.invertYAxis);
	const cycle = useSettings(s => s.cycle);
	const toggle = useSettings(s => s.toggle);
	const toggleFullscreen = useSettings(s => s.toggleFullscreen);

	return (
		<UICenterWrapper>
			<GameUiTitle>Game settings</GameUiTitle>
			<UIScrollArea>
				<GameUiTextSection>Video settings</GameUiTextSection>
				<SettingsItem>
					<SettingsItemLabel>Fullscreen</SettingsItemLabel>
					<GeneralGameButton onClick={toggleFullscreen}>{fullscreen ? 'On' : 'Off'}</GeneralGameButton>
				</SettingsItem>

				<GameUiTextSection>Audio settings</GameUiTextSection>
				<SettingsItem>
					<SettingsItemLabel>Music</SettingsItemLabel>
					<GeneralGameButton onClick={() => cycle('music')}>{music} %</GeneralGameButton>
				</SettingsItem>
				<SettingsItem>
					<SettingsItemLabel>SFX</SettingsItemLabel>
					<GeneralGameButton onClick={() => cycle('sfx')}>{sfx} %</GeneralGameButton>
				</SettingsItem>

				<GameUiTextSection>Gameplay</GameUiTextSection>
				<SettingsItem>
					<SettingsItemLabel>Mouse sensitivity</SettingsItemLabel>
					<GeneralGameButton onClick={() => cycle('mouseSensitivity')}>{mouseSensitivity} %</GeneralGameButton>
				</SettingsItem>
				<SettingsItem>
					<SettingsItemLabel>FOV</SettingsItemLabel>
					<GeneralGameButton onClick={() => cycle('fov')}>{fov}</GeneralGameButton>
				</SettingsItem>
				<SettingsItem>
					<SettingsItemLabel>Invert Y-Axis</SettingsItemLabel>
					<GeneralGameButton onClick={() => toggle('invertYAxis')}>{invertYAxis ? 'On' : 'Off'}</GeneralGameButton>
				</SettingsItem>
			</UIScrollArea>

			<UIBottomAction>
				<GeneralGameButton onClick={onBack}>{backLabel}</GeneralGameButton>
			</UIBottomAction>
		</UICenterWrapper>
	);
}
