import React from "react";
import {
	GenreFilters,
	BookTypeFilters,
	RatingFilters,
	PriceFilters,
	ClearFilters,
	SortingOptions,
} from "components";

const Filters = ({ handleChangeShowFilterDrawer, showFilterDrawer }) => {
	return (
		<aside
			className={`fixed inset-y-0 left-0 z-50 w-full max-w-[300px] flex-col overflow-y-auto border-r border-surface-200 bg-white shadow-large transition-transform duration-300 ease-smooth lg:static lg:block lg:max-w-[260px] lg:translate-x-0 lg:shadow-none ${
				showFilterDrawer ? "flex translate-x-0" : "-translate-x-full lg:flex"
			}`}
		>
			<div className="sticky top-0 z-10 border-b border-surface-100 bg-white p-4">
				<ClearFilters handleChangeShowFilterDrawer={handleChangeShowFilterDrawer} />
			</div>
			<div className="space-y-6 p-4">
				<SortingOptions />
				<GenreFilters />
				<PriceFilters />
				<RatingFilters />
				<BookTypeFilters />
			</div>
		</aside>
	);
};

export { Filters };
