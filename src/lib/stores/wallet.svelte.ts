import pkg from '@stellar/freighter-api';
const { isAllowed, setAllowed, requestAccess, getAddress } = pkg;
import { browser } from '$app/environment';

class WalletState {
	isConnected = $state(false);
	address = $state<string | null>(null);
	isConnecting = $state(false);

	async checkConnection() {
		if (!browser) return;
		
		try {
			const allowed = await isAllowed();
			if (allowed) {
				const res = await getAddress();
				if (res.address && !res.error) {
					this.isConnected = true;
					this.address = res.address;
				}
			}
		} catch (error) {
			console.error('Failed to check Freighter connection:', error);
		}
	}

	async connect() {
		if (!browser) return;
		
		this.isConnecting = true;
		try {
			await setAllowed();
			const access = await requestAccess();
			if (access) {
				const res = await getAddress();
				if (res.address && !res.error) {
					this.isConnected = true;
					this.address = res.address;
				}
			}
		} catch (error) {
			console.error('Failed to connect Freighter:', error);
		} finally {
			this.isConnecting = false;
		}
	}

	disconnect() {
		// Freighter doesn't have a strict disconnect API from the dApp side
		// But we can clear our local state
		this.isConnected = false;
		this.address = null;
	}
}

export const walletStore = new WalletState();
