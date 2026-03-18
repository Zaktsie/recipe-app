<script setup lang="ts">
import { type Recipe } from "../types/types";

const props = defineProps<{
  recipe?: Recipe;
  loading?: boolean;
}>();

const { toggleFavorite, isFavorite } = useFavorites();

const difficultyColor = computed(() => {
  switch (props.recipe?.difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
});
</script>

<template>
  <div v-if="loading" class="flex flex-col shadow rounded-md animate-pulse">
    <div class="h-64 bg-gray-200 rounded-t-md w-full"></div>
    <div class="flex flex-col py-6 px-4 flex-1">
      <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div class="flex gap-4 mb-4 mt-auto">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div class="h-10 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>

  <div v-else-if="recipe" class="flex flex-col shadow rounded-md group relative">
    <!-- Favorite Toggle -->
    <button
      @click.stop="toggleFavorite(recipe)"
      class="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all"
    >
      <Icon
        :name="isFavorite(recipe.id) ? 'mdi:heart' : 'mdi:heart-outline'"
        :class="isFavorite(recipe.id) ? 'text-red-500' : 'text-gray-500'"
        class="text-2xl"
      />
    </button>

    <NuxtLink :to="`/recipes/${recipe.id}`">
      <div class="relative overflow-hidden rounded-t-md">
        <NuxtImg
          :src="recipe.image"
          sizes="xs:100vw sm:50vw lg:400px"
          format="webp"
          densities="x1"
          alt=""
          class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <!-- Difficulty Badge -->
        <div
          :class="difficultyColor"
          class="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-bold shadow-sm"
        >
          {{ recipe.difficulty }}
        </div>
      </div>
    </NuxtLink>

    <div class="flex flex-col py-6 px-4 flex-1">
      <p class="text-xl lg:text-2xl font-semibold mb-2 group-hover:text-apple-green transition-colors">
        {{ recipe.name }}
      </p>
      <div class="font-normal w-full flex gap-8 text-lg mb-4 mt-auto">
        <div class="flex items-center gap-1">
          <Icon name="mdi:clock-time-eight-outline" class="text-dodgeroll-gold-500" />
          <span>{{ recipe.cookTimeMinutes }}m</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="mdi:fire" class="text-dodgeroll-gold-500" />
          <span>{{ recipe.caloriesPerServing }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="mdi:star" class="text-dodgeroll-gold-500" />
          <span>{{ recipe.rating }}</span>
        </div>
      </div>
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        class="px-4 py-2 text-white bg-apple-green rounded-md self-start text-lg font-bold hover:bg-opacity-90 transition-all shadow-md"
      >
        View Recipe
      </NuxtLink>
    </div>
  </div>
</template>
