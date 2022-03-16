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
        source: '/posts/2021-02-18\\+alt',
        destination: '/posts/2021-02-18--alt',
        permanent: false,
      },
      {
        source: '/posts/2021-03-16\\+variance',
        destination: '/posts/2021-03-16--variance',
        permanent: false,
      },
      {
        source: '/posts/2021-05-12\\+nominal',
        destination: '/posts/2021-05-12--nominal',
        permanent: false,
      },
      {
        source: '/posts/2022-02-20\\+markdown',
        destination: '/posts/2022-02-20--markdown',
        permanent: false,
      }
    ]
  },
})

module.exports = (phase) => pluginStack(nextConfig(phase))
