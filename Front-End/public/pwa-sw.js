// const cacheData = 'JailCommissary-Static';
// const dynamicData = 'jailCommissary-Dynamic';

// // add files to cache memory so that we can use them in offline mode
// self.addEventListener('install', e => {
//   e.waitUntil(
//     (async () => {
//       const cache = await caches.open(cacheData);
//       //   await cache.addAll([
//       //     '/static/js/main.chunk.js',
//       //     '/static/js/0.chunk.js',
//       //     '/static/js/bundle.js',
//       //     '/static/js/3.chunk.js',
//       //     '/static/js/1.chunk.js',
//       //     '/static/js/10.chunk.js',
//       //     '/index.html',
//       //     '/',
//       //     '/login',
//       //     '/static/js/vendors~main.chunk.js',
//       //     '/images/top-logo.svg',
//       //     '/images/left-auth-image.svg',
//       //     '/images/jail.logo.svg',
//       //     '/forgot-password',
//       //     '/static/js/9.chunk.js',
//       //     '/images/forgot-password-logo.svg',
//       //     '/manifest.json',
//       //     '/images/shutterstock_1133982038-1_192.png',
//       //     '/static/css/8.74e12705.chunk.css',
//       //     '/static/css/main.f4039512.chunk.css',
//       //     '/static/js/8.fe897f0b.chunk.js',
//       //     '/static/js/main.bcf94194.chunk.js',
//       //     '/static/js/0.e2c58f2d.chunk.js',
//       //     '/static/js/1.5d470210.chunk.js',
//       //     '/static/js/4.9e9f39a1.chunk.js',
//       //     '/static/js/12.4eb8aa89.chunk.js',
//       //     '/static/js/16.9e2c1c31.chunk.js',
//       //     '/offline.html',
//       //   ]);
//     })()
//   );
// });

// // below code is used for offline mode
// self.addEventListener('fetch', e => {
//   if (!navigator.onLine) {
//     // the above condition will fetch the data from the cache if we are offline overwise will call api and get data from server
//     e.respondWith(
//       (async () => {
//         const r = await caches.match(e.request);
//         if (r) {
//           return r;
//         } else {
//           console.log('e', e.request.url);
//           const offline = await caches.match('/offline.html');
//           return offline;
//         }
//         // else {
//         //   // this below code is for dynamic caching
//         //   const fetchres = await fetch(e.request);
//         //   const cache = await caches.open(dynamicData);
//         //   await cache.put(e.request.url, fetchres.clone());
//         //   return fetchres;
//         // }
//       })()
//     );
//   }
// });
