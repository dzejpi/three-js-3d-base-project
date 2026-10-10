import React, { useState, useEffect } from 'react';

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
			className={`min-w-48 px-[1.6rem] py-[0.8rem] font-mono rounded-md text-white cursor-pointer ${
				listening ? 'border-0 bg-button-hover' : 'border border-white bg-button-primary'
			}`}
		>
			{currentKey ? currentKey.toUpperCase() : '-'}
		</button>
	);
}
