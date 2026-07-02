export type RewardStatus = 'Funded' | 'Releasable' | 'Released' | 'Refunded';

export interface RewardView {
	id: number;
	maintainer: string;
	repo: string;
	issue_number: number;
	amount: string; // i128 base units as string
	deadline: number; // unix seconds
	timelock_secs: number;
	status: RewardStatus;
	contributor: string | null;
	pr_number: number | null;
	releasable_at: number | null;
}

export type UiStatus =
	| 'active'
	| 'releasing'
	| 'awaiting-trustline'
	| 'settled'
	| 'refunded'
	| 'expired';

/** Canonical lifecycle → visual mapping (UI-SPEC §1). */
export function uiStatus(r: RewardView, now = Math.floor(Date.now() / 1000)): UiStatus {
	switch (r.status) {
		case 'Funded':
			return now > r.deadline ? 'expired' : 'active';
		case 'Releasable':
			return r.releasable_at && now < r.releasable_at ? 'releasing' : 'awaiting-trustline';
		case 'Released':
			return 'settled';
		case 'Refunded':
			return 'refunded';
	}
}
