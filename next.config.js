/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding')
		return config
	},
	images: {
		domains: ['cdn-images-1.medium.com', 'miro.medium.com', 'ui-avatars.com', 'img.reservoir.tools'],
	},
	eslint: {
	  // !! WARN !!
		ignoreDuringBuilds: true,
	},
	typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
