/* eslint-disable @typescript-eslint/no-var-requires */
const internalDependencies = Object.keys(require('./package.json').dependencies).filter((package) =>
  /^@(app|contents|domain|lib)\//.test(package),
)

const withTM = require('next-transpile-modules')(internalDependencies)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const pluginStack = (config) =>
  [withVanillaExtract, withTM, withBundleAnalyzer].reduce((config, plugin) => plugin(config), config)

/** @returns {import('next').NextConfig} */
const nextConfig = (phase) => ({
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
      return []
    }

    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://sorto.me' },
          { key: 'Vary', value: 'Origin' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/Web',
        permanent: false,
      },
      {
        source: '/post',
        destination: '/posts',
        permanent: true,
      },
      {
        source: '/post/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
})

module.exports = (phase) => pluginStack(nextConfig(phase))
