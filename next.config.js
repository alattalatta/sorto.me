/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const withImages = require('next-images')

module.exports = withImages({
  future: {
    webpack5: true,
  },
  async headers() {
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
