import React from "react";
import { useCart } from "contexts";
import { CartListItem } from "./CartListItem";

const CartList = () => {
	const { cartState: { cartItems } } = useCart();

	return (
		<section className="flex flex-col gap-4">
			{cartItems?.map((cartItem) => (
				<CartListItem cartItem={cartItem} key={cartItem._id} />
			))}
		</section>
	);
};

export { CartList };
