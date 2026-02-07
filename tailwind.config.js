/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				// Neutral palette – primary UI
				surface: {
					50: "#fafafa",
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#737373",
					600: "#525252",
					700: "#404040",
					800: "#262626",
					900: "#171717",
				},
				// Accent – CTAs, links, focus (subtle)
				accent: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
				},
				// Semantic
				success: "#059669",
				error: "#dc2626",
				warning: "#d97706",
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
			},
			fontSize: {
				"2xs": ["0.6875rem", { lineHeight: "1rem" }],
			},
			spacing: {
				18: "4.5rem",
				22: "5.5rem",
				30: "7.5rem",
			},
			borderRadius: {
				xl: "0.75rem",
				"2xl": "1rem",
				"3xl": "1.5rem",
			},
			boxShadow: {
				soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
				medium: "0 4px 12px rgba(0, 0, 0, 0.08)",
				large: "0 8px 24px rgba(0, 0, 0, 0.1)",
				card: "0 1px 3px rgba(0, 0, 0, 0.05)",
				cardHover: "0 8px 30px rgba(0, 0, 0, 0.08)",
			},
			transitionDuration: {
				200: "200ms",
				300: "300ms",
			},
			transitionTimingFunction: {
				smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
			},
			animation: {
				"fade-in": "fadeIn 0.2s ease-out",
				"slide-up": "slideUp 0.3s ease-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(8px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			maxWidth: {
				"8xl": "88rem",
				"9xl": "96rem",
			},
		},
	},
	plugins: [],
};
