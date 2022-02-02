/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) =>
  withImages({
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
