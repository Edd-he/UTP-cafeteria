/* eslint-disable no-undef */

self.addEventListener('push', function (event) {
  if (!event.data) return

  let data = {}

  try {
    data = event.data.json()
  } catch (err) {
    console.error('Error parsing push event data:', err)
    return
  }

  const title = data.title || 'Notificación'
  const options = {
    body: data.body || 'Tienes una nueva notificación.',
    icon: '/icon.ico',
    data: data.url || '/',
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  const url = event.notification.data || '/'
  event.waitUntil(clients.openWindow(url))
})
