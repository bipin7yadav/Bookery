import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "assets/images/not_found.svg";
import { Button } from "components/ui";

const NotFound = () => (
	<main className="main-content page-section flex min-h-[60vh] flex-col items-center justify-center">
		<h1 className="text-2xl font-semibold text-surface-900">Page not found</h1>
		<p className="mt-2 text-surface-600">The page you’re looking for doesn’t exist.</p>
		<img
			src={NotFoundImage}
			alt=""
			className="mt-8 h-48 w-auto object-contain opacity-80"
		/>
		<Button as={Link} to="/" size="lg" className="mt-8">
			Go back home
		</Button>
	</main>
);

export { NotFound };
