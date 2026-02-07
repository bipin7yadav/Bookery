import React, { useState } from "react";
import { useAuth, useCart, useWishList } from "contexts/";
import { getSellingPrice } from "utils/";
import { deleteProductInCart, postToWishList } from "services";
import { useToast, useUpdateCart } from "custom-hooks";
import { Button, Badge } from "components/ui";

const CartListItem = ({ cartItem }) => {
	const [loading, setLoading] = useState(false);
	const {
		author,
		bookType,
		coverImg,
		discountPercent,
		originalPrice,
		_id,
		title,
		qty,
	} = cartItem;

	const sellingPrice = getSellingPrice(originalPrice, discountPercent);
	const localeSellingPrice = sellingPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

	const { authState: { token } } = useAuth();
	const { showToast } = useToast();
	const { cartDispatch } = useCart();
	const { wishListState: { wishListItems }, wishListDispatch } = useWishList();
	const { callUpdateProductInCart } = useUpdateCart();

	const handleQty = async (e) => {
		const op = e.target.value === "INCREASE_QUANTITY" ? "increment" : "decrement";
		if (op === "decrement" && qty === 1) {
			handleRemove(true);
			return;
		}
		setLoading(true);
		await callUpdateProductInCart(_id, op);
		setLoading(false);
	};

	const handleRemove = async (showMsg = true) => {
		setLoading(true);
		try {
			const { data: { cart } } = await deleteProductInCart(_id, token);
			if (showMsg) showToast("Item removed from cart", "success");
			cartDispatch({ type: "SET_CART_ITEMS", payload: { cartItems: cart, error: null, loading: false } });
		} catch {
			showToast("Failed to remove item. Please try again.", "error");
		}
		setLoading(false);
	};

	const isInWishlist = wishListItems?.find((w) => w._id === _id);

	const handleMoveToWishlist = async () => {
		if (isInWishlist) {
			handleRemove(false);
			showToast("Item in wishlist", "success");
			return;
		}
		setLoading(true);
		try {
			const { data: { wishlist } } = await postToWishList(cartItem, token);
			wishListDispatch({ type: "ADD_TO_WISHLIST", payload: { wishListItems: wishlist, error: false, loading: false } });
			showToast("Moved to wishlist", "success");
			handleRemove(false);
		} catch {
			showToast("Failed to move to wishlist.", "error");
		}
		setLoading(false);
	};

	return (
		<article className="flex flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card sm:flex-row min-w-0">
			<div className="relative h-40 w-full shrink-0 bg-surface-100 sm:h-36 sm:w-28 md:h-40 md:w-32">
				<img src={coverImg} alt={title} className="h-full w-full object-cover" />
				<div className="absolute left-2 top-2">
					<Badge variant="default">{bookType}</Badge>
				</div>
			</div>
			<div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-5">
				<div className="min-w-0">
					<h3 className="font-medium text-surface-900">{title}</h3>
					<p className="text-sm text-surface-500">{author}</p>
					<p className="mt-2 text-sm font-semibold text-surface-900">₹ {localeSellingPrice}</p>
					<p className="text-2xs text-success">You save {discountPercent}%</p>
				</div>
				<div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
					<div className="flex items-center rounded-xl border border-surface-200">
						<button
							type="button"
							className="flex h-9 w-9 items-center justify-center text-surface-600 hover:bg-surface-50 disabled:opacity-50"
							value="DECREASE_QUANTITY"
							disabled={loading}
							onClick={handleQty}
						>
							−
						</button>
						<span className="flex h-9 w-12 items-center justify-center border-x border-surface-200 text-sm font-medium">
							{qty}
						</span>
						<button
							type="button"
							className="flex h-9 w-9 items-center justify-center text-surface-600 hover:bg-surface-50 disabled:opacity-50"
							value="INCREASE_QUANTITY"
							disabled={loading}
							onClick={handleQty}
						>
							+
						</button>
					</div>
					<Button variant="secondary" size="sm" disabled={loading} onClick={handleMoveToWishlist}>
						Move to wishlist
					</Button>
					<Button variant="ghost" size="sm" disabled={loading} onClick={() => handleRemove(true)}>
						Remove
					</Button>
				</div>
			</div>
		</article>
	);
};

export { CartListItem };
