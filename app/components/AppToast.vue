<script setup lang="ts">
const { toasts, removeToast } = useToasts();
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto bg-wolf-gray text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-l-4 min-w-[300px]"
        :class="{
          'border-apple-green': toast.type === 'success',
          'border-gold': toast.type === 'info',
          'border-red-500': toast.type === 'error'
        }"
      >
        <Icon 
          v-if="toast.type === 'success'" 
          name="mdi:check-circle" 
          class="text-apple-green text-2xl" 
        />
        <Icon 
          v-else-if="toast.type === 'info'" 
          name="mdi:information" 
          class="text-gold text-2xl" 
        />
        <Icon 
          v-else 
          name="mdi:alert-circle" 
          class="text-red-500 text-2xl" 
        />
        <p class="font-bold flex-1">{{ toast.message }}</p>
        <button 
          @click="removeToast(toast.id)"
          class="hover:text-gray-400 transition-colors"
        >
          <Icon name="mdi:close" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
