export function formatAddress(address: string | null): string {
	if (!address) return '';
	if (address.length < 12) return address;
	return `${address.slice(0, 5)}...${address.slice(-4)}`;
}

export function formatUSDC(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);
}
