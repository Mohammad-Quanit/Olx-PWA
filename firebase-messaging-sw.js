var dataCacheName = 'dynamic-cache-v2';
var cacheName = 'static-cache-v2';
let assets = [
  './',
  './index.html',
  './chats.html',
  './favourites.html',
  './posting.html',
  './results.html',
  './style.css',
  './app.js',
  './style.js',
  './favourite.js',
  './images/dummy.png'
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(assets);
    }).catch(err => console.error(err))
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      })
      );
    })
  )
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
     caches.open(dataCacheName).then(cache => {
     return  fetch(e.request).then(responce => {
        cache.put(e.request.url , responce.clone());
        return responce
      }).catch(err => {
        return caches.match(e.request)
      })
    })
  );
});


//*******************meassagin work *****************************/
console.log('... Service Messaging Worker File Running ...');

// Listner for Push Notification
self.addEventListener('push', function (event) {
  console.log('Received a push message', event);
  var notification = event.data.json().notification
  var title = notification.title;
  var body = notification.body;
  var url = notification.click_action;
  var icon = notification.icon

  console.log(notification);
  console.log(title);
  console.log(body);
  console.log(url);
  console.log(icon);

  event.waitUntil(
    self.registration.showNotification(title, {
      title: title,
      body: body,
      icon: icon,
      data: url
    })
  );
});

// on Notification Click do whatever you want...
self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification);
  event.notification.close();
  clients.openWindow(event.notification.data);
});



