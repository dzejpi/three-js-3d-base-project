import React from 'react';

interface GameUiTextProps {
	children: React.ReactNode;
}

export default function GameUiText({ children }: GameUiTextProps) {
	return <p className="mb-8">{children}</p>;
}
