import React from "react";

const variants = {
	default: "bg-surface-200 text-surface-700",
	primary: "bg-surface-800 text-white",
	success: "bg-success/15 text-success",
	error: "bg-error/15 text-error",
};

const Badge = ({ children, variant = "default", className = "" }) => (
	<span
		className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-2xs font-medium ${variants[variant]} ${className}`}
	>
		{children}
	</span>
);

export { Badge };
