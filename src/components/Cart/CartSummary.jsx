import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart, useAddress } from "contexts/";
import { CouponOptions } from "pages";
import { getCartItemsData } from "utils/";
import { Button } from "components/ui";

const CartSummary = () => {
	const {
		cartState: { cartItems, selectedCoupon },
		cartDispatch,
		couponOptions,
	} = useCart();
	const { addresses } = useAddress();

	const leastCouponValue = couponOptions?.reduce(
		(acc, opt) => (opt.minValue < acc ? opt.minValue : acc),
		Number.MAX_VALUE
	) ?? 0;

	const {
		cartItemsTotalPrice,
		cartItemsTotalSavingPrice,
		cartItemsTotalOriginalPrice,
		deliveryChargesApplicable,
		numCartItemsTotal,
	} = getCartItemsData(cartItems);

	const deliveryCharges = deliveryChargesApplicable ? "₹ 49" : "FREE";
	const isAnyCouponSelected = selectedCoupon != null;
	const couponDiscountPrice = Math.round(
		(selectedCoupon?.discount ?? 0) / 100 * cartItemsTotalPrice
	);
	const priceAfterCoupon = Math.round(
		cartItemsTotalPrice - (selectedCoupon ? couponDiscountPrice : 0)
	);

	const handleRemoveCoupon = () => {
		cartDispatch({ type: "SET_SELECTED_COUPON", payload: { selectedCoupon: null } });
	};

	useEffect(() => {
		if (selectedCoupon && cartItemsTotalPrice <= (selectedCoupon?.minValue ?? 0)) {
			handleRemoveCoupon();
		}
	}, [cartItemsTotalPrice]);

	const handleCheckout = () => {
		cartDispatch({
			type: "SET_CHECKOUT_DATA",
			payload: {
				checkoutData: {
					items: [...(cartItems ?? [])],
					price: isAnyCouponSelected ? priceAfterCoupon : cartItemsTotalPrice,
					address: addresses?.length ? { ...addresses[0] } : null,
				},
			},
		});
	};

	return (
		<section className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
			<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-700">
				Price Details
			</h3>
			<p className="mb-4 text-2xs text-surface-500">
				{numCartItemsTotal} item{numCartItemsTotal !== 1 ? "s" : ""}
			</p>
			{cartItemsTotalPrice > leastCouponValue && <CouponOptions />}
			<div className="space-y-3 border-t border-surface-100 pt-4">
				<div className="flex justify-between text-sm">
					<span className="text-surface-600">Total price</span>
					<span>₹ {cartItemsTotalOriginalPrice}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-surface-600">Discount</span>
					<span className="text-success">- ₹ {cartItemsTotalSavingPrice}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-surface-600">Delivery</span>
					<span>{deliveryCharges}</span>
				</div>
				{isAnyCouponSelected && (
					<div className="flex justify-between text-sm">
						<span className="text-surface-600">
							Coupon {selectedCoupon.discount}% off
							<button
								type="button"
								className="ml-2 text-accent-600 hover:underline"
								onClick={handleRemoveCoupon}
							>
								Remove
							</button>
						</span>
						<span className="text-success">- ₹ {couponDiscountPrice}</span>
					</div>
				)}
			</div>
			<div className="mt-4 flex justify-between border-t border-surface-100 pt-4 text-base font-semibold">
				<span>Subtotal</span>
				<span>₹ {priceAfterCoupon}</span>
			</div>
			<Button
				as={Link}
				to="/checkout"
				variant="primary"
				fullWidth
				size="lg"
				className="mt-6"
				onClick={handleCheckout}
			>
				Checkout
			</Button>
		</section>
	);
};

export { CartSummary };
