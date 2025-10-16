import React from 'react';

interface UIWrapperProps {
	children: React.ReactNode;
}

export default function UIWrapper({ children }: UIWrapperProps) {
	return (
		// Outer wrapper — global layout
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
				padding: '4rem',
				boxSizing: 'border-box',
				pointerEvents: 'none', // ensures it doesn't block the 3D world clicks
			}}
		>
			{/* Inner container for clickable elements */}
			<div
				style={{
					width: '100%',
					pointerEvents: 'auto', // allows interaction with children
				}}
			>
				{children}
			</div>
		</div>
	);
}
