import React from 'react';

interface SettingsItemLabelProps {
    children: React.ReactNode;
}

export default function SettingsItemLabel({ children }: SettingsItemLabelProps) {
    return <label className="w-32">{children}</label>;
}
