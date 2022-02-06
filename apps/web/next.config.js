/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['@app/mdx', '@app/ui'])
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) =>
  withTM(
    withImages({
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
    }),
  )
