import React from 'react';

interface UIWrapperProps {
	children: React.ReactNode;
}

export default function UICenterWrapper({ children }: UIWrapperProps) {
	return <div className="flex h-full flex-col gap-4 items-center pt-8">{children}</div>;
}
