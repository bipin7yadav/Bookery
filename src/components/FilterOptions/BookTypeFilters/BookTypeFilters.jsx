import React from "react";
import { BookTypeFilterOption } from "./BookTypeFilterOption";

const bookTypes = ["Paperback", "Hardcover"];

const BookTypeFilters = () => (
	<div>
		<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
			Book Cover
		</h4>
		<ul className="space-y-1">
			{bookTypes.map((type) => (
				<BookTypeFilterOption key={type} bookTypeFilter={type} />
			))}
		</ul>
	</div>
);

export { BookTypeFilters };
