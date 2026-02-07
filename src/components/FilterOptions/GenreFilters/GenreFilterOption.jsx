import React from "react";
import { useFilter } from "contexts/";

const GenreFilterOption = ({ categoryName }) => {
	const { filterState: { genres }, filterDispatch } = useFilter();
	const checked = genres?.[categoryName] ?? false;

	const handleChange = (e) => {
		filterDispatch({
			filterType: "FILTER_BY_GENRE",
			filterPayload: e.target.value,
		});
	};

	return (
		<li>
			<label className="flex cursor-pointer items-center gap-3 rounded-lg py-2 px-2 hover:bg-surface-50">
				<input
					type="checkbox"
					value={categoryName}
					id={`genre-${categoryName}`}
					onChange={handleChange}
					checked={checked}
					className="h-4 w-4 rounded border-surface-300 text-surface-800 focus:ring-accent-500"
				/>
				<span className="text-sm text-surface-700">{categoryName}</span>
			</label>
		</li>
	);
};

export { GenreFilterOption };
