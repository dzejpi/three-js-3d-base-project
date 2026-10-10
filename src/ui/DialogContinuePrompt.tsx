import React from 'react';

interface DialogContinuePromptProps {
	visible: boolean;
}

export default function DialogContinuePrompt({ visible }: DialogContinuePromptProps) {
	return (
		<p className={`min-h-6 text-center text-base ${visible ? 'animate-blink' : ''}`}>
			{visible ? 'Press Space to continue' : ''}
		</p>
	);
}
