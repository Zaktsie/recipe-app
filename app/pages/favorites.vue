<script setup lang="ts">
const { favorites } = useFavorites();

useSeoMeta({
  title: "My Favorite Recipes | Zak's Recipe App",
  description: "Your personal collection of saved recipes ready to cook anytime.",
});
</script>

<template>
  <main class="container mx-auto px-4 py-16 min-h-[60vh]">
    <div class="mb-12">
      <h1 class="text-4xl lg:text-6xl font-extrabold mb-4">My Favorites</h1>
      <p class="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
        You have {{ favorites.length }} saved recipes.
      </p>
    </div>

    <!-- Empty State -->
    <div v-if="favorites.length === 0" class="text-center py-20 bg-gray-50 dark:bg-wolf-gray/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
      <Icon name="mdi:heart-outline" class="text-6xl text-gray-300 dark:text-gray-700 mb-6" />
      <h2 class="text-2xl font-bold mb-4">No favorites yet!</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Start browsing recipes and click the heart icon to save them to your personal collection.
      </p>
      <NuxtLink
        to="/"
        class="bg-apple-green text-white px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all inline-block"
      >
        Explore Recipes
      </NuxtLink>
    </div>

    <!-- Results Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
    >
      <RecipeCard v-for="recipe in favorites" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>
</template>
