import React from "react";

const LoadingSpinner = ({ className = "", size = "md" }) => {
	const sizeClass =
		size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-12 w-12";
	return (
		<div
			className={`flex flex-col items-center justify-center gap-4 ${className}`}
			role="status"
			aria-label="Loading"
		>
			<div
				className={`animate-spin rounded-full border-2 border-surface-200 border-t-surface-600 ${sizeClass}`}
			/>
			<span className="text-sm text-surface-500">Loading...</span>
		</div>
	);
};

export { LoadingSpinner };
