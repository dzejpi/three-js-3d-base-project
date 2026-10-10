import React from 'react';

interface Props {
	hidden?: boolean;
}

export default function PlayerUi({ hidden = false }: Props) {
	return (
		<div
			className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-8 ${hidden ? 'invisible' : ''}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex flex-col text-white">
					<div>Left Upper UI Info</div>
				</div>

				<div className="flex flex-col text-right text-white">
					<div>Right Upper UI Info</div>
				</div>
			</div>

			<div className="flex items-end justify-between">
				<div className="flex flex-col text-white">
					<div>Left Bottom UI Info</div>
				</div>

				<div className="flex flex-col text-right text-white">
					<div>Right Bottom UI Info</div>
				</div>
			</div>

			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white">
				○<div className="absolute left-full top-full ml-1 mt-1 whitespace-nowrap">E to collect</div>
			</div>
		</div>
	);
}
