import { AddressForm, CouponOptionsModal } from "components";
import { useAddress, useCart } from "contexts";
import ReactDOM from "react-dom";

const ModalPortal = () => {
	const { addressFormModalVisibility } = useAddress();
	const { cartState: { couponOptionsModalVisibility } } = useCart();

	if (!addressFormModalVisibility && !couponOptionsModalVisibility) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-900/50 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
			{couponOptionsModalVisibility ? (
				<CouponOptionsModal />
			) : (
				<AddressForm />
			)}
		</div>,
		document.getElementById("modal-container")
	);
};

export default ModalPortal;
