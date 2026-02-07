import React, { useReducer, useRef, useState } from "react";
import { useAddress, useAuth } from "contexts";
import { useOutsideClick, useToast } from "custom-hooks";
import { validateAddressData } from "utils";
import { editAddress, postNewAddress } from "services";
import { formDataReducerFunction, formDataErrorReducerFunction } from "reducers";
import { Button, Input } from "components/ui";

const AddressForm = () => {
	const formRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const { addressDispatch, addressToEdit, addresses } = useAddress();
	const { showToast } = useToast();
	const { authState: { token } } = useAuth();

	const addressToEditData = addressToEdit && addresses?.find((a) => a._id === addressToEdit);
	const initialForm = addressToEditData ?? {
		name: "",
		addressLine: "",
		city: "",
		state: "",
		pincode: "",
		phoneNumber: "",
	};

	const [formData, formDataDispatch] = useReducer(formDataReducerFunction, initialForm);
	const [formErrors, formErrorDispatch] = useReducer(formDataErrorReducerFunction, {
		nameError: null,
		addressLineError: null,
		cityError: null,
		stateError: null,
		pincodeError: null,
		phoneNumberError: null,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateAddressData(formData, formErrorDispatch)) return;
		setLoading(true);
		try {
			const { data: { address } } = addressToEdit
				? await editAddress(token, formData)
				: await postNewAddress(token, formData);
			addressDispatch({ type: "SET_ADDRESSES", payload: { addresses: address } });
			showToast(`Address ${addressToEdit ? "updated" : "saved"} successfully.`, "success");
			addressDispatch({ type: "SET_ADDRESS_MODAL_VISIBILITY", payload: { modalVisibility: false, addressToEdit: null } });
		} catch {
			showToast("Failed to save address. Please try again.", "error");
		}
		setLoading(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		formErrorDispatch({ type: "CLEAR_ERROR", payload: { name: name + "Error" } });
		formDataDispatch({ type: "SET_FORM_DATA", payload: { name, value } });
	};

	const handleClose = (e) => {
		e?.stopPropagation();
		addressDispatch({ type: "SET_ADDRESS_MODAL_VISIBILITY", payload: { modalVisibility: false, addressToEdit: null } });
	};

	useOutsideClick(formRef, handleClose);

	const { name, addressLine, city, state, pincode, phoneNumber } = formData;
	const disabled =
		loading ||
		(addressToEditData &&
			addressToEditData.name === name &&
			addressToEditData.addressLine === addressLine &&
			addressToEditData.city === city &&
			addressToEditData.state === state &&
			addressToEditData.pincode === pincode &&
			addressToEditData.phoneNumber === phoneNumber) ||
		!name ||
		!addressLine ||
		!city ||
		!state ||
		!pincode ||
		!phoneNumber;

	return (
		<div
			ref={formRef}
			className="my-auto max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-surface-200 bg-white p-4 shadow-large sm:p-6"
		>
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-surface-900">Address</h3>
				<button
					type="button"
					className="rounded-lg p-2 text-surface-500 hover:bg-surface-100"
					onClick={handleClose}
					aria-label="Close"
				>
					<i className="fa-solid fa-times" />
				</button>
			</div>
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input label="Name" name="name" placeholder="Jane Doe" value={name} onChange={handleChange} error={formErrors.nameError} required />
				<Input label="House No., Colony, Area" name="addressLine" placeholder="Opp. Avenue hotel, Kandivali East" value={addressLine} onChange={handleChange} error={formErrors.addressLineError} required />
				<Input label="City" name="city" placeholder="Mumbai" value={city} onChange={handleChange} error={formErrors.cityError} required />
				<Input label="State" name="state" placeholder="Maharashtra" value={state} onChange={handleChange} error={formErrors.stateError} required />
				<Input label="Pincode" name="pincode" placeholder="400101" value={pincode} onChange={handleChange} error={formErrors.pincodeError} required />
				<Input label="Phone" name="phoneNumber" placeholder="9876543210" value={phoneNumber} onChange={handleChange} error={formErrors.phoneNumberError} required />
				<div className="flex flex-wrap gap-3 pt-4">
					<Button
						type="button"
						variant="outline"
						size="md"
						onClick={() => formDataDispatch({ type: "SET_DUMMY_ADDRESS" })}
					>
						Fill dummy address
					</Button>
					<Button type="submit" variant="primary" size="md" disabled={disabled}>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export { AddressForm };
