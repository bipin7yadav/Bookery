import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { initiateLogin } from "services";
import { useAuth, useCart, useOrders, useWishList } from "contexts/";
import { useDocumentTitle, useToast } from "custom-hooks";
import { Button, Input } from "components/ui";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const { setAuthState, authState: { isAuth } } = useAuth();
	const { cartDispatch } = useCart();
	const { wishListDispatch } = useWishList();
	const { ordersDispatch } = useOrders();
	const { showToast } = useToast();
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		if (isAuth) navigate(location?.state?.from ?? -1, { replace: true });
		setDocumentTitle("Booknook | Login");
	}, []);

	const handleChange = (e) => {
		const { name, value, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "rememberMe" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data } = await initiateLogin(formData);
			showToast("Login successful!", "success");
			const { user: { token, cart: cartItems, wishlist, orders, address, ...userDetails } } = data;
			setAuthState({ isAuth: true, token, user: userDetails });
			cartDispatch({ type: "INIT_CART_ITEMS", payload: { cartItems } });
			wishListDispatch({ type: "INIT_WISHLIST_ITEMS", payload: { wishListItems: wishlist, error: null, loading: false } });
			ordersDispatch({ type: "SET_ORDERS", payload: { orders } });
			if (formData.rememberMe) {
				localStorage.setItem("booknook-token", token);
				localStorage.setItem("booknook-user", JSON.stringify(userDetails));
			}
			navigate(location?.state?.from ?? -1, { replace: true });
		} catch {
			showToast("Login failed. Please try again.", "error");
		}
		setLoading(false);
	};

	const handleTestCredentials = (e) => {
		e.preventDefault();
		setFormData({
			email: process.env.REACT_APP_GUEST_USER_EMAIL ?? "test@example.com",
			password: process.env.REACT_APP_GUEST_USER_PASSWORD ?? "password123",
			rememberMe: true,
		});
	};

	const { email, password, rememberMe } = formData;

	return (
		<main className="main-content page-section flex min-h-[80vh] items-center justify-center px-3">
			<div className="w-full max-w-md min-w-0">
				<div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card sm:p-8">
					<h1 className="text-center text-xl font-semibold uppercase tracking-wider text-surface-900">
						Login
					</h1>
					<form onSubmit={handleSubmit} className="mt-8 space-y-5">
						<Input
							label="Email"
							type="email"
							name="email"
							id="login-email"
							placeholder="janedoe@gmail.com"
							value={email}
							onChange={handleChange}
							required
						/>
						<div className="relative">
							<Input
								label="Password"
								type={showPassword ? "text" : "password"}
								name="password"
								id="login-password"
								placeholder="********"
								value={password}
								onChange={handleChange}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-9 text-surface-400 hover:text-surface-600"
								onClick={() => setShowPassword((p) => !p)}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
							</button>
						</div>
						<label className="flex cursor-pointer items-center gap-2 text-sm text-surface-600">
							<input
								type="checkbox"
								name="rememberMe"
								checked={rememberMe}
								onChange={handleChange}
								className="h-4 w-4 rounded border-surface-300 text-surface-800"
							/>
							Remember me
						</label>
						<div className="space-y-3">
							<Button type="submit" fullWidth size="lg" disabled={loading}>
								Login
							</Button>
							<Button
								type="button"
								variant="outline"
								fullWidth
								size="lg"
								disabled={loading}
								onClick={handleTestCredentials}
							>
								Use test credentials
							</Button>
						</div>
						<p className="text-center text-sm text-surface-600">
							<Link to="/signup" className="font-medium text-surface-800 hover:underline">
								Create a new account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</main>
	);
};

export { Login };
