/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding')
		return config
	},
	images: {
    domains: ['cdn-images-1.medium.com', 'miro.medium.com', 'ui-avatars.com', 'img.reservoir.tools'],
	},
}

module.exports = nextConfig
