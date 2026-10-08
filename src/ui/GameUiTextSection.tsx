import React from 'react';

interface GameUiTextSectionProps {
	children: React.ReactNode;
}

export default function GameUiTextSection({ children }: GameUiTextSectionProps) {
	return <h2 className="pt-8 text-left text-xl">{children}</h2>;
}
