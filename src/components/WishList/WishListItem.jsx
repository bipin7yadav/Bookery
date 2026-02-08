import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAuth, useCart, useWishList } from "contexts";
import { useToast, useUpdateCart } from "custom-hooks/";
import { getSellingPrice } from "utils";
import { postToCart, deleteProductInWishList } from "services";
import { Button } from "components/ui";

const WishListItem = ({ wishListItem }) => {
	const [loading, setLoading] = useState(false);
	const { _id, author, title, coverImg, discountPercent, originalPrice } = wishListItem;
	const sellingPrice = getSellingPrice(originalPrice, discountPercent);
	const localeSellingPrice = sellingPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const localeOriginalPrice = originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

	const { authState: { token } } = useAuth();
	const { showToast } = useToast();
	const { wishListDispatch } = useWishList();
	const { cartState: { cartItems }, cartDispatch } = useCart();
	const { callUpdateProductInCart } = useUpdateCart();

	const handleRemove = async (showMsg = true) => {
		setLoading(true);
		try {
			const { data: { wishlist } } = await deleteProductInWishList(_id, token);
			wishListDispatch({ type: "ADD_TO_WISHLIST", payload: { wishListItems: wishlist, error: false, loading: false } });
			if (showMsg) showToast("Removed from wishlist", "success");
		} catch {
			showToast("Failed to remove. Try again.", "error");
			setLoading(false);
		}
	};

	const handleMoveToCart = async () => {
		setLoading(true);
		const inCart = cartItems?.find((item) => item._id === _id);
		if (inCart) {
			const ok = await callUpdateProductInCart(_id, "increment", false);
			if (ok) {
				handleRemove(false);
				showToast("Moved to cart", "success");
			} else {
				showToast("Failed to update cart.", "error");
			}
			setLoading(false);
			return;
		}
		try {
			const { data: { cart } } = await postToCart(wishListItem, token);
			cartDispatch({ type: "SET_CART_ITEMS", payload: { cartItems: cart, error: null, loading: false } });
			handleRemove(false);
			showToast("Moved to cart", "success");
		} catch {
			showToast("Failed to add to cart.", "error");
			setLoading(false);
		}
	};

	return (
		<article className="col-span-full sm:col-span-1 min-w-0 overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card transition-shadow hover:shadow-cardHover">
			<Link to={`/products/${_id}`} className="flex sm:block">
				<div className="w-28 shrink-0 sm:w-full aspect-[3/4] overflow-hidden bg-surface-100">
					<img src={coverImg} alt={title} className="h-full w-full object-cover" />
				</div>
				<div className="p-4 flex-1">
					<h3 className="font-medium text-surface-900 line-clamp-2">{title}</h3>
					<p className="mt-0.5 text-sm text-surface-500">{author}</p>
					<div className="mt-3 flex items-center gap-2">
						<p className="font-semibold text-surface-900">₹ {localeSellingPrice}</p>
						<p className="text-sm text-surface-400 line-through">₹ {localeOriginalPrice}</p>
					</div>
					<p className="text-2xs text-success">Save {discountPercent}%</p>
				</div>
			</Link>
			<div className="flex gap-2 border-t border-surface-100 p-4">
				<button
					type="button"
					className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-surface-200 text-surface-600 hover:bg-surface-50"
					onClick={(e) => { e.preventDefault(); handleRemove(); }}
					disabled={loading}
					aria-label="Remove from wishlist"
				>
					<i className="fa-solid fa-heart text-sm" />
				</button>
				<Button variant="primary" size="md" className="flex-1 flex items-center justify-center gap-1.5 px-2" disabled={loading} onClick={(e) => { e.preventDefault(); handleMoveToCart(); }}>
					<span className="truncate min-w-0">Move to cart</span>
					<ShoppingCart fontSize="small" className="shrink-0" />
				</Button>
			</div>
		</article>
	);
};

export { WishListItem };
