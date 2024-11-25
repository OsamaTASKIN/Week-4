var cacheName = 'AfterSchool-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanifest',
    "images/math.png",
    "images/music-1.png",
    "images/swim-2.png",
    "images/swimming.png",
]

self.addEventListener('install' , (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching All the files');
            return cache.addAll(cacheFiles);
        })
    )
})

// self.addEventListener('fetch', function(e){
//     e.respondWith(
//         caches.match(e.reques).then(function (r){
//             console.log('[Service Worker] Fetching resource:'+ e.request.url);

//             return r
//         })
//     )
// })

self.addEventListener('fetch' , function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request , response.clone());
                    return response;
                });
            });
        })
    );
});