import React from "react";
import { Link } from "react-router-dom";

// Reusable: section column with title
const FooterSection = ({ title, children, className = "" }) => (
	<section className={`flex flex-col gap-4 ${className}`}>
		<h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
			{title}
		</h3>
		{children}
	</section>
);

// Reusable: vertical list of links
const FooterLinks = ({ links }) => (
	<ul className="flex flex-col gap-3">
		{links.map(({ to, label }) => (
			<li key={to}>
				<Link
					to={to}
					className="text-sm text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
				>
					{label}
				</Link>
			</li>
		))}
	</ul>
);

// Reusable: icon link with hover state
const SocialLink = ({ href, label, children }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={label}
		className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-700"
	>
		{children}
	</a>
);

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ to: "/profile", label: "Profile" },
		{ to: "/products", label: "Shop" },
		{ to: "/cart", label: "My Cart" },
		{ to: "/wishlist", label: "My Wishlist" },
	];

	return (
		<footer
			id="footer"
			className="w-full border-t border-neutral-200 bg-neutral-50/80 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
		>
			<div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-12 sm:gap-12 lg:grid-cols-3 lg:gap-16">
				{/* Brand */}
				<FooterSection className="items-center text-center lg:items-start lg:text-left">
					<Link
						to="/"
						className="text-xl font-semibold tracking-tight text-neutral-900 transition-opacity duration-200 hover:opacity-80"
					>
						Booknook
					</Link>
					<p className="max-w-xs text-sm leading-relaxed text-neutral-600">
						One stop shop for all your book needs and moods!
					</p>
				</FooterSection>

				{/* Quick Links */}
				<FooterSection className="items-center lg:items-start">
					<FooterLinks links={quickLinks} />
				</FooterSection>

				{/* Contact - hidden on small screens to match original behavior */}
				<FooterSection className="hidden items-center sm:flex lg:items-start">
					<address className="not-italic text-sm leading-relaxed text-neutral-600">
						Royal Industrial Estate,
						<br />
						Lokhandwala, Andheri(W),
						<br />
						Mumbai, India — 400053
					</address>
					<a
						href="tel:+911234567890"
						className="mt-1 flex items-center gap-2 text-sm text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
					>
						<span className="text-neutral-400" aria-hidden>
							<i className="fas fa-phone" />
						</span>
						+91 1234567890
					</a>
				</FooterSection>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-neutral-200 bg-white/50 px-4 py-6 sm:px-6 sm:py-8">
				<div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
					<div className="flex items-center justify-center gap-2">
						<SocialLink
							href="https://x.com/bipin7yadav"
							label="Twitter"
						>
							<i className="fab fa-twitter text-lg" />
						</SocialLink>
						<SocialLink
							href="https://github.com/bipin7yadav"
							label="GitHub"
						>
							<i className="fab fa-github text-lg" />
						</SocialLink>
						<SocialLink
							href="https://www.linkedin.com/in/bipin-yadav7/"
							label="LinkedIn"
						>
							<i className="fab fa-linkedin text-lg" />
						</SocialLink>
						<SocialLink
							href="mailto:bipinyadav9769@gmail.com"
							label="Email"
						>
							<i className="fas fa-envelope text-lg" />
						</SocialLink>
					</div>
					<p className="text-sm text-neutral-500">
						© {currentYear} Booknook. All rights reserved.
					</p>
					<p className="text-sm text-neutral-500">
						<span className="inline-flex items-center gap-1">
							&lt;/&gt; by
							<a
								href="https://bipinyadav.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
							>
								Bipin Yadav
							</a>
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
