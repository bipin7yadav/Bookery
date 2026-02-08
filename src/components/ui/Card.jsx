import React from "react";

const Card = ({
	children,
	className = "",
	padding = "default",
	hover,
	...props
}) => {
	const paddingClass =
		padding === "none"
			? "p-0"
			: padding === "sm"
				? "p-4"
				: "p-5 sm:p-6";
	return (
		<div
			className={`rounded-2xl border border-surface-200 bg-white shadow-card transition-all duration-200 ${paddingClass} ${hover ? "hover:shadow-cardHover hover:border-surface-300" : ""} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

const CardHeader = ({ children, className = "" }) => (
	<div className={`mb-4 ${className}`}>{children}</div>
);

const CardBody = ({ children, className = "" }) => (
	<div className={className}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
	<div className={`mt-4 pt-4 border-t border-surface-100 ${className}`}>
		{children}
	</div>
);

export { Card, CardHeader, CardBody, CardFooter };
