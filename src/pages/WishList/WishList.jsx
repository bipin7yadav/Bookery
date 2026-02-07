import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { WishListItem } from "components";
import { useWishList } from "contexts";
import { useDocumentTitle } from "custom-hooks";
import { LoadingSpinner, EmptyState, Button } from "components/ui";

const WishList = () => {
	const { wishListState: { wishListItems, loading, error } } = useWishList();
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Wishlist");
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
				<h1 className="mb-6 text-center text-xl font-semibold text-surface-900 sm:mb-8 sm:text-2xl">
					My Wishlist
				</h1>
				{wishListItems?.length ? (
					<div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 min-w-0">
						{wishListItems.map((item) => (
							<WishListItem key={item._id} wishListItem={item} />
						))}
					</div>
				) : (
					<EmptyState
						title="Your wishlist is empty"
						description="Save books you like to buy them later."
						actionLabel="Shop for books"
						actionTo="/products"
					/>
				)}
				{wishListItems?.length > 0 && (
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

export { WishList };
