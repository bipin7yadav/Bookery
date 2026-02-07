import React from "react";

const SortingOptionsItem = ({
	handleChangeSortingOption,
	option,
	value,
	sortBy,
}) => (
	<li>
		<label className="flex cursor-pointer items-center gap-3 rounded-lg py-2 px-2 hover:bg-surface-50">
			<input
				type="radio"
				value={value}
				name="product-sort"
				onChange={handleChangeSortingOption}
				checked={sortBy === value}
				className="h-4 w-4 border-surface-300 text-surface-800 focus:ring-accent-500"
			/>
			<span className="text-sm text-surface-700">{option}</span>
		</label>
	</li>
);

export { SortingOptionsItem };
