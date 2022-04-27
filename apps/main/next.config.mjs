import bundleAnalyzer from '@next/bundle-analyzer'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import withPWA from 'next-pwa'
import tm from 'next-transpile-modules'
import { readFile } from 'node:fs/promises'

import cache from './cache.mjs'

const packageInfo = JSON.parse(await readFile(new URL('./package.json', import.meta.url)))

const internalDependencies = Object.keys(packageInfo.dependencies).filter((pack) =>
  /^@(app|contents|domain|lib)\//.test(pack),
)

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line no-undef
  enabled: process.env.ANALYZE === 'true',
})
const withTM = tm(internalDependencies)
const withVanillaExtract = createVanillaExtractPlugin()

const pluginStack = (config) =>
  [withBundleAnalyzer, withVanillaExtract, withPWA, withTM].reduce((config, plugin) => plugin(config), config)

/** @returns {import('next').NextConfig} */
const nextConfig = (phase) => ({
  experimental: {
    scrollRestoration: true // https://github.com/vercel/next.js/issues/20951
  },
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
    runtimeCaching: cache,
  },
  async headers() {
    if (phase === 'phase-development-server') {
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
        permanent: true,
      },
      {
        source: '/posts/2021-03-16\\+variance',
        destination: '/posts/2021-03-16--variance',
        permanent: true,
      },
      {
        source: '/posts/2021-05-12\\+nominal',
        destination: '/posts/2021-05-12--nominal',
        permanent: true,
      },
      {
        source: '/posts/2022-02-20\\+markdown',
        destination: '/posts/2022-02-20--markdown',
        permanent: true,
      },
    ]
  },
  webpack(config) {
    config.infrastructureLogging = {
      level: 'error',
    }
    return config
  },
})

export default (phase) => pluginStack(nextConfig(phase))
