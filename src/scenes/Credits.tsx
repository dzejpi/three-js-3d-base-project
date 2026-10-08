import React from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';
import GameUiText from '../ui/GameUiText';
import UICenterWrapper from '../ui/UICenterWrapper';
import UIScrollArea from '../ui/UIScrollArea';
import UIBottomAction from '../ui/UIBottomAction';

interface Props {
	onBackToMenu: () => void;
}

export default function Credits({ onBackToMenu }: Props) {
	return (
		<UICenterWrapper>
			<GameUiTitle>Credits</GameUiTitle>
			<UIScrollArea>
				<GameUiText>Very nice credits.</GameUiText>
				<GameUiText>Very nice credits.</GameUiText>
				<GameUiText>Very nice credits.</GameUiText>
				<GameUiText>Very nice credits.</GameUiText>
			</UIScrollArea>

			<UIBottomAction>
				<GeneralGameButton onClick={onBackToMenu}>Back to Menu</GeneralGameButton>
			</UIBottomAction>
		</UICenterWrapper>
	);
}
