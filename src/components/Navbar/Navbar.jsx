import React, { useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Close, Search } from "@mui/icons-material";
import { useAuth, useCart, useFilter, useWishList } from "contexts";
import { getCartItemsTotal } from "utils";
import { useOutsideClick, useToast } from "custom-hooks";
import { AccountOptions } from "components";
import { Button } from "components/ui";

const Navbar = () => {
	const { authState } = useAuth();
	const isAuth = authState?.isAuth;
	const navigate = useNavigate();
	const location = useLocation();
	const { wishListState: { wishListItems } = {} } = useWishList();
	const { cartState: { cartItems } = {} } = useCart();
	const { filterState: { searchText } = {}, filterDispatch } = useFilter();
	const drawerRef = useRef(null);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	useOutsideClick(drawerRef, () => setMobileNavOpen(false));

	const totalCartItems = isAuth && cartItems?.length ? getCartItemsTotal(cartItems, "TOTAL_ITEMS") : 0;
	const totalWishListItems = isAuth && wishListItems?.length ? wishListItems.length : 0;

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchText?.trim() && location.pathname !== "/products") navigate("/products");
		setSearchOpen(false);
	};

	const handleSearchChange = (e) => {
		filterDispatch({ filterType: "SET_SEARCH_TEXT", filterPayload: e.target.value });
		if (searchText?.trim() && location.pathname !== "/products") navigate("/products");
	};

	return (
		<nav className="relative sticky top-0 z-50 border-b border-surface-200 bg-white/95 shadow-soft backdrop-blur-sm">
			<div className="page-container flex h-14 min-h-[44px] items-center justify-between gap-2 sm:h-16 sm:gap-4">
				<Button
					variant="ghost"
					size="icon-sm"
					className="md:hidden"
					onClick={() => setMobileNavOpen((o) => !o)}
					aria-label="Menu"
				>
					<i className="fa-solid fa-bars text-lg text-surface-600" />
				</Button>

				<NavLink
					to="/"
					className="hidden text-xl font-semibold tracking-tight text-surface-900 transition-opacity hover:opacity-80 md:block"
				>
					Booknook
				</NavLink>

				<ul className="hidden items-center gap-1 md:flex">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
									isActive ? "text-surface-900 bg-surface-100" : "text-surface-600 hover:bg-surface-50 hover:text-surface-800"
								}`
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/products"
							className={({ isActive }) =>
								`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
									isActive ? "text-surface-900 bg-surface-100" : "text-surface-600 hover:bg-surface-50 hover:text-surface-800"
								}`
							}
						>
							Shop
						</NavLink>
					</li>
				</ul>

				{/* Mobile drawer */}
				<div
					className={`fixed inset-0 z-40 bg-surface-900/50 transition-opacity md:hidden ${mobileNavOpen ? "visible opacity-100" : "invisible opacity-0"}`}
					aria-hidden={!mobileNavOpen}
				/>
				<div
					ref={drawerRef}
					className={`fixed left-0 top-0 z-50 flex h-full w-full max-w-[280px] flex-col border-r border-surface-200 bg-white shadow-large transition-transform duration-300 ease-smooth md:hidden ${
						mobileNavOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex items-center justify-between border-b border-surface-100 p-4">
						<NavLink to="/" className="text-lg font-semibold text-surface-900" onClick={() => setMobileNavOpen(false)}>
							Booknook
						</NavLink>
						<Button variant="ghost" size="icon-sm" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
							<i className="fa-solid fa-times" />
						</Button>
					</div>
					<ul className="flex flex-col gap-1 p-4">
						<li>
							<NavLink
								to="/"
								onClick={() => setMobileNavOpen(false)}
								className={({ isActive }) =>
									`block rounded-xl px-4 py-3 text-sm font-medium ${
										isActive ? "bg-surface-100 text-surface-900" : "text-surface-600"
									}`
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/products"
								onClick={() => setMobileNavOpen(false)}
								className={({ isActive }) =>
									`block rounded-xl px-4 py-3 text-sm font-medium ${
										isActive ? "bg-surface-100 text-surface-900" : "text-surface-600"
									}`
								}
							>
								Shop
							</NavLink>
						</li>
					</ul>
				</div>

				{/* Search overlay - full width within nav */}
				<div
					className={`absolute left-0 right-0 top-0 z-30 flex min-h-[180px] flex-col items-center justify-center gap-3 border-b border-surface-200 bg-surface-900 px-3 py-4 sm:gap-4 sm:px-4 sm:py-6 transition-all duration-300 ${
						searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
					}`}
				>
					<button
						type="button"
						className="absolute right-4 top-4 rounded-lg p-2 text-surface-300 hover:bg-white/10 hover:text-white"
						onClick={() => setSearchOpen(false)}
						aria-label="Close search"
					>
						<Close />
					</button>
					<p className="text-sm text-surface-300">What book are you in the mood for today?</p>
					<form onSubmit={handleSearchSubmit} className="w-full max-w-xl px-1">
						<div className="flex rounded-xl border border-surface-600 bg-surface-800 focus-within:ring-2 focus-within:ring-accent-500">
							<input
								type="search"
								placeholder="Search books by name or author..."
								value={searchText ?? ""}
								onChange={handleSearchChange}
								className="flex-1 rounded-l-xl border-0 bg-transparent px-4 py-3 text-white placeholder-surface-400 focus:outline-none focus:ring-0"
							/>
							<button
								type="submit"
								className="rounded-r-xl px-4 py-3 text-surface-300 hover:bg-surface-700 hover:text-white"
							>
								<Search />
							</button>
						</div>
					</form>
				</div>

				<ul className="flex items-center gap-1">
					<li>
						<Button
							variant="ghost"
							size="icon-sm"
							onClick={() => setSearchOpen(true)}
							aria-label="Search"
						>
							<i className="fa-solid fa-magnifying-glass text-surface-600" />
						</Button>
					</li>
					<li className="relative">
						<Link
							to="/cart"
							className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-800 active:bg-surface-100"
							aria-label="Cart"
						>
							<i className="fa-solid fa-cart-shopping text-lg" />
						</Link>
						{totalCartItems > 0 && (
							<span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-surface-800 px-1.5 text-2xs font-semibold text-white">
								{totalCartItems > 9 ? "9+" : totalCartItems}
							</span>
						)}
					</li>
					<li className="relative">
						<Link
							to="/wishlist"
							className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-800 active:bg-surface-100"
							aria-label="Wishlist"
						>
							<i className="fa-solid fa-heart text-lg" />
						</Link>
						{totalWishListItems > 0 && (
							<span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-surface-800 px-1.5 text-2xs font-semibold text-white">
								{totalWishListItems > 9 ? "9+" : totalWishListItems}
							</span>
						)}
					</li>
					<AccountOptions />
				</ul>
			</div>
		</nav>
	);
};

export { Navbar };
