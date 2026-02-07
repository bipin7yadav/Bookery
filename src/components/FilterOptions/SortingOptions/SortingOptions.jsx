import { v4 as uuid } from "uuid";
import { useFilter } from "contexts/";
import { SortingOptionsItem } from "./SortingOptionsItem";

const SortingOptions = () => {
	const { filterDispatch, filterState: { sortBy } } = useFilter();

	const handleChange = (e) => {
		filterDispatch({ filterType: "SORT_BY", filterPayload: e.target.value });
	};

	const options = [
		{ id: uuid(), option: "Price - High to Low", value: "PRICE_HIGH_TO_LOW" },
		{ id: uuid(), option: "Price - Low to High", value: "PRICE_LOW_TO_HIGH" },
	];

	return (
		<div>
			<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
				Sort By
			</h4>
			<ul className="space-y-1">
				{options.map(({ id, option, value }) => (
					<SortingOptionsItem
						key={id}
						option={option}
						handleChangeSortingOption={handleChange}
						value={value}
						sortBy={sortBy}
					/>
				))}
			</ul>
		</div>
	);
};

export { SortingOptions };
