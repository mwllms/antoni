<script setup lang="ts">
  const requestPermission = () => {
    if (process.client) {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          console.log('permission granted')
        }
      })
    }
  }
  const sendNotification = async () => {
    const subscription = useState('subscription')
    if (subscription.value) {
      await useFetch('/api/notification', {
        method: 'POST',
        body: {
          subscription: subscription.value,
          payload: 'Hello there!',
          ttl: 5000,
        },
      })
    }
  }
</script>

<template>
  <div>
    <button @click="requestPermission">Request permission</button>
    <button @click="sendNotification">Send Notification</button>
  </div>
</template>
