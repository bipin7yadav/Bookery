import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, useAuth, useWishList } from "contexts";
import { getSellingPrice } from "utils/";
import { postToCart, postToWishList, deleteProductInWishList } from "services";
import { useToast } from "custom-hooks";
import { Button, Badge } from "components/ui";

const ProductItem = ({ book }) => {
	const { cartState: { cartItems }, cartDispatch } = useCart();
	const { wishListState: { wishListItems }, wishListDispatch } = useWishList();
	const { authState: { token, isAuth } } = useAuth();
	const { showToast } = useToast();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const bookInCart = cartItems?.find((item) => item._id === book._id);
	const bookInWishList = wishListItems?.find((item) => item._id === book._id);

	const {
		author,
		bookType,
		coverImg,
		discountPercent,
		genres,
		_id,
		offers,
		originalPrice,
		title,
		totalRatings,
		totalStars,
		inStock,
	} = book;

	const sellingPrice = getSellingPrice(originalPrice, discountPercent);
	const outOfStock = !inStock;
	const localeOriginalPrice = originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const localeSellingPrice = sellingPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const localeTotalRatings = totalRatings.toLocaleString("en-IN");

	const badgeLabel =
		bookType === "Hardcover"
			? bookType
			: offers?.filter((o) => o.isOffer)?.[0]?.offerText;

	const handleAddToCart = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (outOfStock) return;
		setLoading(true);
		if (!isAuth) {
			navigate("/login", { state: { from: "/products" } });
			setLoading(false);
			return;
		}
		if (bookInCart) {
			navigate("/cart");
			setLoading(false);
			return;
		}
		try {
			const { data: { cart } } = await postToCart(book, token);
			showToast("Item added to cart", "success");
			cartDispatch({ type: "SET_CART_ITEMS", payload: { cartItems: cart, error: null, loading: false } });
		} catch {
			showToast("Failed to add item to cart. Please try again later.", "error");
		}
		setLoading(false);
	};

	const handleWishlist = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (outOfStock) return;
		setLoading(true);
		if (!isAuth) {
			navigate("/login", { state: { from: "/products" } });
			setLoading(false);
			return;
		}
		try {
			const { data: { wishlist } } = bookInWishList
				? await deleteProductInWishList(_id, token)
				: await postToWishList(book, token);
			wishListDispatch({ type: "ADD_TO_WISHLIST", payload: { wishListItems: wishlist, error: false, loading: false } });
			showToast(bookInWishList ? "Removed from wishlist" : "Added to wishlist", "success");
		} catch {
			showToast("Failed to update wishlist. Please try again later.", "error");
		}
		setLoading(false);
	};

	return (
		<article
			className={`group relative flex flex-col min-w-0 overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card transition-all duration-200 hover:shadow-cardHover hover:border-surface-300 ${outOfStock ? "opacity-70" : ""} ${loading ? "pointer-events-none" : ""}`}
		>
			{badgeLabel && (
				<div className="absolute left-3 top-3 z-10">
					<Badge variant="primary">{badgeLabel}</Badge>
				</div>
			)}
			<button
				type="button"
				className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-surface-600 shadow-soft transition-colors hover:bg-white hover:text-surface-800"
				onClick={handleWishlist}
				disabled={loading || outOfStock}
				aria-label={bookInWishList ? "Remove from wishlist" : "Add to wishlist"}
			>
				<i className={`fa-${bookInWishList ? "solid" : "regular"} fa-heart`} />
			</button>

			{outOfStock && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 pointer-events-none">
					<span className="rounded-lg bg-surface-800 px-3 py-1.5 text-2xs font-medium text-white">
						Out of Stock
					</span>
				</div>
			)}

			<Link to={`/products/${_id}`} className="flex-1 flex flex-col">
				<div className="aspect-[3/4] overflow-hidden bg-surface-100">
					<img
						src={coverImg}
						alt={title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>

				<div className="p-4 flex-1">
					<div className="mb-1 flex items-center gap-1.5 text-2xs text-surface-500">
						<span className="font-medium text-surface-700">{totalStars}</span>
						<i className="fa-solid fa-star text-amber-500" />
						<span>|</span>
						<span>{localeTotalRatings} ratings</span>
					</div>
					<h3 className="font-medium text-surface-900 line-clamp-2">{title}</h3>
					<p className="mt-0.5 text-sm text-surface-500">{author}</p>
					<div className="mt-3 flex items-center justify-between gap-2">
						<div>
							<p className="text-sm font-semibold text-surface-900">₹ {localeSellingPrice}</p>
							<p className="text-2xs text-surface-400 line-through">₹ {localeOriginalPrice}</p>
						</div>
						{discountPercent > 0 && (
							<Badge variant="success">{discountPercent}% off</Badge>
						)}
					</div>
					{genres?.length > 0 && (
						<div className="mt-2 flex flex-wrap gap-1">
							{genres.slice(0, 2).map((g) => (
								<Badge key={g} variant="default" className="text-2xs">
									{g}
								</Badge>
							))}
						</div>
					)}
				</div>
			</Link>

			<div className="border-t border-surface-100 p-3 mt-auto">
				<Button
					variant="primary"
					size="md"
					fullWidth
					disabled={loading || outOfStock}
					onClick={handleAddToCart}
					className="flex items-center justify-center gap-1 whitespace-nowrap px-2"
				>
					<span className="truncate">{bookInCart ? "Go to Cart" : "Add to Cart"}</span>
					<i className="fa-solid fa-cart-shopping text-sm shrink-0" />
				</Button>
			</div>
		</article>
	);
};

export { ProductItem };
