// Design Tokens — PullPay Blue Theme

export const colors = {
	brand: {
		orange: '#0FA8F1',
		orangeHover: '#15376E',
		orangeSoft: '#E8F6FE',
		orangeMuted: '#7DD3FC'
	},
	neutral: {
		black: '#0B0B0B',
		charcoal: '#1A1A1A',
		graphite: '#3A3A3A',
		gray700: '#555555',
		gray500: '#8A8A8A',
		gray300: '#D8D8D8',
		gray200: '#EAEAEA',
		gray100: '#F5F5F3',
		white: '#FFFFFF'
	},
	semantic: {
		success: '#18A058',
		successSoft: '#EAF8F0',
		warning: '#F59E0B',
		warningSoft: '#FFF7E6',
		danger: '#E5484D',
		dangerSoft: '#FFF0F0',
		info: '#2F6FED',
		infoSoft: '#EEF4FF'
	},
	surface: {
		page: '#F7F6F3',
		panel: '#FFFFFF',
		raised: '#FFFFFF',
		muted: '#F0EFEC',
		inverse: '#0B0B0B'
	},
	border: {
		subtle: '#E7E4DE',
		default: '#D8D5CE',
		strong: '#BDB8AE'
	}
} as const;

export type ColorToken = keyof typeof colors;

export const typography = {
	display: {
		fontSize: 'clamp(3.5rem, 8vw, 8rem)',
		lineHeight: '0.95',
		letterSpacing: '-0.06em',
		fontWeight: 500
	},
	h1: {
		fontSize: 'clamp(3rem, 6vw, 6rem)',
		lineHeight: '0.98',
		letterSpacing: '-0.055em',
		fontWeight: 500
	},
	h2: {
		fontSize: 'clamp(2rem, 4vw, 4rem)',
		lineHeight: '1.02',
		letterSpacing: '-0.045em',
		fontWeight: 500
	},
	h3: {
		fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
		lineHeight: '1.08',
		letterSpacing: '-0.035em',
		fontWeight: 500
	},
	body: { fontSize: '1rem', lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: 400 },
	small: { fontSize: '0.875rem', lineHeight: '1.45', letterSpacing: '-0.005em', fontWeight: 400 },
	caption: { fontSize: '0.75rem', lineHeight: '1.35', letterSpacing: '0.01em', fontWeight: 500 }
} as const;

export const spacing = {
	0: '0',
	1: '0.25rem',
	2: '0.5rem',
	3: '0.75rem',
	4: '1rem',
	5: '1.25rem',
	6: '1.5rem',
	8: '2rem',
	10: '2.5rem',
	12: '3rem',
	16: '4rem',
	20: '5rem',
	24: '6rem',
	32: '8rem',
	40: '10rem'
} as const;

export const radius = {
	xs: '0.375rem',
	sm: '0.5rem',
	md: '0.75rem',
	lg: '1rem',
	xl: '1.5rem',
	full: '999px'
} as const;

export const shadows = {
	none: 'none',
	sm: '0 1px 2px rgba(11, 11, 11, 0.05)',
	md: '0 12px 32px rgba(11, 11, 11, 0.08)',
	lg: '0 24px 80px rgba(11, 11, 11, 0.12)',
	glowOrange: '0 24px 80px rgba(15, 168, 241, 0.18)'
} as const;

export const motion = {
	duration: { fast: '150ms', normal: '220ms', slow: '420ms' },
	easing: { standard: 'cubic-bezier(0.2, 0, 0, 1)', expressive: 'cubic-bezier(0.16, 1, 0.3, 1)' }
} as const;
