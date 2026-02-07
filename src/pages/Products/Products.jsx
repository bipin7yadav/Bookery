import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProduct, useFilter } from "contexts/";
import { Filters, ProductList } from "components/";
import { useDocumentTitle, useMedia } from "custom-hooks";
import { LoadingSpinner } from "components/ui";

const Products = () => {
	const {
		products,
		productsMessages: { error, loading },
	} = useProduct();
	const location = useLocation();
	const { filterDispatch } = useFilter();
	const [showFilterDrawer, setShowFilterDrawer] = useState(false);
	const isDesktop = useMedia("(min-width: 641px)");

	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Products");
	}, [setDocumentTitle]);

	useEffect(() => {
		const categoryName = location?.state;
		if (categoryName) {
			filterDispatch({
				filterType: "SET_CATEGORIES",
				filterPayload: categoryName,
			});
		}
	}, [location?.state, filterDispatch]);

	useEffect(() => {
		if (isDesktop && showFilterDrawer) {
			document.body.style.overflowY = "scroll";
			setShowFilterDrawer(false);
		} else if (!isDesktop && showFilterDrawer) {
			document.body.style.overflowY = "hidden";
		} else if (!isDesktop && !showFilterDrawer) {
			document.body.style.overflowY = "scroll";
		}
	}, [showFilterDrawer, isDesktop]);

	return (
		<main className="main-content page-section">
			<div className="page-container">
				{loading ? (
					<LoadingSpinner className="min-h-[40vh]" />
				) : error ? (
					<p className="py-12 text-center text-error">{error}</p>
				) : (
					<div className="flex flex-col gap-8 lg:flex-row">
						<Filters
							handleChangeShowFilterDrawer={setShowFilterDrawer}
							showFilterDrawer={showFilterDrawer}
						/>
						<div className="flex-1">
							<div className="mb-6 flex items-center justify-between">
								<h1 className="text-xl font-semibold text-surface-900">
									Products
								</h1>
								{!isDesktop && (
									<button
										type="button"
										onClick={() => setShowFilterDrawer(true)}
										className="flex h-10 items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 text-sm font-medium text-surface-700 shadow-soft hover:bg-surface-50"
									>
										<i className="fa-solid fa-sliders text-surface-500" />
										Filters
									</button>
								)}
							</div>
							<ProductList products={products} />
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export { Products };
