import React from "react";
import { useCart } from "contexts";
import { Button } from "components/ui";

const CouponOptions = () => {
	const { cartDispatch } = useCart();

	const handleOpenModal = (e) => {
		e.stopPropagation();
		cartDispatch({ type: "SET_COUPON_OPTIONS_MODAL_VISIBILITY", payload: { modalVisibility: true } });
	};

	return (
		<div className="mb-4 flex items-center justify-between rounded-xl border border-surface-200 bg-surface-50/50 py-3 px-4">
			<span className="text-sm font-medium text-surface-700">Coupons available</span>
			<Button variant="secondary" size="sm" onClick={handleOpenModal}>
				View Coupons
			</Button>
		</div>
	);
};

export { CouponOptions };
