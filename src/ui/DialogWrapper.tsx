import React from 'react';

interface DialogWrapperProps {
	children: React.ReactNode;
}

export default function DialogWrapper({ children }: DialogWrapperProps) {
	return (
		<div className="absolute bottom-8 left-1/2 w-[92%] -translate-x-1/2 rounded-lg bg-black/80 p-8 font-mono text-white">
			{children}
		</div>
	);
}
