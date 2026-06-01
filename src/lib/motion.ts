import { animate, inView, scroll } from '@motionone/dom';
import type { Action } from 'svelte/action';

type RevealOptions = {
	delay?: number;
	duration?: number;
	y?: number;
	once?: boolean;
};

type ParallaxOptions = {
	from?: number;
	to?: number;
	scaleFrom?: number;
	scaleTo?: number;
	offset?: ['start end' | 'center end' | 'end start', 'start end' | 'center center' | 'end start'];
};

const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const { delay = 0, duration = 0.7, y = 28, once = true } = options;

	if (prefersReducedMotion()) {
		node.style.opacity = '1';
		node.style.transform = 'none';
		return {};
	}

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.willChange = 'opacity, transform';

	const stop = inView(
		node,
		() => {
			animate(
				node,
				{ opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] },
				{ duration, delay, easing: [0.16, 1, 0.3, 1] }
			);

			if (once) return;

			return () => {
				animate(
					node,
					{ opacity: 0, transform: `translateY(${Math.round(y / 2)}px)` },
					{ duration: 0.25, easing: [0.25, 1, 0.5, 1] }
				);
			};
		},
		{ amount: 0.18, margin: '0px 0px -10% 0px' }
	);

	return {
		destroy() {
			stop();
			node.style.willChange = '';
		}
	};
};

export const parallax: Action<HTMLElement, ParallaxOptions | undefined> = (node, options = {}) => {
	const {
		from = -24,
		to = 24,
		scaleFrom = 1,
		scaleTo = 1,
		offset = ['start end', 'end start']
	} = options;

	if (prefersReducedMotion()) return {};

	node.style.willChange = 'transform';

	const stop = scroll(
		({ y }) => {
			const progress = Math.min(1, Math.max(0, y.progress));
			const translateY = from + (to - from) * progress;
			const scale = scaleFrom + (scaleTo - scaleFrom) * progress;
			node.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
		},
		{ target: node, offset }
	);

	return {
		destroy() {
			stop();
			node.style.willChange = '';
		}
	};
};
