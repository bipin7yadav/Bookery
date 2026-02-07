import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDocumentTitle } from "custom-hooks";

const tabs = [
	{ _id: uuid(), label: "Profile", to: "/profile" },
	{ _id: uuid(), label: "Address", to: "/profile/address" },
	{ _id: uuid(), label: "Orders", to: "/profile/orders" },
];

const Profile = () => {
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Profile");
	}, [setDocumentTitle]);

	return (
		<main className="main-content page-section">
			<div className="page-container max-w-4xl min-w-0">
				<nav className="mb-6 border-b border-surface-200 sm:mb-8 overflow-x-auto">
					<ul className="flex flex-wrap gap-1 min-w-0">
						{tabs.map((tab) => (
							<li key={tab._id}>
								<NavLink
									end={tab.to === "/profile"}
									to={tab.to}
									className={({ isActive }) =>
										`block border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
											isActive
												? "border-surface-800 text-surface-900"
												: "border-transparent text-surface-600 hover:text-surface-800"
										}`
									}
								>
									{tab.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
				<div className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card sm:p-6 lg:p-8 min-w-0">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export { Profile };
