import defaultCache from 'next-pwa/cache.js'

const cache = [
  {
    urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/gh\/orioncactus\/pretendard\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'pretendard-cdn',
      expiration: {
        maxAgeSeconds: 365 * 24 * 60 * 60,
      },
    },
  },
  ...defaultCache,
]

export default cache
