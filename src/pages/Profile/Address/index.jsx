import React from "react";
import { useAddress } from "contexts";
import { AddressItem } from "./AddressItem";
import { Button } from "components/ui";

const Address = () => {
	const { addressDispatch, addresses } = useAddress();

	const handleAdd = (e) => {
		e.stopPropagation();
		addressDispatch({ type: "SET_ADDRESS_MODAL_VISIBILITY", payload: { modalVisibility: true, addressToEdit: null } });
	};

	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-lg font-semibold text-surface-900">My Addresses</h2>
				<Button variant="primary" size="md" onClick={handleAdd}>
					Add new address
				</Button>
			</div>
			{addresses?.length ? (
				<ul className="space-y-4">
					{addresses.map((address) => (
						<AddressItem key={address._id} address={address} />
					))}
				</ul>
			) : (
				<p className="text-surface-500">No addresses saved yet.</p>
			)}
		</div>
	);
};

export { Address };
