import React from "react";
import { useFilter } from "contexts/";

const PriceFilters = () => {
	const { filterState: { price }, filterDispatch } = useFilter();

	const handleChange = (e) => {
		filterDispatch({
			filterType: "FILTER_BY_PRICE",
			filterPayload: parseInt(e.target.value, 10),
		});
	};

	return (
		<div>
			<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
				Price
			</h4>
			<div className="space-y-2">
				<label htmlFor="product-price-slider" className="block text-sm font-medium text-surface-700">
					₹ {price}
				</label>
				<input
					type="range"
					id="product-price-slider"
					min="100"
					max="1000"
					step="50"
					value={price ?? 1000}
					onChange={handleChange}
					className="h-2 w-full appearance-none rounded-full bg-surface-200 accent-surface-800"
				/>
				<div className="flex justify-between text-2xs text-surface-500">
					<span>₹ 100</span>
					<span>₹ 1,000</span>
				</div>
			</div>
		</div>
	);
};

export { PriceFilters };
