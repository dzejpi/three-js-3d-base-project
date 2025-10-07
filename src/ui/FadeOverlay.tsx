import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FadeOverlayProps {
	visible: boolean;
	duration?: number;
}

export default function FadeOverlay({ visible, duration = 1 }: FadeOverlayProps) {
	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration }}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'black',
						pointerEvents: 'none',
						zIndex: 9999,
					}}
				/>
			)}
		</AnimatePresence>
	);
}
