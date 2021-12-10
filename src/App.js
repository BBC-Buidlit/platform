import createApiAxios from "./utils/createApiAxios";
import UserManager from "./components/UserManager";
import ModalManager from "./components/ModalManager";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import RestrictedRoute, { PROTECTION } from "./components/RestrictedRoute";

function App() {
	return (
		<Router>
			<UserManager>
				<ModalManager>
					<RestrictedRoute
						protection={PROTECTION.AGNOSTIC}
						path="/login"
					>
						<LoginPage />
					</RestrictedRoute>
				</ModalManager>
			</UserManager>
		</Router>
	);
}

export const apiAxios = createApiAxios();
export default App;
