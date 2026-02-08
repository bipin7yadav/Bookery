import React from "react";
import { AddressItem } from "./AddressItem";

const AddressList = ({ addresses, handleEdit, handleDelete, selectedAddressId }) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			{addresses && addresses.length > 0 ? (
				addresses.map((address) => (
					<AddressItem
						key={address._id}
						address={address}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						selected={selectedAddressId === address._id}
					/>
				))
			) : (
				<p className="col-span-full py-8 text-center text-surface-500">
					No addresses found. Please add a new address.
				</p>
			)}
		</div>
	);
};

export { AddressList };