import React from "react";

const variants = {
	primary:
		"bg-surface-800 text-white hover:bg-surface-700 shadow-soft active:scale-[0.98]",
	secondary:
		"bg-surface-100 text-surface-800 hover:bg-surface-200 border border-surface-200",
	outline:
		"bg-transparent border-2 border-surface-300 text-surface-700 hover:bg-surface-50 hover:border-surface-400",
	ghost: "bg-transparent text-surface-600 hover:bg-surface-100 hover:text-surface-800",
	link: "bg-transparent text-surface-600 hover:text-surface-900 underline-offset-4 hover:underline",
};

const sizes = {
	sm: "px-3 py-1.5 text-sm rounded-lg",
	md: "px-4 py-2.5 text-sm rounded-xl",
	lg: "px-6 py-3 text-base rounded-xl",
	icon: "p-2.5 rounded-xl",
	"icon-sm": "p-2 rounded-lg",
};

const Button = ({
	children,
	variant = "primary",
	size = "md",
	className = "",
	disabled,
	fullWidth,
	as: Component = "button",
	...props
}) => {
	const base =
		"inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
	const classes = [
		base,
		variants[variant] || variants.primary,
		sizes[size] || sizes.md,
		fullWidth && "w-full",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Component className={classes} disabled={disabled} {...props}>
			{children}
		</Component>
	);
};

export { Button };
