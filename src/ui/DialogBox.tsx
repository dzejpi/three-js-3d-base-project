import React, { useState, useEffect } from 'react';

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
		<div
			style={{
				position: 'absolute',
				bottom: '2rem',
				left: '50%',
				transform: 'translateX(-50%)',
				width: '92%',
				padding: '2rem',
				background: 'rgba(0,0,0,0.8)',
				color: 'white',
				borderRadius: '8px',
				fontFamily: 'monospace',
			}}
		>
			<p
				style={{
					minHeight: '4rem',
					fontSize: '1.2rem',
				}}
			>
				{visibleText}
			</p>
			<p
				style={{
					fontSize: '1rem',
					color: 'white',
					minHeight: '1.5rem',
					animation: showTooltip && !autoDismiss ? 'blink 2s infinite' : 'none',
					textAlign: 'center',
				}}
			>
				{showTooltip && !autoDismiss ? 'Press Space to continue' : ''}
			</p>

			{/* Tooltip blinking */}
			<style>
				{`
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `}
			</style>
		</div>
	);
}
