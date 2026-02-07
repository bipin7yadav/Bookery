import React from "react";
import { useAuth } from "contexts";

const ProfileDetails = () => {
	const { authState: { user } } = useAuth();

	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold text-surface-900">Profile Details</h2>
			<dl className="space-y-3">
				<div>
					<dt className="text-xs font-medium uppercase tracking-wider text-surface-500">Full Name</dt>
					<dd className="mt-1 text-surface-800">{`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}</dd>
				</div>
				<div>
					<dt className="text-xs font-medium uppercase tracking-wider text-surface-500">Email</dt>
					<dd className="mt-1 text-surface-800">{user?.email ?? ""}</dd>
				</div>
			</dl>
		</div>
	);
};

export { ProfileDetails };
