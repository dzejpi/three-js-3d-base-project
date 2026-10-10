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
					className="pointer-events-none fixed inset-0 z-50 bg-black"
				/>
			)}
		</AnimatePresence>
	);
}
