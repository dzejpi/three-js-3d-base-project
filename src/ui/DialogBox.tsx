import React, { useState, useEffect } from 'react';
import DialogText from './DialogText';
import DialogContinuePrompt from './DialogContinuePrompt';
import DialogWrapper from './DialogWrapper';

interface DialogBoxProps {
	lines: string[];
	autoDismiss?: boolean;
	letterDelay?: number;
	onComplete?: () => void;
}

export default function DialogBox({ lines, autoDismiss = false, letterDelay = 75, onComplete }: DialogBoxProps) {
	const [lineIndex, setLineIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [visibleText, setVisibleText] = useState('');
	const [showTooltip, setShowTooltip] = useState(false);

	// Typewriter effect
	useEffect(() => {
		if (charIndex < lines[lineIndex].length) {
			const timeout = setTimeout(() => {
				setCharIndex(prev => prev + 1);
			}, letterDelay);
			return () => clearTimeout(timeout);
		} else {
			// Line fully displayed, show tooltip
			setShowTooltip(true);

			if (autoDismiss) {
				const auto = setTimeout(() => handleNextLine(), 2000);
				return () => clearTimeout(auto);
			}
		}
	}, [charIndex, lineIndex]);

	// Update text
	useEffect(() => {
		setVisibleText(lines[lineIndex].slice(0, charIndex));
	}, [charIndex, lineIndex]);

	// Keyboard handler
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.code === 'Space' && showTooltip && !autoDismiss) {
				handleNextLine();
			}
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [showTooltip, autoDismiss]);

	const handleNextLine = () => {
		setShowTooltip(false);

		if (lineIndex < lines.length - 1) {
			setLineIndex(prev => prev + 1);
			setCharIndex(0);
		} else {
			onComplete?.();
		}
	};

	return (
		<DialogWrapper>
			<DialogText>{visibleText}</DialogText>
			<DialogContinuePrompt visible={showTooltip && !autoDismiss} />
		</DialogWrapper>
	);
}
