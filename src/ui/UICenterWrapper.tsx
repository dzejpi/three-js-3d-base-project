import React from 'react';

interface UIWrapperProps {
	children: React.ReactNode;
}

export default function UICenterWrapper({ children }: UIWrapperProps) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
			{children}
		</div>
	);
}
