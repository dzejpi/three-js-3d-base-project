import React from 'react';

interface GeneralGameButtonProps {
	onClick?: () => void;
	disabled?: boolean;
	toggle?: boolean;
	active?: boolean;
	children: React.ReactNode;
}

export default function GeneralGameButton({
	onClick,
	disabled = false,
	toggle = false,
	active = false,
	children,
}: GeneralGameButtonProps) {
	const baseClass = 'min-w-40 px-6 py-3 text-base rounded-lg border border-white text-white transition-all duration-200';

	const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

	const backgroundClass = disabled ? 'bg-gray-300' : toggle && active ? 'bg-gray-800' : 'bg-gray-500 hover:bg-gray-600';

	return (
		<button
			onClick={disabled ? undefined : onClick}
			disabled={disabled}
			className={`${baseClass} ${cursorClass} ${backgroundClass}`}
		>
			{children}
		</button>
	);
}
