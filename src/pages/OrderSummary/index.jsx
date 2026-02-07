import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOrders } from "contexts";
import { OrderItem } from "components/";
import { LoadingSpinner, Button } from "components/ui";

const OrderSummary = () => {
	const { orders, ordersLoading, ordersError } = useOrders();
	const { orderId } = useParams();
	const order = orders?.find((o) => o.orderId === orderId);

	return (
		<main className="main-content page-section">
			<div className="page-container max-w-3xl">
				{ordersLoading ? (
					<LoadingSpinner className="min-h-[40vh]" />
				) : ordersError ? (
					<p className="py-12 text-center text-error">{ordersError}</p>
				) : (
					<>
						<h1 className="mb-8 text-center text-2xl font-semibold text-surface-900">
							Order Summary
						</h1>
						{order && Object.keys(order).length ? (
							<OrderItem order={order} />
						) : (
							<div className="rounded-2xl border border-surface-200 bg-white p-8 text-center shadow-card">
								<h4 className="text-surface-700">Order not found</h4>
								<Button as={Link} to="/products" className="mt-4">
									Shop more
								</Button>
							</div>
						)}
						<div className="mt-8 flex justify-center">
							<Button as={Link} to="/profile/orders" variant="outline">
								View all orders
							</Button>
						</div>
					</>
				)}
			</div>
		</main>
	);
};

export { OrderSummary };
