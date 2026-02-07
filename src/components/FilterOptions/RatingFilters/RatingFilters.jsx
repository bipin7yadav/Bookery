import React from "react";
import { RatingFilterOption } from "./RatingFilterOption";

const ratingOptions = [
	{ label: "4 Stars & above", value: 4 },
	{ label: "3 Stars & above", value: 3 },
	{ label: "2 Stars & above", value: 2 },
];

const RatingFilters = () => (
	<div>
		<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
			Rating
		</h4>
		<ul className="space-y-1">
			{ratingOptions.map(({ label, value }) => (
				<RatingFilterOption
					key={value}
					ratingFilter={label}
					ratingValue={value}
				/>
			))}
		</ul>
	</div>
);

export { RatingFilters };
