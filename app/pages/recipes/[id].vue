<script setup lang="ts">
import { type Recipe } from "~/types/types";

const { id } = useRoute().params;
const { data: recipe, error } = await useFetch<Recipe>(
  `https://dummyjson.com/recipes/${id}`,
);

if (error.value || !recipe.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Recipe not found",
  });
}

const { toggleFavorite, isFavorite } = useFavorites();

// Tracking completed steps and ingredients
const completedIngredients = ref<string[]>([]);
const completedInstructions = ref<number[]>([]);

const toggleIngredient = (ingredient: string) => {
  const index = completedIngredients.value.indexOf(ingredient);
  if (index === -1) {
    completedIngredients.value.push(ingredient);
  } else {
    completedIngredients.value.splice(index, 1);
  }
};

const toggleInstruction = (index: number) => {
  const i = completedInstructions.value.indexOf(index);
  if (i === -1) {
    completedInstructions.value.push(index);
  } else {
    completedInstructions.value.splice(i, 1);
  }
};

useSeoMeta({
  title: recipe.value.name,
  description: `Learn how to cook ${recipe.value.name} with our easy step-by-step instructions.`,
  ogImage: recipe.value.image,
});
</script>

<template>
  <main v-if="recipe">
    <section class="bg-[#f1f1f1] dark:bg-gray-800/30 py-12 relative overflow-hidden">
      <div class="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center relative z-10">
        <div class="flex-1">
          <NuxtLink to="/" class="text-apple-green font-bold flex items-center gap-2 mb-6 hover:underline">
            <Icon name="mdi:arrow-left" />
            Back to recipes
          </NuxtLink>
          <div class="flex items-center gap-4 mb-4">
            <h1 class="text-4xl lg:text-6xl font-extrabold dark:text-white">{{ recipe.name }}</h1>
            <button
              @click="toggleFavorite(recipe)"
              class="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
              aria-label="Toggle Favorite"
            >
              <Icon
                :name="isFavorite(recipe.id) ? 'mdi:heart' : 'mdi:heart-outline'"
                :class="isFavorite(recipe.id) ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'"
                class="text-3xl"
              />
            </button>
          </div>
          
          <div class="flex flex-wrap gap-4 text-lg lg:text-xl font-medium">
            <div class="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Icon name="mdi:clock-time-eight-outline" class="text-gold" />
              <span class="dark:text-gray-200">Prep: {{ recipe.prepTimeMinutes }}m</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Icon name="mdi:fire" class="text-gold" />
              <span class="dark:text-gray-200">Cook: {{ recipe.cookTimeMinutes }}m</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Icon name="mdi:account-group" class="text-gold" />
              <span class="dark:text-gray-200">Serves: {{ recipe.servings }}</span>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full max-w-md relative group">
          <NuxtImg
            :src="recipe.image"
            sizes="xs:100vw sm:100vw md:500px"
            format="webp"
            densities="x1"
            class="rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            alt=""
          />
          <div class="absolute -bottom-4 -right-4 bg-apple-green text-white px-6 py-2 rounded-lg font-bold shadow-xl">
            {{ recipe.difficulty }}
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <!-- Ingredients with Checkboxes -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm sticky top-8">
            <h2 class="text-3xl font-bold mb-8 flex items-center gap-3 dark:text-white">
              <Icon name="mdi:fridge-outline" class="text-apple-green" />
              Ingredients
            </h2>
            <ul class="space-y-4">
              <li
                v-for="ingredient in recipe.ingredients"
                :key="ingredient"
                @click="toggleIngredient(ingredient)"
                class="flex items-center gap-4 text-lg cursor-pointer group"
              >
                <div 
                  class="w-6 h-6 border-2 rounded flex items-center justify-center transition-colors shrink-0"
                  :class="completedIngredients.includes(ingredient) ? 'bg-apple-green border-apple-green' : 'border-gray-300 dark:border-gray-600 group-hover:border-apple-green'"
                >
                  <Icon v-if="completedIngredients.includes(ingredient)" name="mdi:check" class="text-white text-sm" />
                </div>
                <span 
                  class="dark:text-gray-300"
                  :class="{ 'line-through text-gray-400 dark:text-gray-500': completedIngredients.includes(ingredient) }"
                >
                  {{ ingredient }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Instructions with Step Completion -->
        <div class="lg:col-span-2">
          <h2 class="text-3xl font-bold mb-8 flex items-center gap-3 dark:text-white">
            <Icon name="mdi:chef-hat" class="text-apple-green" />
            Cooking Instructions
          </h2>
          <div class="space-y-8">
            <div
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
              @click="toggleInstruction(index)"
              class="flex gap-6 p-6 rounded-xl transition-all cursor-pointer border border-transparent"
              :class="completedInstructions.includes(index) ? 'bg-green-50/50 dark:bg-green-900/10 grayscale opacity-60' : 'bg-gray-50 dark:bg-gray-800/40 hover:border-gray-200 dark:hover:border-gray-700'"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm transition-colors"
                :class="completedInstructions.includes(index) ? 'bg-apple-green text-white' : 'bg-white dark:bg-gray-700 text-apple-green'"
              >
                {{ index + 1 }}
              </div>
              <div>
                <p class="text-xl leading-relaxed font-medium mb-1 dark:text-white">Step {{ index + 1 }}</p>
                <p 
                  class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed" 
                  :class="{ 'line-through text-gray-400 dark:text-gray-500': completedInstructions.includes(index) }"
                >
                  {{ instruction }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
