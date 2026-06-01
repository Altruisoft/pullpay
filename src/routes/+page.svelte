<script lang="ts">
	import CtaSection from '$lib/components/landing/CtaSection.svelte';
	import FaqSection from '$lib/components/landing/FaqSection.svelte';
	import FooterSection from '$lib/components/landing/FooterSection.svelte';
	import Header from '$lib/components/landing/Header.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import HowItWorksSection from '$lib/components/landing/HowItWorksSection.svelte';
	import ProblemSection from '$lib/components/landing/ProblemSection.svelte';
	import SolutionSection from '$lib/components/landing/SolutionSection.svelte';
	import StellarSorobanSection from '$lib/components/landing/StellarSorobanSection.svelte';
	import UseCasesSection from '$lib/components/landing/UseCasesSection.svelte';
	import WhyStellarSection from '$lib/components/landing/WhyStellarSection.svelte';
	import ImpactSection from '$lib/components/landing/ImpactSection.svelte';
	import {
		assets,
		faqItems,
		footerLinks,
		howItWorksSteps,
		navLinks,
		problemData,
		traditionalRails,
		architectureCards,
		useCases,
		stellarFeatures,
		impactMetrics
	} from '$lib/components/landing/data';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>PullPay - Automated Contributor Rewards on Stellar</title>
	<meta
		name="description"
		content="Automate USDC payouts to open-source contributors using GitHub Actions and Soroban smart contracts."
	/>

	<!-- Open Graph / Facebook / WhatsApp / Telegram -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="PullPay" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="PullPay - Automated Contributor Rewards on Stellar" />
	<meta
		property="og:description"
		content="Automate USDC payouts to open-source contributors using GitHub Actions and Soroban smart contracts."
	/>

	<!-- Twitter / Threads / Instagram -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="PullPay - Automated Contributor Rewards on Stellar" />
	<meta
		name="twitter:description"
		content="Automate USDC payouts to open-source contributors using GitHub Actions and Soroban smart contracts."
	/>

	<!-- SEO Best Practices -->
	<link rel="canonical" href={$page.url.href} />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#f7f6f3" />
	<meta property="og:locale" content="en_US" />
	<link rel="apple-touch-icon" href={`${$page.url.origin}/images/pullpay-logo-only.png`} />
</svelte:head>

<main class="bg-crx-page text-crx-black min-h-screen">
	<Header logo={assets.logo} logoMark={assets.logoMark} links={navLinks} />
	<HeroSection logoMark={assets.logoMark} />
	<ProblemSection
		title={problemData.title}
		description={problemData.description}
		paragraphs={problemData.paragraphs}
		rails={traditionalRails}
	/>
	<HowItWorksSection steps={howItWorksSteps} />
	<WhyStellarSection features={stellarFeatures} />
	<StellarSorobanSection detailImage={assets.stellarSoroban} />
	<SolutionSection cards={architectureCards} />
	<ImpactSection metrics={impactMetrics} />
	<UseCasesSection cases={useCases} />
	<FaqSection items={faqItems} />
	<CtaSection portraitImage={assets.automatePayout} />
	<FooterSection logo={assets.logo} links={footerLinks} />
</main>
