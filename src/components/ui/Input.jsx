import React from "react";

const inputBase =
	"w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm text-surface-800 placeholder-surface-400 transition-colors duration-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none disabled:bg-surface-100 disabled:cursor-not-allowed";

const Input = ({
	label,
	error,
	className = "",
	id,
	type = "text",
	...props
}) => {
	const inputId = id || props.name;
	return (
		<div className="flex flex-col gap-1.5">
			{label && (
				<label
					htmlFor={inputId}
					className="text-sm font-medium text-surface-700"
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				type={type}
				className={`${inputBase} ${error ? "border-error focus:border-error focus:ring-error/20" : ""} ${className}`}
				{...props}
			/>
			{error && (
				<span className="text-2xs text-error">{error}</span>
			)}
		</div>
	);
};

export { Input };
