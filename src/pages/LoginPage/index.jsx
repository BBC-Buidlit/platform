import { memo } from "react";
import { Button, Card, CardHeading, Page } from "../../components/CoreUI";
import "./login-page.css";
import LOGIN_BG from "../../img/login-bg.svg";
import { DISCORD_REDIRECT_URL } from "../../conf";

const LoginPage = memo(() => {
	const handleRedirect = () => (window.location.href = DISCORD_REDIRECT_URL);

	return (
		<Page className="login-page">
			<section className="login-half">
				<img src={LOGIN_BG} alt="" />
			</section>
			<section className="login-half">
				<Card className="login-page-hero">
					<CardHeading>Welcome to product</CardHeading>
					<p>
						To proceed to your dashboard, login with your Discord
						account
					</p>
					<Button onClick={handleRedirect} theme>
						Login with Discord
					</Button>
				</Card>
			</section>
		</Page>
	);
});

export default LoginPage;
