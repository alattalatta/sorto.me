/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const internalDependencies = Object.keys(require('./package.json').dependencies).filter((package) =>
  package.startsWith('@app/') || package.startsWith('@contents/') || package.startsWith('@lib/'),
)

console.log(internalDependencies)

const withTM = require('next-transpile-modules')(internalDependencies)
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) =>
  withTM({
    inlineImageLimit: false,
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
