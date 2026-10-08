import React from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';
import GameUiText from '../ui/GameUiText';
import UICenterWrapper from '../ui/UICenterWrapper';

interface Props {
	onBackToMenu: () => void;
}

export default function Credits({ onBackToMenu }: Props) {
	return (
		<UICenterWrapper>
			<GameUiTitle>Credits</GameUiTitle>
			<div className="flex min-h-0 flex-1 flex-col items-start gap-6 overflow-y-auto py-4">
				<GameUiText>Very nice credits.</GameUiText>
				<GameUiText>Very nice credits.</GameUiText>
				<GameUiText>Very nice credits.</GameUiText>
				<GameUiText>Very nice credits.</GameUiText>
			</div>

			<div className="w-48 self-center">
				<GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
			</div>
		</UICenterWrapper>
	);
}
