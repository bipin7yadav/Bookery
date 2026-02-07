import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const EmptyState = ({
	title,
	description,
	actionLabel = "Continue shopping",
	actionTo = "/products",
	image,
	className = "",
}) => (
	<div
		className={`flex flex-col items-center justify-center rounded-2xl border border-surface-200 bg-surface-50/50 py-16 px-6 text-center ${className}`}
	>
		{image && (
			<img
				src={image}
				alt=""
				className="mx-auto mb-6 h-40 w-auto object-contain opacity-80"
			/>
		)}
		<h3 className="text-lg font-semibold text-surface-800">{title}</h3>
		{description && (
			<p className="mt-2 max-w-sm text-sm text-surface-600">
				{description}
			</p>
		)}
		<Button as={Link} to={actionTo} className="mt-6" size="md">
			{actionLabel}
		</Button>
	</div>
);

export { EmptyState };
