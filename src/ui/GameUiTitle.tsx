import React from 'react';

interface GameUiTitleProps {
	children: React.ReactNode;
}

export default function GameUiTitle({ children }: GameUiTitleProps) {
	return <h1 className="text-4xl text-center mb-2">{children}</h1>;
}
