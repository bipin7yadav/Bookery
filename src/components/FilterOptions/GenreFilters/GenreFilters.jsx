import React from "react";
import { v4 as uuid } from "uuid";
import { GenreFilterOption } from "./GenreFilterOption";

const genreList = [
	"Fiction",
	"Non-Fiction",
	"Romance",
	"Classics",
	"Fantasy",
	"Mystery",
	"Thriller",
];

const GenreFilters = () => (
	<div>
		<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
			Genre
		</h4>
		<ul className="space-y-1">
			{genreList.map((name) => (
				<GenreFilterOption key={name} categoryName={name} />
			))}
		</ul>
	</div>
);

export { GenreFilters };
