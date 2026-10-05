import React from 'react';

interface UIWrapperProps {
	children: React.ReactNode;
}

export default function UICenterWrapper({ children }: UIWrapperProps) {
	return <div className="flex flex-col gap-4 items-center mt-8">{children}</div>;
}
