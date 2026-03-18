<script setup lang="ts">
useSeoMeta({
  title: "About | Zak's Recipe App",
  description: "Learn more about Zak's Recipe App, a project built with Nuxt 3 to help you discover and share delicious recipes.",
});
</script>

<template>
  <main class="container mx-auto px-4 py-20">
    <section class="max-w-3xl">
      <h1 class="text-4xl lg:text-6xl font-extrabold mb-8 text-balance">
        About Zak's Recipe App
      </h1>
      <div class="space-y-6 text-lg lg:text-xl leading-relaxed">
        <p>
          Welcome to my recipe exploration platform! This application is built with 
          <span class="font-bold text-apple-green">Nuxt 3</span>, 
          <span class="font-bold text-apple-green">Tailwind CSS</span>, and 
          <span class="font-bold text-apple-green">TypeScript</span>.
        </p>
        <p>
          Currently, it fetches data from the DummyJSON API to provide a wide variety of 
          culinary inspirations. I am actively developing this project to include features 
           like custom recipe creation, advanced filtering, and a robust backend.
        </p>
        <p class="pt-4 border-t border-gray-200">
          Created with passion by <span class="font-bold">Isaac Zak Tsienyane</span>.
        </p>
      </div>
    </section>
  </main>
</template>
