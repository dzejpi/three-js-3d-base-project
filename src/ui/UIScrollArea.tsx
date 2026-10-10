import React from 'react';

interface UIScrollAreaProps {
	children: React.ReactNode;
}

export default function UIScrollArea({ children }: UIScrollAreaProps) {
	return <div className="flex min-h-0 flex-1 flex-col items-start gap-4 overflow-y-auto px-8 py-4">{children}</div>;
}
