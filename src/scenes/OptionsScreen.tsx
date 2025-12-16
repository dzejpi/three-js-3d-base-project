import React, { useState } from 'react';
import GameUiTitle from '../ui/GameUiTitle';
import GeneralGameButton from '../ui/GeneralGameButton';
import OptionsKeybinds from '../settings/OptionsKeybinds';
import UIWrapper from '../ui/UIWrapper';
import UICenterWrapper from '../ui/UICenterWrapper';

// Placeholder components (replace with real ones later)
function OptionsInterface() {
	return <p>Interface options coming soon</p>;
}
function OptionsGraphics() {
	return <p>Graphics options coming soon</p>;
}
function OptionsSounds() {
	return <p>Sound settings coming soon</p>;
}

type Tab = 'interface' | 'graphics' | 'sounds' | 'controls';

interface Props {
	onBackToMenu: () => void;
}

export default function OptionsScreen({ onBackToMenu }: Props) {
	const [activeTab, setActiveTab] = useState<Tab>('controls');

	const renderActiveTab = () => {
		switch (activeTab) {
			case 'interface':
				return <OptionsInterface />;
			case 'graphics':
				return <OptionsGraphics />;
			case 'sounds':
				return <OptionsSounds />;
			case 'controls':
				return <OptionsKeybinds />;
			default:
				return null;
		}
	};

	return (
		<UIWrapper>
			<UICenterWrapper>
				<GameUiTitle>Settings</GameUiTitle>

				{/* Tab Buttons */}
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
				>
					<GeneralGameButton onClick={() => setActiveTab('interface')} toggle active={activeTab === 'interface'}>
						Interface
					</GeneralGameButton>

					<GeneralGameButton onClick={() => setActiveTab('graphics')} toggle active={activeTab === 'graphics'}>
						Graphics
					</GeneralGameButton>

					<GeneralGameButton onClick={() => setActiveTab('sounds')} toggle active={activeTab === 'sounds'}>
						Sounds
					</GeneralGameButton>

					<GeneralGameButton onClick={() => setActiveTab('controls')} toggle active={activeTab === 'controls'}>
						Controls
					</GeneralGameButton>
				</div>

				{/* Active Section */}
				<div
					style={{
						minHeight: '250px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					{renderActiveTab()}
				</div>

				<GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
			</UICenterWrapper>
		</UIWrapper>
	);
}
