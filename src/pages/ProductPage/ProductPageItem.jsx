import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useCart, useAuth, useWishList, useProduct } from "contexts";
import { getSellingPrice } from "utils/";
import { postToCart, postToWishList, deleteProductInWishList, getProductItem } from "services";
import { useDocumentTitle, useToast } from "custom-hooks";
import { Button, Badge, LoadingSpinner } from "components/ui";

const ProductPageItem = () => {
	const { productId } = useParams();
	const { productItem, productItemMessages: { loading, error }, productDispatch } = useProduct();
	const { cartState: { cartItems }, cartDispatch } = useCart();
	const { wishListState: { wishListItems }, wishListDispatch } = useWishList();
	const { authState: { token, isAuth } } = useAuth();
	const { showToast } = useToast();
	const navigate = useNavigate();
	const [loadingAction, setLoadingAction] = useState(false);
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Product");
		productDispatch({ type: "SET_PRODUCT_ITEM_MESSAGES", payload: { productItemMessages: { loading: true, error: null } } });
		getProductItem(productId)
			.then(({ data: { product } }) => {
				productDispatch({ type: "SET_PRODUCT_ITEM", payload: { productItem: product, productItemMessages: { loading: false, error: null } } });
			})
			.catch(() => {
				showToast("Could not load product.", "error");
				productDispatch({
					type: "SET_PRODUCT_ITEM_MESSAGES",
					payload: { productItemMessages: { loading: false, error: "Could not load product." } },
				});
			});
	}, [productId]);

	const bookInCart = cartItems?.find((item) => item._id == productId);
	const bookInWishList = wishListItems?.find((item) => item._id == productId);

	if (loading || !productItem) {
		return (
			<main className="main-content page-section flex min-h-[50vh] items-center justify-center">
				<LoadingSpinner size="lg" />
			</main>
		);
	}

	if (error) {
		return (
			<main className="main-content page-section flex min-h-[50vh] flex-col items-center justify-center gap-4">
				<p className="text-error">{error}</p>
				<Button onClick={() => navigate("/products")}>Back to Shop</Button>
			</main>
		);
	}

	const {
		author,
		bookType,
		coverImg,
		discountPercent,
		genres,
		_id,
		description,
		originalPrice,
		title,
		totalRatings,
		totalStars,
		inStock,
	} = productItem;

	const sellingPrice = getSellingPrice(originalPrice, discountPercent);
	const outOfStock = !inStock;
	const localeOriginalPrice = originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const localeSellingPrice = sellingPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	const localeTotalRatings = totalRatings.toLocaleString("en-IN");

	const handleAddToCart = async () => {
		if (outOfStock) return;
		setLoadingAction(true);
		if (!isAuth) {
			navigate("/login", { state: { from: `/products/${_id}` } });
			setLoadingAction(false);
			return;
		}
		if (bookInCart) {
			navigate("/cart");
			setLoadingAction(false);
			return;
		}
		try {
			const { data: { cart } } = await postToCart(productItem, token);
			showToast("Item added to cart", "success");
			cartDispatch({ type: "SET_CART_ITEMS", payload: { cartItems: cart, error: null, loading: false } });
		} catch {
			showToast("Failed to add to cart. Please try again.", "error");
		}
		setLoadingAction(false);
	};

	const handleWishlist = async () => {
		if (outOfStock) return;
		setLoadingAction(true);
		if (!isAuth) {
			navigate("/login", { state: { from: `/products/${_id}` } });
			setLoadingAction(false);
			return;
		}
		try {
			const { data: { wishlist } } = bookInWishList
				? await deleteProductInWishList(_id, token)
				: await postToWishList(productItem, token);
			wishListDispatch({ type: "ADD_TO_WISHLIST", payload: { wishListItems: wishlist, error: false, loading: false } });
			showToast(bookInWishList ? "Removed from wishlist" : "Added to wishlist", "success");
		} catch {
			showToast("Failed to update wishlist.", "error");
		}
		setLoadingAction(false);
	};

	return (
		<main className="main-content page-section">
			<div className="page-container">
				<div className="mx-auto w-full max-w-5xl min-w-0">
					<div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-12">
						<div className="shrink-0 w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:w-2/5">
							<div className="relative overflow-hidden rounded-2xl border border-surface-200 bg-surface-100 shadow-soft">
								<img
									src={coverImg}
									alt={title}
									className="aspect-[3/4] w-full object-cover"
								/>
							</div>
						</div>
						<div className="flex-1 min-w-0">
							<div className="mb-3 flex flex-wrap items-center gap-3">
								<Badge variant="default">{bookType}</Badge>
								<button
									type="button"
									className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 bg-white text-surface-600 shadow-soft hover:bg-surface-50"
									onClick={handleWishlist}
									disabled={loadingAction || outOfStock}
									aria-label={bookInWishList ? "Remove from wishlist" : "Add to wishlist"}
								>
									<i className={`fa-${bookInWishList ? "solid" : "regular"} fa-heart`} />
								</button>
							</div>
							<h1 className="text-xl font-semibold tracking-tight text-surface-900 sm:text-2xl lg:text-3xl break-words">
								{title}
							</h1>
							<p className="mt-2 text-surface-600">{author}</p>
							<div className="mt-6 flex flex-wrap items-center gap-4">
								<div className="flex items-center gap-2">
									<p className="text-xl font-semibold text-surface-900">₹ {localeSellingPrice}</p>
									<span className="text-sm text-success">{discountPercent}% off</span>
								</div>
								<p className="text-sm text-surface-400 line-through">₹ {localeOriginalPrice}</p>
								<div className="flex items-center gap-1.5 text-sm text-surface-500">
									<span className="font-medium text-surface-700">{totalStars}</span>
									<i className="fa-solid fa-star text-amber-500" />
									<span>|</span>
									<span>{localeTotalRatings} ratings</span>
								</div>
							</div>
							{outOfStock && (
								<p className="mt-3 text-sm font-medium text-error">Out of stock</p>
							)}
							<p className="mt-6 text-sm leading-relaxed text-surface-600">
								{description}
							</p>
							{genres?.length > 0 && (
								<div className="mt-4 flex flex-wrap gap-2">
									{genres.map((g) => (
										<Badge key={g} variant="default">{g}</Badge>
									))}
								</div>
							)}
							<ul className="mt-6 space-y-2 text-sm text-surface-600">
								<li className="flex items-start gap-2">
									<i className="fa-solid fa-truck-fast mt-0.5 text-success" />
									Express Delivery — guaranteed within 72 hours
								</li>
								<li className="flex items-start gap-2">
									<i className="fa-solid fa-arrow-rotate-left mt-0.5 text-success" />
									Fair Replacement Policy — replace within 10 days
								</li>
								<li className="flex items-start gap-2">
									<i className="fa-solid fa-shield-virus mt-0.5 text-success" />
									Safe delivery with COVID-19 safety protocols
								</li>
							</ul>
							<div className="mt-6 sm:mt-8">
								<Button
									variant="primary"
									size="lg"
									fullWidth
									className="sm:w-auto"
									disabled={loadingAction || outOfStock}
									onClick={handleAddToCart}
								>
									{bookInCart ? "Go to Cart" : "Add to Cart"}
									<ShoppingCart className="ml-2" fontSize="small" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export { ProductPageItem };
