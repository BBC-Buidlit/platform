import Web3 from "web3";

import { useMetamask } from "use-metamask";

const useWeb3Provider = () => {
	const { connect, getAccounts, getChain, metaState } = useMetamask();

	const connectToMetamask = () => {
		connect(Web3);
	};

	const makeTransaction = (callback, userWalletId) => {
		if (metaState.isConnected) {
			if (
				metaState.account &&
				metaState.account.length &&
				metaState.account[0] === userWalletId
			) {
				callback();
				return;
			}
		}
		throw new Error("Different Wallet is being used, change your wallet");
	};
	const isMainnet = async () => {
		const currentChain = await getChain();
		return currentChain.id === "1";
	};

	return {
		connectToMetamask,
		getAccounts,
		isMainnet,
		getChain,
		metaState,
		makeTransaction,
	};
};

export default useWeb3Provider;
