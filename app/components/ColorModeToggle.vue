<script setup lang="ts">
const colorMode = useColorMode();

const toggleColorMode = () => {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light';
  } else {
    colorMode.preference = 'dark';
  }
};
</script>

<template>
  <button
    @click="toggleColorMode"
    class="flex items-center gap-2 p-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm"
    aria-label="Toggle Theme"
  >
    <ClientOnly>
      <Icon
        v-if="colorMode.value === 'dark'"
        name="mdi:white-balance-sunny"
        class="text-xl text-yellow-400"
      />
      <Icon
        v-else
        name="mdi:moon-waning-crescent"
        class="text-xl text-gray-600"
      />
      <span class="text-sm font-bold capitalize">{{ colorMode.value }} mode</span>
      <template #fallback>
        <div class="w-5 h-5 bg-gray-200 animate-pulse rounded-full"></div>
      </template>
    </ClientOnly>
  </button>
</template>
