import React from "react";
import { Link } from "react-router-dom";
import { AddressItem } from "pages";
import { getSellingPrice } from "utils";

const OrderItem = ({ order, page }) => {
	const { orderId, price, selectedCoupon, createdAt, items, address } = order || {};

	const formatPrice = (p) =>
		Number(p).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const sellingPrice = (orig, discount) => formatPrice(getSellingPrice(orig, discount));

	if (!order || !Object.keys(order).length) {
		return (
			<div className="rounded-2xl border border-surface-200 bg-white p-8 text-center shadow-card">
				<h4 className="text-surface-700">Order not found</h4>
				<Link
					to="/products"
					className="mt-4 inline-block text-sm font-medium text-surface-800 underline hover:no-underline"
				>
					Shop more
				</Link>
			</div>
		);
	}

	return (
		<section
			className={`rounded-2xl border border-surface-200 bg-white p-6 shadow-card ${
				page === "orders" ? "mb-6" : ""
			}`}
		>
			<div className="space-y-4">
				<div className="flex flex-wrap justify-between gap-2 border-b border-surface-100 pb-4">
					<p className="text-sm font-medium text-surface-700">Order ID: {orderId}</p>
					<p className="text-sm font-semibold text-surface-900">₹ {formatPrice(price)}</p>
				</div>
				{selectedCoupon && (
					<p className="text-2xs text-surface-500">Discount applied: {selectedCoupon.discount}%</p>
				)}
				<p className="text-2xs text-surface-500">
					Order date: {new Date(createdAt).toLocaleString()}
				</p>
				<div>
					<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
						Ship to
					</p>
					<AddressItem address={address} page="orderSummary" />
				</div>
			</div>
			<div className="mt-6 space-y-3">
				{items?.map((item) => (
					<Link
						key={item?.id}
						to={`/products/${item?._id}`}
						className="flex gap-4 rounded-xl border border-surface-200 p-3 transition-colors hover:bg-surface-50"
					>
						<div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-100">
							<img src={item?.coverImg} alt="" className="h-full w-full object-cover" />
						</div>
						<div className="min-w-0 flex-1">
							<p className="font-medium text-surface-900">{item?.title}</p>
							<p className="text-sm text-surface-500">{item?.author}</p>
							<p className="text-2xs text-surface-500">
								Qty: {item?.qty} · ₹ {sellingPrice(item?.originalPrice, item?.discountPercent)}
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export { OrderItem };
