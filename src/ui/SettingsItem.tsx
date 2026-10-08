import React from 'react';

interface SettingsItemProps {
	children: React.ReactNode;
}

export default function SettingsItem({ children }: SettingsItemProps) {
	return <div className="flex items-center gap-4">{children}</div>;
}
