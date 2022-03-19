const defaultCache = require('next-pwa/cache')

module.exports = [
  {
    urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/gh\/orioncactus\/pretendard\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'pretendard-cdn',
      expiration: {
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }
    }
  },
  ...defaultCache
]
