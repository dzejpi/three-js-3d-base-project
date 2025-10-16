import React, { useState, useEffect } from 'react';
import { ColorTokens } from '../styles/colors';

interface KeyBindButtonProps {
	action: string;
	position: number;
	initialKey?: string;
	onChange: (position: number, newKey: string | undefined) => void;
}

export default function KeyBindButton({ action, position, initialKey, onChange }: KeyBindButtonProps) {
	const [currentKey, setCurrentKey] = useState(initialKey);
	const [listening, setListening] = useState(false);

	useEffect(() => {
		if (!listening) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			e.preventDefault();
			setCurrentKey(e.key);
			onChange(position, e.key);
			setListening(false);
		};

		const handleClickOutside = () => setListening(false);

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('click', handleClickOutside);
		};
	}, [listening]);

	return (
		<button
			onClick={e => {
				e.stopPropagation();
				setListening(true);
				setCurrentKey('?');
			}}
			style={{
				minWidth: '12rem',
				padding: '0.8rem 1.6rem',
				fontFamily: 'monospace',
				border: listening ? '0px solid yellow' : '1px solid white',
				borderRadius: '6px',
				background: listening ? ColorTokens.button_hover : ColorTokens.button_primary,
				color: ColorTokens.button_text,
				cursor: 'pointer',
			}}
		>
			{currentKey ? currentKey.toUpperCase() : '-'}
		</button>
	);
}
