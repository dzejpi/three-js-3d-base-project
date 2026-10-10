import React, { useRef, useEffect, useState } from 'react';
import GeneralGameButton from '../ui/GeneralGameButton';
import GameUiTitle from '../ui/GameUiTitle';
import GameUiText from '../ui/GameUiText';
import UICenterWrapper from '../ui/UICenterWrapper';
import UIScrollArea from '../ui/UIScrollArea';
import UIBottomAction from '../ui/UIBottomAction';

interface Props {
	isGameWon: boolean;
	score: number;
	highScore: number;
	onMainMenu: () => void;
}

export default function EndGameScreen({ isGameWon, score, highScore, onMainMenu }: Props) {
	return (
		<UICenterWrapper>
			<GameUiTitle>{isGameWon ? 'You won!' : 'Game over!'}</GameUiTitle>

			<UIScrollArea>
				<GameUiText>Your score: {score}</GameUiText>
				<GameUiText>Highest score: {highScore}</GameUiText>
			</UIScrollArea>

			<UIBottomAction>
				<GeneralGameButton onClick={onMainMenu}>Back to main menu</GeneralGameButton>
			</UIBottomAction>
		</UICenterWrapper>
	);
}
