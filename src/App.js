import createApiAxios from "./utils/createApiAxios";
import UserManager from "./components/UserManager";
import ModalManager from "./components/ModalManager";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import RestrictedRoute, { PROTECTION } from "./components/RestrictedRoute";
import ConnectPage from "./pages/ConnectPage";
import DashboardPage from "./pages/DashboardPage";
import RootPage from "./pages/RootPage";
import NavManager from "./components/NavManager";
import { MetamaskStateProvider } from "use-metamask";
import { MoralisProvider } from "react-moralis";
import OnboardingPage from "./pages/OnboardingPage";
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "./conf";

function App() {
	return (
		<MetamaskStateProvider>
			<Router>
				<MoralisProvider
					appId={MORALIS_APP_ID}
					serverUrl={MORALIS_SERVER_URL}
				>
					<UserManager>
						<ModalManager>
							<NavManager>
								<RestrictedRoute
									protection={PROTECTION.AGNOSTIC}
									path="/"
								>
									<RootPage />
								</RestrictedRoute>
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
								<RestrictedRoute
									protection={PROTECTION.AUTH}
									path="/onboarding"
									setup
								>
									<OnboardingPage />
								</RestrictedRoute>
							</NavManager>
						</ModalManager>
					</UserManager>
				</MoralisProvider>
			</Router>
		</MetamaskStateProvider>
	);
}

export const apiAxios = createApiAxios();
export default App;
