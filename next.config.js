/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const withImages = require('next-images')

module.exports = withImages({
  future: {
    webpack5: true,
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
