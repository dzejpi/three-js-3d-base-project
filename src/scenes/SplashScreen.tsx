import React, { useEffect, useState } from 'react';

interface Props {
	onContinue: () => void;
}

const logos: string[] = ['assets/sprites/splash/logo-jam.png', 'assets/sprites/splash/logo-main.png'];

const fadeInTime: number = 1500;
const displayTime: number = 750;
const fadeOutTime: number = 1500;

type FadeState = 'fade-in' | 'display' | 'fade-out';

export default function SplashScreen({ onContinue }: Props) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [fadeState, setFadeState] = useState<FadeState>('fade-in');
	const [opacity, setOpacity] = useState<number>(0);

	useEffect(() => {
		let timer: number;
		let rafId: number;

		if (fadeState === 'fade-in') {
			setOpacity(0);
			rafId = requestAnimationFrame(() => setOpacity(1));
			timer = setTimeout(() => setFadeState('display'), fadeInTime);
		} else if (fadeState === 'display') {
			setOpacity(1);
			timer = window.setTimeout(() => setFadeState('fade-out'), displayTime);
		} else if (fadeState === 'fade-out') {
			setOpacity(0);
			timer = window.setTimeout(() => {
				if (currentIndex < logos.length - 1) {
					setCurrentIndex(i => i + 1);
					setFadeState('fade-in');
				} else {
					onContinue();
				}
			}, fadeOutTime);
		}

		return () => {
			clearTimeout(timer);
			cancelAnimationFrame(rafId);
		};
	}, [fadeState, currentIndex, onContinue]);

	const style: React.CSSProperties = {
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: opacity,
		transition: `opacity ${fadeState === 'fade-in' ? fadeInTime : fadeState === 'fade-out' ? fadeOutTime : 0}ms`,
	};

	return (
		<div style={style}>
			<img src={logos[currentIndex]} alt={`logo ${currentIndex}`} />
		</div>
	);
}
