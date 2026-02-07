import React, { useRef, useState } from "react";
import { useOutsideClick } from "custom-hooks";
import { useCart } from "contexts";
import { getCartItemsData } from "utils";
import { Button } from "components/ui";

const CouponOptionsModal = () => {
	const {
		cartDispatch,
		couponOptions,
		cartState: { cartItems, selectedCoupon: previous },
	} = useCart();
	const [selected, setSelected] = useState(previous?.id ?? "");
	const { cartItemsTotalPrice } = getCartItemsData(cartItems);
	const modalRef = useRef(null);

	useOutsideClick(modalRef, () => {
		cartDispatch({ type: "SET_COUPON_OPTIONS_MODAL_VISIBILITY", payload: { modalVisibility: false } });
	});

	const handleApply = () => {
		cartDispatch({ type: "SET_SELECTED_COUPON", payload: { selectedCoupon: selected } });
		cartDispatch({ type: "SET_COUPON_OPTIONS_MODAL_VISIBILITY", payload: { modalVisibility: false } });
	};

	return (
		<div
			ref={modalRef}
			className="my-auto w-full max-w-md rounded-2xl border border-surface-200 bg-white p-4 shadow-large sm:p-6 mx-3"
		>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-surface-900">Available Coupons</h3>
				<button
					type="button"
					className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 hover:text-surface-700"
					onClick={() => cartDispatch({ type: "SET_COUPON_OPTIONS_MODAL_VISIBILITY", payload: { modalVisibility: false } })}
					aria-label="Close"
				>
					<i className="fa-solid fa-xmark" />
				</button>
			</div>
			<div className="space-y-2 max-h-60 overflow-y-auto">
				{couponOptions?.map((option) =>
					cartItemsTotalPrice > option.minValue ? (
						<label
							key={option.id}
							htmlFor={`coupon-${option.id}`}
							className="flex cursor-pointer items-center gap-3 rounded-xl border border-surface-200 p-3 hover:bg-surface-50"
						>
							<input
								type="radio"
								name="coupon"
								id={`coupon-${option.id}`}
								value={option.id}
								checked={selected === option.id}
								onChange={(e) => setSelected(Number(e.target.value))}
								className="h-4 w-4 text-surface-800"
							/>
							<span className="text-sm text-surface-700">{option.coupon}</span>
						</label>
					) : null
				)}
			</div>
			<Button variant="primary" size="md" className="mt-6 w-full" onClick={handleApply}>
				Apply
			</Button>
		</div>
	);
};

export { CouponOptionsModal };
