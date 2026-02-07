import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	useAddress,
	useAuth,
	useCart,
	useFilter,
	useOrders,
	useWishList,
} from "contexts";
import { useOutsideClick, useToast } from "custom-hooks";

const AccountOptions = () => {
	const { authState, setAuthState, logoutUser } = useAuth();
	const isAuth = authState?.isAuth;
	const showToast = useToast().showToast;
	const location = useLocation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		if (open) setOpen(false);
	}, [location?.pathname]);

	useOutsideClick(ref, () => setOpen(false));

	const handleAuth = () => {
		if (isAuth) {
			logoutUser();
			showToast("Logged out successfully.", "success");
		}
		navigate("/login");
	};

	return (
		<li className="relative flex items-center" ref={ref}>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setOpen((o) => !o);
				}}
				className="flex h-10 w-10 items-center justify-center rounded-xl text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-800"
				aria-label="Account menu"
				aria-expanded={open}
			>
				<i className="fa-solid fa-user text-lg" />
			</button>
			{open && (
				<ul className="absolute right-0 top-full z-50 mt-1 w-48 min-w-[140px] max-w-[calc(100vw-2rem)] rounded-xl border border-surface-200 bg-white py-1 shadow-large animate-fade-in">
					<li className="border-b border-surface-100">
						<Link
							to="/profile"
							className="block px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50"
							onClick={() => setOpen(false)}
						>
							Profile
						</Link>
					</li>
					<li>
						<button
							type="button"
							className="block w-full px-4 py-3 text-left text-sm font-medium text-surface-700 hover:bg-surface-50"
							onClick={handleAuth}
						>
							{isAuth ? "Logout" : "Login"}
						</button>
					</li>
				</ul>
			)}
		</li>
	);
};

export { AccountOptions };
