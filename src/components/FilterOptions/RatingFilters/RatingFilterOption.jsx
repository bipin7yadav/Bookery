import React from "react";
import { useFilter } from "contexts/";

const RatingFilterOption = ({ ratingFilter, ratingValue }) => {
	const { filterState: { ratingsMoreThan }, filterDispatch } = useFilter();

	const handleChange = (e) => {
		filterDispatch({
			filterType: "FILTER_BY_RATINGS",
			filterPayload: parseInt(e.target.value, 10),
		});
	};

	return (
		<li>
			<label className="flex cursor-pointer items-center gap-3 rounded-lg py-2 px-2 hover:bg-surface-50">
				<input
					type="radio"
					value={ratingValue}
					id={ratingFilter}
					name="product-ratings"
					onChange={handleChange}
					checked={ratingsMoreThan === ratingValue}
					className="h-4 w-4 border-surface-300 text-surface-800 focus:ring-accent-500"
				/>
				<span className="text-sm text-surface-700">{ratingFilter}</span>
			</label>
		</li>
	);
};

export { RatingFilterOption };
