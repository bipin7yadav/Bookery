import "./index.css";
import { Navbar, Footer } from "./components";
import { Routes } from "./routes/WebsiteRoutes";
import { useAuth } from "contexts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui";

function App() {
	const location = useLocation();
	const { logoutUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error?.response?.status === 401) {
					logoutUser();
					navigate("/login");
				}
				return Promise.reject(error);
			}
		);
	}, [logoutUser, navigate]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className="flex min-h-screen flex-col bg-surface-50">
			<Button
				variant="secondary"
				size="icon"
				className="fixed bottom-6 right-4 z-10 rounded-full shadow-medium hover:bg-surface-200 sm:bottom-6 sm:right-6 min-h-[44px] min-w-[44px]"
				style={{ paddingBottom: "env(safe-area-inset-bottom)", paddingRight: "max(env(safe-area-inset-right), 1rem)" }}
				onClick={() => window.scrollTo(0, 0)}
				aria-label="Scroll to top"
			>
				<i className="fas fa-arrow-up text-surface-600" />
			</Button>
			<Navbar />
			<div className="flex flex-1 flex-col">
				<Routes />
			</div>
			<Footer />
		</div>
	);
}

export default App;
