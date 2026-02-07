import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "components/Header/Header";
import { useProduct } from "contexts";
import { useDocumentTitle } from "custom-hooks";
import { Button, LoadingSpinner } from "components/ui";
import loadingImage from "assets/images/loader.svg";

const LandingPage = () => {
	const {
		products = [],
		productsMessages: { loading: productLoading, error: productError } = {},
		categories = [],
		categoriesMessages: { loading, error } = {},
	} = useProduct();
	const { setDocumentTitle } = useDocumentTitle();

	useEffect(() => {
		setDocumentTitle("Booknook | Home");
	}, [setDocumentTitle]);

	const categoryMapping = categories.map(
		({ categoryImage, categoryName, _id }) => (
			<Link
				to="/products"
				state={categoryName}
				key={_id}
				className="group block overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card transition-all duration-200 hover:shadow-cardHover hover:border-surface-300"
			>
				<div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
					<img
						src={categoryImage}
						alt={`${categoryName}`}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					{categoryName === "Non-Fiction" && (
						<span className="absolute right-3 top-3 rounded-lg bg-surface-800 px-2.5 py-1 text-2xs font-medium text-white">
							Hot Sale
						</span>
					)}
				</div>
				<div className="p-5">
					<h4 className="font-semibold text-surface-900">{categoryName}</h4>
				</div>
			</Link>
		)
	);

	const sampleProducts = products?.slice(0, 4) || [];
	const sampleProductsMapping = sampleProducts.map(
		({ _id, title, author, coverImg }) => (
			<Link
				to={`/products/${_id}`}
				key={_id}
				className="group block overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-card transition-all duration-200 hover:shadow-cardHover hover:border-surface-300"
			>
				<div className="aspect-[3/4] overflow-hidden bg-surface-100">
					<img
						src={coverImg}
						alt={title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				<div className="p-5">
					<p className="font-medium text-surface-900 line-clamp-2">{title}</p>
					<p className="mt-1 text-sm text-surface-500">{author}</p>
				</div>
			</Link>
		)
	);

	return (
		<>
			<Header />
			<main className="page-section">
				<div className="page-container">
					<h2 className="text-center text-xl font-semibold text-surface-900 sm:text-2xl lg:text-3xl px-2">
						Now, get your books delivered within 24 hours to your doorstep!
					</h2>

					<section className="mt-10 sm:mt-16" id="categories">
						<h2 className="text-center text-lg font-semibold text-surface-900 sm:text-xl">
							Popular Genres
						</h2>
						<p className="mt-2 text-center text-sm text-surface-600 px-2">
							Check out the popular genres we have to offer!
						</p>
						<div className="mt-6 sm:mt-8">
							{loading ? (
								<LoadingSpinner className="py-12" />
							) : error ? (
								<p className="text-center text-error">{error}</p>
							) : (
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
									{categoryMapping}
								</div>
							)}
						</div>
						<div className="mt-8 flex justify-center">
							<Button as={Link} to="/products" size="md">
								Discover more genres
								<i className="fas fa-chevron-right ml-1 text-sm" />
							</Button>
						</div>
					</section>

					<section className="mt-12 sm:mt-20" id="top-picks">
						<h2 className="text-center text-lg font-semibold text-surface-900 sm:text-xl">
							Top Picks
						</h2>
						<p className="mt-2 text-center text-sm text-surface-600 px-2">
							Find out what books are loved by all!
						</p>
						<div className="mt-6 sm:mt-8">
							{productLoading ? (
								<LoadingSpinner className="py-12" />
							) : productError ? (
								<p className="text-center text-error">{productError}</p>
							) : (
								<div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
									{sampleProductsMapping}
								</div>
							)}
						</div>
						<div className="mt-8 flex justify-center">
							<Button as={Link} to="/products" size="md">
								Discover more books
								<i className="fas fa-chevron-right ml-1 text-sm" />
							</Button>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export { LandingPage };
