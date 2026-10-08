import React from 'react';

interface SettingsItemProps {
	children: React.ReactNode;
}

export default function SettingsItem({ children }: SettingsItemProps) {
	return <h2 className="flex items-center gap-4">{children}</h2>;
}
