import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "contexts/";
import { useDocumentTitle } from "custom-hooks";
import { AddressList } from "./AddressList";
import { CheckoutSummary } from "./CheckoutSummary";

const Checkout = () => {
	const { cartState: { checkoutData } } = useCart();
	const navigate = useNavigate();
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Checkout");
		if (!checkoutData) navigate("/products");
	}, [checkoutData, navigate, setDocumentTitle]);

	if (!checkoutData) return null;

	return (
		<main className="main-content page-section">
			<div className="page-container">
				<h1 className="mb-6 text-center text-xl font-semibold text-surface-900 sm:mb-8 sm:text-2xl">
					Checkout
				</h1>
				<div className="mx-auto grid w-full max-w-6xl gap-6 min-w-0 lg:grid-cols-2 lg:gap-8">
					<div className="min-w-0">
						<AddressList />
					</div>
					<div className="min-w-0">
						<CheckoutSummary />
					</div>
				</div>
			</div>
		</main>
	);
};

export { Checkout };
