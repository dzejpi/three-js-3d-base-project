import React from 'react';

interface UIWrapperProps {
	children: React.ReactNode;
}

// Global layout
export default function UIWrapper({ children }: UIWrapperProps) {
	return (
		<div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8">
			<div className="pointer-events-auto w-full">{children}</div>
		</div>
	);
}
