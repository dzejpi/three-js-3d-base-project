import React from 'react';

interface DialogTextProps {
	children: React.ReactNode;
}

export default function DialogText({ children }: DialogTextProps) {
	return <p className="min-h-16 text-lg">{children}</p>;
}
