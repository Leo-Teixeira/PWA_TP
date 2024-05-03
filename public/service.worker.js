/**
 * Utilisation de Workbox pour simplifier la configuration du Service Worker.
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Activation des logs de débogage en développement
workbox.setConfig({
  debug: true
});

// Précachage des ressources statiques lors de l'installation du Service Worker
workbox.precaching.precacheAndRoute([
  {url: '/index.html', revision: '1'},
  {url: '/styles/main.css', revision: '1'},
  {url: '/scripts/main.js', revision: '1'},
  {url: '/images/logo.png', revision: '1'}
]);

// Utilisation de la stratégie NetworkFirst pour la page d'accueil pour une mise à jour plus dynamique sans rechargement forcé
workbox.routing.registerRoute(
  new RegExp('/index.html'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache pour une semaine
      }),
    ],
  }),
);

// Utilisation de StaleWhileRevalidate pour les ressources CSS, JS, et images pour un chargement rapide avec mise à jour en arrière-plan
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|css|js)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache pour un mois
      }),
    ],
  }),
);

// Stratégie NetworkOnly pour les requêtes API pour garantir des données toujours à jour
workbox.routing.registerRoute(
  new RegExp('/api/'),
  new workbox.strategies.NetworkOnly(),
  'GET'
);

// Lors de l'activation, nettoyer les anciennes caches si nécessaire
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Vous pouvez ajouter une logique pour nettoyer les anciennes versions des caches si nécessaire
        })
      );
    })
  );
});
