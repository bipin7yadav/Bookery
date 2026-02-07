import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { initiateSignup } from "services";
import { useToast, useDocumentTitle } from "custom-hooks";
import { useAuth } from "contexts/";
import { isSignupDataValid } from "utils";
import { Button, Input } from "components/ui";

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [matchError, setMatchError] = useState(null);

	const navigate = useNavigate();
	const { state } = useLocation();
	const { showToast } = useToast();
	const { setAuthState, authState: { isAuth } } = useAuth();
	const { setDocumentTitle } = useDocumentTitle();

	const initialErrors = {
		firstNameError: null,
		lastNameError: null,
		usernameError: null,
		passwordError: null,
		confirmPasswordError: null,
	};
	const [formErrors, dispatchError] = useReducer(
		(state, { type, payload }) => {
			if (type === "RESET") return initialErrors;
			if (type === "SET") return { ...state, [payload.name]: payload.value };
			if (type === "SET_ERROR") return { ...state, [payload.error]: payload.errorValue };
			return state;
		},
		initialErrors
	);
	const setFormDataError = (action) => dispatchError(action);

	useEffect(() => {
		if (isAuth) navigate(state?.from ?? "/", { replace: true });
		setDocumentTitle("Booknook | Signup");
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "confirmPassword" || name === "password") {
			if (formData.password && formData.confirmPassword) {
				setMatchError(
					name === "password"
						? value !== formData.confirmPassword
							? "Passwords do not match"
							: null
						: value !== formData.password
							? "Passwords do not match"
							: null
				);
			} else setMatchError(null);
		}
		if (formErrors[name + "Error"]) {
			dispatchError({ type: "SET", payload: { name: name + "Error", value: null } });
		}
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { firstName, lastName, password, confirmPassword } = formData;
		if (
			!isSignupDataValid(firstName, lastName, password, confirmPassword, setFormDataError, setMatchError)
		) return;
		if (confirmPassword !== password) return;
		setLoading(true);
		try {
			await initiateSignup(formData);
			showToast("Sign up successful!", "success");
			navigate("/login", { replace: true });
		} catch (err) {
			if (err?.message?.includes("422")) showToast("Email already exists!", "error");
			else showToast("Sign up failed. Try again later.", "error");
			setLoading(false);
		}
	};

	const { firstName, lastName, email, password, confirmPassword } = formData;
	const {
		firstNameError,
		lastNameError,
		passwordError,
		confirmPasswordError,
	} = formErrors;

	return (
		<main className="main-content page-section flex min-h-[80vh] items-center justify-center px-3 py-12">
			<div className="w-full max-w-md min-w-0">
				<div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card sm:p-8">
					<h1 className="text-center text-xl font-semibold uppercase tracking-wider text-surface-900">
						Sign Up
					</h1>
					<form onSubmit={handleSubmit} className="mt-8 space-y-5">
						<Input
							label="First Name"
							name="firstName"
							id="signup-fname"
							placeholder="Jane"
							value={firstName}
							onChange={handleChange}
							error={firstNameError}
							required
						/>
						<Input
							label="Last Name"
							name="lastName"
							id="signup-lname"
							placeholder="Doe"
							value={lastName}
							onChange={handleChange}
							error={lastNameError}
							required
						/>
						<Input
							label="Email"
							type="email"
							name="email"
							id="signup-email"
							placeholder="janedoe@example.com"
							value={email}
							onChange={handleChange}
							required
						/>
						<div className="relative">
							<Input
								label="Password"
								type={showPassword ? "text" : "password"}
								name="password"
								id="signup-password"
								placeholder="********"
								value={password}
								onChange={handleChange}
								error={passwordError}
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
						<div className="relative">
							<Input
								label="Confirm Password"
								type={showConfirmPassword ? "text" : "password"}
								name="confirmPassword"
								id="signup-confirm"
								placeholder="********"
								value={confirmPassword}
								onChange={handleChange}
								error={confirmPasswordError || matchError}
								required
							/>
							<button
								type="button"
								className="absolute right-3 top-9 text-surface-400 hover:text-surface-600"
								onClick={() => setShowConfirmPassword((p) => !p)}
								aria-label={showConfirmPassword ? "Hide password" : "Show password"}
							>
								{showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
							</button>
						</div>
						{matchError && (
							<p className="text-2xs text-error">{matchError}</p>
						)}
						<label className="flex cursor-pointer items-center gap-2 text-sm text-surface-600">
							<input type="checkbox" required className="h-4 w-4 rounded border-surface-300 text-surface-800" />
							I accept the terms and conditions
						</label>
						<Button type="submit" fullWidth size="lg" disabled={loading}>
							Sign Up
						</Button>
						<p className="text-center text-sm text-surface-600">
							<Link to="/login" className="font-medium text-surface-800 hover:underline">
								Already have an account? Log in
							</Link>
						</p>
					</form>
				</div>
			</div>
		</main>
	);
};

export { Signup };
