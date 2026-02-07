import React from "react";
import { Link } from "react-router-dom";
import { useOrders } from "contexts";
import { OrderItem } from "components";
import { LoadingSpinner, EmptyState, Button } from "components/ui";

const Orders = () => {
	const { orders, ordersLoading, ordersError } = useOrders();

	if (ordersLoading) {
		return (
			<main className="main-content page-section flex min-h-[40vh] items-center justify-center">
				<LoadingSpinner />
			</main>
		);
	}

	if (ordersError) {
		return (
			<main className="main-content page-section">
				<div className="page-container">
					<p className="py-12 text-center text-error">{ordersError}</p>
					<Button as={Link} to="/products">Shop for books</Button>
				</div>
			</main>
		);
	}

	return (
		<div>
			<h2 className="mb-6 text-lg font-semibold text-surface-900">My Orders</h2>
			{orders?.length ? (
				<div className="space-y-6">
					{orders.map((order) => (
						<OrderItem order={order} key={order.orderId} page="orders" />
					))}
				</div>
			) : (
				<EmptyState
					title="No orders yet"
					description="Your orders will appear here after you place one."
					actionLabel="Shop now"
					actionTo="/products"
				/>
			)}
			{orders?.length > 0 && (
				<div className="mt-8">
					<Button as={Link} to="/products" variant="outline">
						Shop more
					</Button>
				</div>
			)}
		</div>
	);
};

export { Orders };
