import React, { useState } from 'react';
import KeyBindButton from './KeyBindButton';

interface InputRowProps {
	description: string;
	action: string;
	defaultBindings?: (string | undefined)[];
}

export default function InputRow({
	description,
	action,
	defaultBindings = [undefined, undefined, undefined, undefined],
}: InputRowProps) {
	const [bindings, setBindings] = React.useState<(string | undefined)[]>(defaultBindings);

	const handleKeyChange = (position: number, newKey: string | undefined) => {
		const updated = [...bindings];
		updated[position] = newKey;
		setBindings(updated);
		console.log(`Action '${action}' updated bindings:`, updated);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
			<span style={{ width: '12rem', textAlign: 'right' }}>{description}</span>
			{bindings.map((key, i) => (
				<KeyBindButton key={i} action={action} position={i} initialKey={key} onChange={handleKeyChange} />
			))}
		</div>
	);
}
