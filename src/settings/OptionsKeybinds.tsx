import React from 'react';
import InputRow from './InputRow';
import GameUiTitle from '../ui/GameUiTitle';
import GeneralGameButton from '../ui/GeneralGameButton';

interface Props {
	onBack: () => void;
}

export default function OptionsKeybinds({ onBack }: Props) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
			<InputRow
				description="Move forward"
				action="move_forward"
				defaultBindings={['w', 'arrowup', 'controller_up', undefined]}
			/>
			<InputRow
				description="Move backward"
				action="move_backward"
				defaultBindings={['s', 'arrowdown', 'controller_down', undefined]}
			/>
			<InputRow
				description="Move left"
				action="move_left"
				defaultBindings={['a', 'arrowleft', 'controller_left', undefined]}
			/>
			<InputRow
				description="Move right"
				action="move_right"
				defaultBindings={['d', 'arrowright', 'controller_right', undefined]}
			/>
			<InputRow
				description="Sprint"
				action="move_sprint"
				defaultBindings={['shift', undefined, undefined, undefined]}
			/>
			<InputRow description="Jump" action="move_jump" defaultBindings={['space', undefined, undefined, undefined]} />
		</div>
	);
}
