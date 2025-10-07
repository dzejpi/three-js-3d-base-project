import React from 'react';

interface GameUiTextProps {
	children: React.ReactNode;
}

export default function GameUiText({ children }: GameUiTextProps) {
	return <p style={{ marginBottom: '2rem' }}>{children}</p>;
}
