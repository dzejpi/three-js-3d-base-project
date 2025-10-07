import React from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';

interface Props {
	onResume: () => void;
	onMainMenu: () => void;
}

export default function PauseMenu({ onResume, onMainMenu }: Props) {
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				gap: '1rem',
				background: 'rgba(0,0,0,0.7)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				color: 'white',
				zIndex: 20,
			}}
		>
			<GameUiTitle>Paused</GameUiTitle>
			<GeneralGameButton onClick={onResume}>Continue</GeneralGameButton>
			<GeneralGameButton onClick={onMainMenu}>Quit to menu</GeneralGameButton>
		</div>
	);
}
