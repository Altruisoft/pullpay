export type LinkItem = {
	label: string;
	href: string;
};

export type InfoCard = {
	title: string;
	description: string;
};

export type MetricItem = {
	label: string;
	value: string;
	hint?: string;
};

export type StepItem = {
	eyebrow: string;
	title: string;
	description: string;
	microcopy: string;
	role: string;
};

export type RailComparison = {
	name: string;
	limitation: string;
};

export type StellarFeature = {
	feature: string;
	enables: string;
};

export type UseCase = {
	title: string;
	example: string;
};

export type FaqItem = {
	question: string;
	answer?: string;
};

export type FooterLink = {
	label: string;
	href: string;
};
