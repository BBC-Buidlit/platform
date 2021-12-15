import { memo } from "react";
import { useMoralis } from "react-moralis";
// import { useMetamask } from "use-metamask";
import { Button, Card, CardHeading, Page } from "../../components/CoreUI";
import "./onboarding-page.css";

const OnboardingPage = memo(() => {
	const { authenticate } = useMoralis();

	return (
		<Page className="onboarding-page">
			<Card className="onboarding-card">
				<CardHeading>Almost done!</CardHeading>
				<p className="onboarding-desc">
					Please connect your Crypto wallet to complete your setup. We
					will use your wallet to facilitate your holdings.
				</p>
				<Button theme onClick={() => authenticate}>
					Connect Wallet
				</Button>
			</Card>
		</Page>
	);
});

export default OnboardingPage;
