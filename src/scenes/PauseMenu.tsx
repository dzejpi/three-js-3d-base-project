import React from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';
import UICenterWrapper from '../ui/UICenterWrapper';
import UIScrollArea from '../ui/UIScrollArea';

interface Props {
	onResume: () => void;
	onMainMenu: () => void;
}

export default function PauseMenu({ onResume, onMainMenu }: Props) {
	return (
		<UICenterWrapper>
			<div className="z-10">
				<GameUiTitle>Paused</GameUiTitle>

				<UIScrollArea>
					<GeneralGameButton onClick={onResume}>Continue</GeneralGameButton>
					<GeneralGameButton onClick={onMainMenu}>Quit to menu</GeneralGameButton>
				</UIScrollArea>
			</div>
		</UICenterWrapper>
	);
}
