import { memo } from "react";
import { CardHeading, Page } from "../../components/CoreUI";
import "./login-page.css";

const LoginPage = memo(() => {
	return (
		<Page>
			<CardHeading>Welcome!!</CardHeading>
		</Page>
	);
});

export default LoginPage;
