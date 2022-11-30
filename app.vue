<script setup lang="ts">
  import { getToken, onMessage } from 'firebase/messaging'
  const { $firebaseMessaging } = useNuxtApp()

  onMounted(() => {
    onMessage($firebaseMessaging, (payload) => {
      console.log('Message on client', payload)
    })
  })

  if (process.client) {
    const token = await getToken($firebaseMessaging, {
      vapidKey: 'BDV4FE9CMx--v_5gQRsqMt0L4X9p17FBAsFFwEgaj60VingYcX7aNoAcwBNMTvtYqCUHP86BsOL9sg2Jp1dhILQ',
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          return currentToken
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.')
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        // ...
      })
    console.log(token)
  }
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
