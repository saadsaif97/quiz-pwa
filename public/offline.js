// if we cache our service worker then new one will not be updated

// we can change the version to trigger install event
const staticCacheName = 'static-shell-v1'
const dynamicCacheName = 'dynamic-assets-v1'
const staticAssets = ['./']

// limit dynamic cache items so that we donot cause burden
// if limit exceeds, then delete oldest one from cache
// call this function after every fetch request
const limitCacheItems = (name, number) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > number) {
        cache.delete(keys[0]).then(limitCacheItems(name, number))
      }
    })
  })
}

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        cache.addAll(staticAssets)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (evt) => {
  //   console.log('Activate', evt)
  evt.waitUntill(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      )
    })
  )
})

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone())
              limitCacheItems(dynamicCacheName, 15)
              return fetchRes
            })
          })
        )
      })
      // we can also conditionally send the fallback page depending upon fetch request
      .catch(() => caches.match('/fallback.html'))
  )
})
