const CACHE_NAME = 'app-cache';

self.addEventListener('install', evento => {

    const respCache = caches.open(CACHE_NAME).then( cache => {

        return cache.addAll([
            'index.html',
            'app.js',
            'icons/icon-72x72.png',
            'icons/icon-96x96.png',
            'icons/icon-128x128.png',
            'icons/icon-144x144.png',
            'icons/icon-152x152.png',
            'icons/icon-192x192.png',
            'icons/icon-384x384.png',
            'icons/icon-512x512.png',
            'manifest.json',
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
          ])
          
    })

    evento.waitUntil(respCache);   
})

self.addEventListener('fetch', evento => {
    const respuesta = fetch(  evento.request ).then( respNet => { 
        return caches.open( CACHE_NAME ).then( cache => {
            cache.put( evento.request, respNet.clone() );
            return respNet;
        })
    }).catch( error => {
        console.log(error);
        return caches.match( evento.request  );
    })
    evento.respondWith(respuesta);
})