import { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { PluginAPI } from 'tailwindcss/types/config'

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				sm: "600px",
				md: "728px",
				lg: "984px",
				xl: "1240px",
			},
		},
		extend: {
			colors: {
				background: "#ffffff",
				brand: {
					textGreenDark: "#262B14",
					text: "#2C3034",
					blue: "#20343C",
					orange: "#F48C04",
					bgOrange: "#F9E8D8",
					bgGreen: "#798B3E",
					bgGrey: "#CCCCCF",
				},
			},
			fontFamily: {
				heading: ["var(--font-fredoka)", "sans-serif"],
				fredoka: ["var(--font-fredoka)", "sans-serif"],
				openSans: ["var(--font-open-sans)", "sans-serif"],
				body: ["var(--font-open-sans)", "sans-serif"],
				sans: ["var(--font-open-sans)", "sans-serif"],
			},
			fontSize: {
				"heading-1": [
					"clamp(34px, 5vw, 48px)",
					{
						lineHeight: "48px",
						fontWeight: "600",
					},
				],
				"heading-2": [
					"clamp(28px, 5vw, 33px)",
					{
						lineHeight: "48px",
						fontWeight: "600",
					},
				],
				"heading-4": [
					"clamp(28px, 5vw, 28px)",
					{
						lineHeight: "48px",
						fontWeight: "600",
					},
				],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			borderColor: {
				'gold': '#FFD700',
				'silver': '#C0C0C0',
				'bronze': '#CD7F32',
			},
		},
	},
	plugins: [
		animate,
		// How to make responsive font in Tailwind boom!
		function ({ addUtilities }: PluginAPI) {
			addUtilities({
				".text-body-lead": {
					fontSize: "18px",
					lineHeight: "24px",
					fontWeight: "400",
					"@screen sm": {
						fontSize: "20px",
					},
				},
				".text-body-1": {
					fontSize: "16px",
					lineHeight: "24px",
					fontWeight: "400",
					"@screen sm": {
						fontSize: "14px",
					},
				},
			});
		},
	],
} satisfies Config;
