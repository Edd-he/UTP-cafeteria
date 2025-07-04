/* eslint-disable no-undef */

self.addEventListener('push', function (event) {
  if (!event.data) return

  let data = {}

  try {
    data = event.data.json()
  } catch (err) {
    console.error('Error parsing push event data:', err)
    data = {
      title: 'Notificación',
      body: event.data.text(),
    }
  }

  const title = data.title || 'Notificación'
  const options = {
    body: data.body || 'Tienes una nueva notificación.',
    icon: '/icon.ico',
    data: data.url || '/',
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
