import { memo } from "react";
import AddedServers from "../../components/AddedServers";
import { AuthPage, GradientText } from "../../components/CoreUI";

import useIdentity from "../../hooks/useIdentity";
import "./dashboard-page.css";

const DashboardPage = memo(() => {
	const { user } = useIdentity();

	return (
		<AuthPage className="dashboard-page">
			<h3 className="dashboard-sub">Welcome</h3>
			<GradientText className="dashboard-heading">
				{user.username}
			</GradientText>
			<AddedServers />
		</AuthPage>
	);
});

export default DashboardPage;
