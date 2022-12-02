navigator.serviceWorker.register('sw.js')

navigator.serviceWorker.ready
  .then((registration) => {
    return registration.pushManager.getSubscription().then(async (subscription) => {
      if (subscription) {
        return subscription
      }
      const vapidKey = await $fetch('/api/vapid')
      const convertedVapidKey = urlBase64ToUint8Array(vapidKey)

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      })
    })
  })
  .then(async (subscription) => {
    // send subscriptions details to server
    const register = await $fetch('/api/register', {
      method: 'POST',
      body: {
        subscription,
      },
    })
    useState('subscription', () => register)
  })

function urlBase64ToUint8Array(base64String: any) {
  var padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
export default defineNuxtPlugin((NuxtApp) => {
  //
})
