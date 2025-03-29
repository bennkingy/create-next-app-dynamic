export const GenesisHorsesContractAddress =
	"0x1DaCe27A26cda22a009fe2C000d32E178213c3Ca";
export const BerachainChainId = 80094;

export const HorseHeadsContractAddress =
	"0x716D419DB31941b49c77359C694caeECd27d329D";
export const HychainChainId = 2911;

// Chain information for API calls
export const CHAIN_INFO = {
	[BerachainChainId]: {
		name: "Berachain",
		rpc: "https://rpc.berachain.com",
		reservoirApiBase: "https://api-berachain.reservoir.tools",
	},
	[HychainChainId]: {
		name: "Hychain",
		rpc: "https://rpc.hychain.com/http",
		reservoirApiBase: "https://api-hychain.reservoir.tools", // Replace with actual API base if different
	},
};

// NFT Collections configuration
export const NFT_COLLECTIONS = {
	// Berachain collections
	HORSE_HEADS: {
		address: HorseHeadsContractAddress,
		chainId: BerachainChainId,
		name: "Horse Heads",
		description: "Profile picture collection on Berachain",
	},
	// Hychain collections
	GENESIS_HORSES: {
		address: GenesisHorsesContractAddress,
		chainId: HychainChainId,
		name: "Genesis Horses",
		description: "Playable horses in Hytopia game",
	},
};

export const mainNavigation = [
	{ label: "Home", href: "/", divider: false },
	{ label: "Register", href: "/register", divider: false },
	{ label: "Stables", href: "/stables", divider: true },
	// { label: "Play", href: "/play", divider: false },
	// { label: "Leaderboards", href: "/leaderboards", divider: false },
	// {
	// 	label: "Stables",
	// 	href: "https://legacy.Bera Horses.xyz/",
	// 	divider: true,
	// },
	// { label: "Mint", href: "/mint", divider: false },
	{
		label: "Docs",
		href: "https://bera-horses.gitbook.io/bera-horses-docs/",
		newTab: true,
		divider: false,
	},
	// { label: "Marketplace", href: "/marketplace", divider: true },
	// { label: "Connect Wallet", href: "/connect-wallet", divider: false },
];

export const partners = [
	// {
	// 	URL: "https://www.berachain.com",
	// 	imgSrc: "/partners/Berachain_logo.svg",
	// 	width: 133,
	// 	height: 66,
	// },
	{
		URL: "https://www.beramonium.io",
		imgSrc: "/partners/beramonium-logo-1.png",
		width: 100,
		height: 100,
	},
	{
		URL: "https://x.com/BeratoneGame",
		imgSrc: "/partners/Beratone_logo.svg",
		width: 176,
		height: 50,
	},
	{
		URL: "https://honeypotfinance.xyz",
		imgSrc: "/partners/honeypot_finance_logo.svg",
		width: 230,
		height: 30,
	},
	{
		URL: "https://kodiak.finance",
		imgSrc: "/partners/kodiak_logo.svg",
		width: 213,
		height: 43,
	},
	{
		URL: "#",
		imgSrc: "/partners/G33_logo.svg",
		width: 120,
		height: 120,
	},
	{
		URL: "https://magiceden.io/berachain",
		imgSrc: "/partners/magic_eden_logo.svg",
		width: 100,
		height: 100,
	},
	{
		URL: "https://www.0xhoneyjar.xyz",
		imgSrc: "/partners/The_honey_jar_logo.svg",
		width: 90,
		height: 90,
	},
	{
		URL: "#",
		imgSrc: "/partners/vector.svg",
		width: 80,
		height: 80,
	},
];
