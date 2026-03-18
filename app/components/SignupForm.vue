<script setup lang="ts">
const email = ref("");
const subscribed = ref(false);

const handleSubscribe = () => {
  if (email.value) {
    subscribed.value = true;
    email.value = "";
  }
};
</script>

<template>
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl lg:text-5xl font-extrabold mb-4">Stay in the loop!</h2>
    <p class="text-lg lg:text-xl mb-8">
      Get the latest recipes and cooking tips straight to your inbox.
    </p>
    <div v-if="!subscribed" class="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-green"
        required
      />
      <button
        @click="handleSubscribe"
        class="bg-apple-green text-white px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all"
      >
        Subscribe
      </button>
    </div>
    <div v-else class="text-apple-green font-bold text-xl">
      Thanks for subscribing! Check your inbox soon.
    </div>
  </div>
</template>
