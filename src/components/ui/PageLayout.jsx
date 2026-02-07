import React from "react";

const PageLayout = ({
	children,
	title,
	description,
	className = "",
	containerClass = "",
}) => (
	<main className={`main-content page-section ${className}`}>
		<div className={`page-container ${containerClass}`}>
			{title && (
				<header className="mb-8 text-center sm:text-left">
					<h1 className="text-2xl font-semibold tracking-tight text-surface-900 sm:text-3xl">
						{title}
					</h1>
					{description && (
						<p className="mt-2 text-sm text-surface-600">
							{description}
						</p>
					)}
				</header>
			)}
			{children}
		</div>
	</main>
);

export { PageLayout };
