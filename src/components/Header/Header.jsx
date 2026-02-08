import React from "react";
import { Link } from "react-router-dom";
import { Button } from "components/ui";
import libraryImg from "assets/images/library-img.jpg";

const Header = () => (
	<header
		className="relative flex min-h-[50vh] items-center justify-center bg-surface-900 bg-cover bg-center bg-no-repeat px-4 py-16 sm:min-h-[60vh]"
		style={{ backgroundImage: `url(${libraryImg})` }}
	>
		<div className="absolute inset-0 bg-surface-900/60" />
		<section className="relative z-10 max-w-2xl text-center px-2">
			<h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
				One stop shop for all your book needs and moods.
			</h2>
			<div className="mt-6 sm:mt-8">
				<Button
					as={Link}
					to="/products"
					variant="primary"
					size="lg"
					className="bg-white text-surface-900 hover:bg-surface-100"
				>
					Shop Now
					<i className="fas fa-arrow-right ml-1 text-sm" />
				</Button>
			</div>
		</section>
	</header>
);

export { Header };
