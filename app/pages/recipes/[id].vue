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

useSeoMeta({
  title: recipe.value.name,
  description: `Learn how to cook ${recipe.value.name} with our easy step-by-step instructions.`,
  ogImage: recipe.value.image,
});
</script>

<template>
  <main v-if="recipe">
    <section class="bg-[#f1f1f1] py-12">
      <div class="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
        <div class="flex-1">
          <NuxtLink to="/" class="text-apple-green font-bold flex items-center gap-2 mb-6">
            <Icon name="mdi:arrow-left" />
            Back to recipes
          </NuxtLink>
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-4">{{ recipe.name }}</h1>
          <div class="flex flex-wrap gap-4 text-lg lg:text-xl font-medium">
            <div class="flex items-center gap-2">
              <Icon name="mdi:clock-time-eight-outline" class="text-gold" />
              <span>Prep: {{ recipe.prepTimeMinutes }}m</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:fire" class="text-gold" />
              <span>Cook: {{ recipe.cookTimeMinutes }}m</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:account-group" class="text-gold" />
              <span>Serves: {{ recipe.servings }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:star" class="text-gold" />
              <span>{{ recipe.rating }} ({{ recipe.reviewCount }})</span>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full max-w-md">
          <NuxtImg
            :src="recipe.image"
            sizes="xs:100vw sm:100vw md:500px"
            format="webp"
            densities="x1"
            class="rounded-lg shadow-xl"
            alt=""
          />
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-bold mb-6">Ingredients</h2>
          <ul class="space-y-3">
            <li
              v-for="ingredient in recipe.ingredients"
              :key="ingredient"
              class="flex items-start gap-3 text-lg"
            >
              <Icon name="mdi:check-circle" class="text-apple-green mt-1 shrink-0" />
              <span>{{ ingredient }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-3xl font-bold mb-6">Instructions</h2>
          <ol class="space-y-6">
            <li
              v-for="(instruction, index) in recipe.instructions"
              :key="instruction"
              class="flex gap-4"
            >
              <div
                class="bg-apple-green text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
              >
                {{ index + 1 }}
              </div>
              <p class="text-lg leading-relaxed">{{ instruction }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </main>
</template>
