import React from "react";
import { compose } from "utils/";
import { ProductItem } from "./ProductItem/ProductItem";

const ProductList = ({ products }) => {
	const sortedFilteredBooks = compose(products || []);

	if (sortedFilteredBooks.length === 0) {
		return (
			<p className="py-12 text-center text-surface-600">
				No books found. Try adjusting your filters.
			</p>
		);
	}

	return (
		<>
			<p className="mb-6 text-sm text-surface-500">
				{sortedFilteredBooks.length} book{sortedFilteredBooks.length !== 1 ? "s" : ""}
			</p>
			<div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
				{sortedFilteredBooks.map((book) => (
					<ProductItem book={book} key={book._id} />
				))}
			</div>
		</>
	);
};

export { ProductList };
