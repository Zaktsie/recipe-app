<script setup lang="ts">
import { type Recipe, type RecipeResponse } from "~/types/types";

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

// 1. Dynamic Servings Scaler
const currentServings = ref(recipe.value.servings);

const scaleIngredient = (ingredient: string) => {
  const ratio = currentServings.value / recipe.value!.servings;
  // Regex to find numbers or fractions at the start of strings
  return ingredient.replace(/^(\d+(\.\d+)?|\d+\/\d+)/, (match) => {
    let num: number;
    if (match.includes('/')) {
      const [a, b] = match.split('/');
      num = parseInt(a) / parseInt(b);
    } else {
      num = parseFloat(match);
    }
    const scaled = num * ratio;
    // Format to 2 decimal places if not whole number
    return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
  });
};

// 2. Related Recipes
// We fetch recipes by the first tag of the current recipe
const { data: relatedData } = await useFetch<RecipeResponse>(
  `https://dummyjson.com/recipes/tag/${recipe.value.tags[0]}?limit=4`
);
const relatedRecipes = computed(() => 
  relatedData.value?.recipes.filter(r => r.id !== recipe.value!.id).slice(0, 3) || []
);

// 3. Nutritional Logic (Simulated since API doesn't provide full profile, but we can visualize what it has)
const nutrition = computed(() => [
  { label: 'Calories', value: recipe.value!.caloriesPerServing, unit: 'kcal', max: 800, color: 'bg-apple-green' },
  { label: 'Rating', value: recipe.value!.rating, unit: '/ 5', max: 5, color: 'bg-gold' },
  { label: 'Review Count', value: recipe.value!.reviewCount, unit: '', max: 100, color: 'bg-wolf-gray' },
]);

// Progress tracking
const completedIngredients = ref<string[]>([]);
const completedInstructions = ref<number[]>([]);

const toggleIngredient = (ingredient: string) => {
  const index = completedIngredients.value.indexOf(ingredient);
  if (index === -1) completedIngredients.value.push(ingredient);
  else completedIngredients.value.splice(index, 1);
};

const toggleInstruction = (index: number) => {
  const i = completedInstructions.value.indexOf(index);
  if (i === -1) completedInstructions.value.push(index);
  else completedInstructions.value.splice(i, 1);
};

useSeoMeta({
  title: `${recipe.value.name} | Zak's Recipe App`,
  description: `Learn how to cook ${recipe.value.name} with our easy step-by-step instructions.`,
  ogImage: recipe.value.image,
});
</script>

<template>
  <main v-if="recipe">
    <section class="bg-[#f1f1f1] py-12">
      <div class="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
        <div class="flex-1">
          <NuxtLink to="/" class="text-apple-green font-bold flex items-center gap-2 mb-6 hover:underline">
            <Icon name="mdi:arrow-left" />
            Back to recipes
          </NuxtLink>
          <div class="flex items-center gap-4 mb-4">
            <h1 class="text-4xl lg:text-6xl font-extrabold">{{ recipe.name }}</h1>
            <button
              @click="toggleFavorite(recipe)"
              class="p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <Icon
                :name="isFavorite(recipe.id) ? 'mdi:heart' : 'mdi:heart-outline'"
                :class="isFavorite(recipe.id) ? 'text-red-500' : 'text-gray-500'"
                class="text-3xl"
              />
            </button>
          </div>
          
          <div class="flex flex-wrap gap-4 text-lg font-medium">
            <div class="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
              <Icon name="mdi:clock-outline" class="text-gold" />
              <span>Prep: {{ recipe.prepTimeMinutes }}m</span>
            </div>
            <div class="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
              <Icon name="mdi:fire" class="text-gold" />
              <span>Cook: {{ recipe.cookTimeMinutes }}m</span>
            </div>
            <!-- Servings Scaler UI -->
            <div class="flex items-center gap-3 px-3 py-1 bg-white rounded-full shadow-sm">
              <Icon name="mdi:account-group" class="text-gold" />
              <span>Servings:</span>
              <div class="flex items-center gap-2">
                <button @click="if(currentServings > 1) currentServings--" class="hover:text-apple-green font-bold text-xl">-</button>
                <span class="w-4 text-center">{{ currentServings }}</span>
                <button @click="currentServings++" class="hover:text-apple-green font-bold text-xl">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full max-w-md relative">
          <NuxtImg
            :src="recipe.image"
            sizes="xs:100vw sm:100vw md:500px"
            format="webp"
            class="rounded-lg shadow-2xl"
            alt=""
          />
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div class="lg:col-span-1 space-y-8">
          <!-- Ingredients -->
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
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
                  class="w-6 h-6 border-2 rounded flex items-center justify-center transition-colors"
                  :class="completedIngredients.includes(ingredient) ? 'bg-apple-green border-apple-green' : 'border-gray-300'"
                >
                  <Icon v-if="completedIngredients.includes(ingredient)" name="mdi:check" class="text-white text-sm" />
                </div>
                <span :class="{ 'line-through text-gray-400': completedIngredients.includes(ingredient) }">
                  {{ scaleIngredient(ingredient) }}
                </span>
              </li>
            </ul>
          </div>

          <!-- 3. Nutritional Facts Visualization -->
          <div class="bg-wolf-gray text-white p-8 rounded-2xl shadow-xl">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="mdi:chart-bar" class="text-gold" />
              Nutritional Facts
            </h2>
            <div class="space-y-6">
              <div v-for="item in nutrition" :key="item.label" class="space-y-2">
                <div class="flex justify-between text-sm font-bold">
                  <span>{{ item.label }}</span>
                  <span class="text-gray-400">{{ item.value }}{{ item.unit }}</span>
                </div>
                <div class="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    class="h-full transition-all duration-500" 
                    :class="item.color"
                    :style="{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }"
                  ></div>
                </div>
              </div>
              <p class="text-xs text-gray-400 italic pt-4 border-t border-gray-700">
                * Nutritional values are estimates per serving.
              </p>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="lg:col-span-2 space-y-16">
          <div>
            <h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
              <Icon name="mdi:chef-hat" class="text-apple-green" />
              Instructions
            </h2>
            <div class="space-y-8">
              <div
                v-for="(instruction, index) in recipe.instructions"
                :key="index"
                @click="toggleInstruction(index)"
                class="flex gap-6 p-6 rounded-xl transition-all cursor-pointer"
                :class="completedInstructions.includes(index) ? 'bg-green-50 grayscale opacity-60' : 'bg-gray-50 hover:bg-gray-100'"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm"
                  :class="completedInstructions.includes(index) ? 'bg-apple-green text-white' : 'bg-white text-apple-green'"
                >
                  {{ index + 1 }}
                </div>
                <p class="text-lg leading-relaxed" :class="{ 'line-through': completedInstructions.includes(index) }">
                  {{ instruction }}
                </p>
              </div>
            </div>
          </div>

          <!-- 2. You Might Also Like -->
          <div v-if="relatedRecipes.length > 0">
            <h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
              <Icon name="mdi:sparkles" class="text-gold" />
              You Might Also Like
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NuxtLink 
                v-for="related in relatedRecipes" 
                :key="related.id" 
                :to="`/recipes/${related.id}`"
                class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <NuxtImg :src="related.image" class="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                <div class="p-4">
                  <p class="font-bold truncate group-hover:text-apple-green">{{ related.name }}</p>
                  <div class="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Icon name="mdi:star" class="text-gold" />
                    <span>{{ related.rating }}</span>
                    <span>•</span>
                    <span>{{ related.difficulty }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
