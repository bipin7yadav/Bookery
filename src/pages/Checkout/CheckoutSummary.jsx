import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useAuth, useCart, useOrders } from "contexts";
import { clearCartItems, postNewOrder } from "services";
import booknookIcon from "assets/images/bookery-icon.png";
import { useToast } from "custom-hooks";
import { Button } from "components/ui";

const RAZORPAY_URL = "https://checkout.razorpay.com/v1/checkout.js";

const loadScript = (src) =>
	new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => resolve(true);
		script.onerror = () => reject(new Error("Failed to load script"));
		document.body.appendChild(script);
	});

const CheckoutSummary = () => {
	const { cartState: { checkoutData, selectedCoupon }, cartDispatch } = useCart();
	const navigate = useNavigate();
	const { authState: { token, user } } = useAuth();
	const { ordersDispatch } = useOrders();
	const { showToast } = useToast();
	const [loading, setLoading] = useState(false);

	const placeOrder = async (order) => {
		let orderId = uuid().split("-").slice(0, 3).join("-");
		setLoading(true);
		try {
			const { data: { orders } } = await postNewOrder(token, { ...order, orderId, selectedCoupon });
			ordersDispatch({ type: "SET_ORDERS", payload: { orders } });
			showToast("Order placed successfully!", "success");
			const { data: { cart } } = await clearCartItems(token);
			cartDispatch({ type: "INIT_CART_ITEMS", payload: { cartItems: cart, loading: false, error: null } });
			navigate(`/order-summary/${orderId}`);
		} catch {
			setLoading(false);
			showToast("Failed to place order. Please try again.", "error");
		}
	};

	const handleRazorpay = async () => {
		try {
			await loadScript(RAZORPAY_URL);
		} catch {
			showToast("Could not load payment. Try again.", "error");
			return;
		}
		const options = {
			key: process.env.REACT_APP_RAZORPAY_KEY,
			amount: (checkoutData?.price ?? 0) * 100,
			currency: "INR",
			name: "Booknook",
			description: "Thank you for shopping!",
			image: booknookIcon,
			handler: (response) => {
				placeOrder({
					razorpayPaymentId: response.razorpay_payment_id,
					...checkoutData,
				});
			},
			prefill: {
				name: checkoutData?.address?.name,
				email: user?.email,
				contact: checkoutData?.address?.phoneNumber,
			},
			theme: { color: "#0f172a" },
		};
		const rzp = new window.Razorpay(options);
		rzp.open();
	};

	return (
		<section className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
			<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-700">
				Order Details
			</h3>
			<div className="mb-6 space-y-2 border-b border-surface-100 pb-4">
				{checkoutData?.items?.map((item) => (
					<div key={item.id} className="flex justify-between text-sm">
						<span className="text-surface-700">{item.title}</span>
						<span className="text-surface-500">Qty: {item.qty}</span>
					</div>
				))}
			</div>
			<div className="mb-6 flex justify-between border-b border-surface-100 pb-4 text-sm">
				<span className="text-surface-600">Total</span>
				<span className="font-semibold">₹ {checkoutData?.price}</span>
			</div>
			<h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-surface-700">
				Delivery
			</h3>
			{checkoutData?.address ? (
				<div className="mb-6 rounded-xl bg-surface-50 p-4 text-sm text-surface-700">
					<p className="font-medium">{checkoutData.address.name}</p>
					<p>{checkoutData.address.addressLine}</p>
					<p>{checkoutData.address.city}, {checkoutData.address.state} - {checkoutData.address.pincode}</p>
					<p>{checkoutData.address.phoneNumber}</p>
				</div>
			) : (
				<p className="mb-6 text-sm text-surface-500">No address selected.</p>
			)}
			<Button
				variant="primary"
				size="lg"
				fullWidth
				disabled={!checkoutData?.address || loading}
				onClick={handleRazorpay}
			>
				Place Order
			</Button>
		</section>
	);
};

export { CheckoutSummary };
