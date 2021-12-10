import createApiAxios from "./utils/createApiAxios";
import UserManager from "./components/UserManager";
import ModalManager from "./components/ModalManager";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import RestrictedRoute, { PROTECTION } from "./components/RestrictedRoute";
import ConnectPage from "./pages/ConnectPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
	return (
		<Router>
			<UserManager>
				<ModalManager>
					<RestrictedRoute
						protection={PROTECTION.UN_AUTH}
						path="/login"
					>
						<LoginPage />
					</RestrictedRoute>
					<RestrictedRoute
						protection={PROTECTION.AGNOSTIC}
						path="/connect"
					>
						<ConnectPage />
					</RestrictedRoute>
					<RestrictedRoute
						protection={PROTECTION.AUTH}
						path="/dashboard"
					>
						<DashboardPage />
					</RestrictedRoute>
				</ModalManager>
			</UserManager>
		</Router>
	);
}

export const apiAxios = createApiAxios();
export default App;
