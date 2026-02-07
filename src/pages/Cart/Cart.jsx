import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartList, CartSummary } from "components";
import { useCart } from "contexts/";
import { useDocumentTitle } from "custom-hooks";
import { LoadingSpinner, EmptyState, Button } from "components/ui";

const Cart = () => {
	const { cartState: { cartItems, loading, error } } = useCart();
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Cart");
	}, [setDocumentTitle]);

	if (loading) {
		return (
			<main className="main-content page-section flex min-h-[40vh] items-center justify-center">
				<LoadingSpinner />
			</main>
		);
	}

	if (error) {
		return (
			<main className="main-content page-section">
				<div className="page-container">
					<p className="py-12 text-center text-error">{error}</p>
					<div className="flex justify-center">
						<Button as={Link} to="/products">Shop for books</Button>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="main-content page-section">
			<div className="page-container">
				<h1 className="mb-8 text-center text-2xl font-semibold text-surface-900">
					My Cart
				</h1>
				{cartItems?.length ? (
					<div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3 lg:gap-8">
						<div className="min-w-0 lg:col-span-2">
							<CartList />
						</div>
						<div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
							<CartSummary cartItems={cartItems} />
						</div>
					</div>
				) : (
					<EmptyState
						title="Your cart is empty"
						description="Add some books from the shop to get started."
						actionLabel="Shop for books"
						actionTo="/products"
					/>
				)}
				{cartItems?.length > 0 && (
					<div className="mt-8 flex justify-center">
						<Button as={Link} to="/products" variant="outline">
							Continue shopping
						</Button>
					</div>
				)}
			</div>
		</main>
	);
};

export { Cart };
