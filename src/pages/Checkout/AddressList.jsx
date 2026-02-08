import React, { useEffect, useState } from "react";
import { useAddress, useCart } from "contexts";
import { AddressItem } from "pages";
import { Button } from "components/ui";

const AddressList = () => {
	const { addresses, addressDispatch } = useAddress();
	const { cartDispatch, cartState: { checkoutData } } = useCart();
	const [selected, setSelected] = useState(checkoutData?.address ? { ...checkoutData.address } : null);

	useEffect(() => {
		if (!checkoutData?.address && addresses?.length) {
			const first = { ...addresses[0] };
			cartDispatch({ type: "SET_CHECKOUT_ADDRESS", payload: { address: first } });
			setSelected(first);
		}
	}, [addresses?.length]);

	const handleSelect = (address) => {
		setSelected({ ...address });
		cartDispatch({ type: "SET_CHECKOUT_ADDRESS", payload: { address } });
	};

	const handleAddNew = (e) => {
		e.stopPropagation();
		addressDispatch({ type: "SET_ADDRESS_MODAL_VISIBILITY", payload: { modalVisibility: true, addressToEdit: null } });
	};

	return (
		<div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
			<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-700">
				Select shipping address
			</h3>
			{addresses?.length ? (
				<ul className="space-y-3">
					{addresses.map((address) => (
						<label
							key={address._id}
							className={`flex cursor-pointer gap-3 rounded-xl border-2 p-4 transition-colors ${
								selected?._id === address._id
									? "border-surface-800 bg-surface-50"
									: "border-surface-200 hover:border-surface-300"
							}`}
						>
							<input
								type="radio"
								name="address"
								checked={selected?._id === address._id}
								onChange={() => handleSelect(address)}
								className="mt-1 h-4 w-4 text-surface-800"
							/>
							<AddressItem address={address} page="checkout" />
						</label>
					))}
				</ul>
			) : (
				<p className="text-sm text-surface-500">No addresses saved.</p>
			)}
			<Button variant="secondary" size="md" className="mt-6" onClick={handleAddNew}>
				Add new address
			</Button>
		</div>
	);
};

export { AddressList };
