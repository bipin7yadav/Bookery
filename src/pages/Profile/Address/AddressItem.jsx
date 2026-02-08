import React, { useState } from "react";
import { useAddress, useAuth } from "contexts";
import { deleteAddress } from "services";
import { useToast } from "custom-hooks";
import { Button } from "components/ui";

const AddressItem = ({ address, page }) => {
	const { addressDispatch } = useAddress();
	const { showToast } = useToast();
	const { authState: { token } } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleEdit = (e) => {
		e.stopPropagation();
		addressDispatch({
			type: "SET_ADDRESS_MODAL_VISIBILITY",
			payload: { modalVisibility: true, addressToEdit: address._id },
		});
	};

	const handleDelete = async (e) => {
		e.stopPropagation();
		setLoading(true);
		try {
			const { data: { address: list } } = await deleteAddress(token, address._id);
			addressDispatch({ type: "SET_ADDRESSES", payload: { addresses: list } });
			showToast("Address deleted.", "success");
		} catch {
			showToast("Failed to delete address.", "error");
			setLoading(false);
		}
	};

	const isCheckoutOrOrder = page === "checkout" || page === "orderSummary";

	return (
		<div className="rounded-xl border border-surface-200 p-4">
			<p className="font-medium text-surface-900">{address.name}</p>
			<p className="text-sm text-surface-600">{address.addressLine}</p>
			<p className="text-sm text-surface-600">
				{address.city}, {address.state} — {address.pincode}
			</p>
			<p className="text-sm text-surface-600">{address.phoneNumber}</p>
			{!isCheckoutOrOrder && (
				<div className="mt-4 flex gap-2">
					<Button variant="secondary" size="sm" onClick={handleEdit}>
						Edit
					</Button>
					<Button variant="ghost" size="sm" disabled={loading} onClick={handleDelete}>
						Delete
					</Button>
				</div>
			)}
		</div>
	);
};

export { AddressItem };
