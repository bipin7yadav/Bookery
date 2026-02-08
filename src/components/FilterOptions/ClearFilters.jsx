import React from "react";
import { Close } from "@mui/icons-material";
import { useFilter } from "contexts/";
import { Button } from "components/ui";

const ClearFilters = ({ handleChangeShowFilterDrawer }) => {
	const { filterDispatch } = useFilter();

	const handleClear = () => {
		filterDispatch({ filterType: "CLEAR_FILTERS" });
	};

	return (
		<div className="flex items-center justify-between">
			<h3 className="text-sm font-semibold uppercase tracking-wider text-surface-700">
				Filters
			</h3>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" onClick={handleClear}>
					Clear
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					className="lg:hidden"
					onClick={() => handleChangeShowFilterDrawer(false)}
					aria-label="Close filters"
				>
					<Close fontSize="small" />
				</Button>
			</div>
		</div>
	);
};

export { ClearFilters };
