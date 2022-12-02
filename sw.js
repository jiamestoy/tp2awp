const CACHE_NAME = 'app-cache';

self.addEventListener('install', evento => {

    const respCache = caches.open(CACHE_NAME).then( cache => {

        return cache.addAll([
            '/tp2awp',
            'tp2awp/index.html',
            'tp2awp/app.js',
            'tp2awp/icons/icon-72x72.png',
            'tp2awp/icons/icon-96x96.png',
            'tp2awp/icons/icon-128x128.png',
            'tp2awp/icons/icon-144x144.png',
            'tp2awp/icons/icon-152x152.png',
            'tp2awp/icons/icon-192x192.png',
            'tp2awp/icons/icon-384x384.png',
            'tp2awp/icons/icon-512x512.png',
            'tp2awp/manifest.json',
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
            'https://fonts.googleapis.com/icon?family=Material+Icons'
          ])
          
    })

    evento.waitUntil(respCache);   
})

/*
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
})*/

self.addEventListener('fetch', evento => {
    console.log( evento.request );
    const respuestaCache = caches.match(evento.request )
    evento.respondWith(respuestaCache);

})