import React from 'react';

interface UIBottomActionProps {
	children: React.ReactNode;
}

export default function UIBottomAction({ children }: UIBottomActionProps) {
	return <div className="w-48 self-center">{children}</div>;
}
