<script setup lang="ts">
import { type RecipeResponse } from "~/types/types";

const searchQuery = ref("");
const selectedTag = ref("");

// Fetch tags for filtering
const { data: tagsData } = await useFetch<string[]>("https://dummyjson.com/recipes/tags");

// Construct URL based on search or tag selection
const url = computed(() => {
  if (selectedTag.value) {
    return `https://dummyjson.com/recipes/tag/${selectedTag.value}`;
  }
  if (searchQuery.value) {
    return `https://dummyjson.com/recipes/search?q=${searchQuery.value}`;
  }
  return "https://dummyjson.com/recipes?limit=12";
});

const { data, error, status } = await useFetch<RecipeResponse>(url, {
  watch: [url],
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedTag.value = "";
};

useSeoMeta({
  title: "Zak's Recipe App | Discover Delicious Recipes",
  description: "Browse our collection of hundreds of recipes and find your next favorite meal.",
});
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-[#f1f1f1]">
      <div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance leading-tight">
            Master the Kitchen with Ease: Unleash Your Inner Chef!
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-balance">
            Explore thousands of easy-to-follow recipes today.
          </p>
          <NuxtLink
            to="#recipes"
            class="px-8 py-3 text-white bg-apple-green rounded-md text-xl font-bold hover:bg-opacity-90 transition-all"
          >
            Browse Recipes
          </NuxtLink>
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <NuxtImg
            sizes="xs:100vw sm:667px"
            src="/hero.png"
            format="webp"
            densities="x1"
            alt="Hero image"
            class="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>

    <!-- Filter & Search Section -->
    <section id="recipes" class="py-12 container border-b">
      <div class="flex flex-col md:flex-row gap-6 items-end justify-between">
        <div class="w-full md:max-w-md">
          <label class="block text-lg font-bold mb-2">Search Recipes</label>
          <div class="relative">
            <input
              v-model.lazy="searchQuery"
              type="text"
              placeholder="e.g. Pasta, Pizza..."
              class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-apple-green focus:outline-none pl-10"
            />
            <Icon name="mdi:magnify" class="absolute left-3 top-4 text-gray-400 text-xl" />
          </div>
        </div>

        <div class="w-full md:max-w-xs">
          <label class="block text-lg font-bold mb-2">Filter by Category</label>
          <select
            v-model="selectedTag"
            class="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-apple-green focus:outline-none bg-white"
          >
            <option value="">All Categories</option>
            <option v-for="tag in tagsData" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
        </div>

        <button
          v-if="searchQuery || selectedTag"
          @click="resetFilters"
          class="text-apple-green font-bold text-lg hover:underline mb-3"
        >
          Clear Filters
        </button>
      </div>
    </section>

    <!-- Results Section -->
    <section class="py-20 container">
      <div class="mb-12">
        <h2 class="text-3xl lg:text-5xl font-extrabold mb-2">
          {{ selectedTag ? `${selectedTag} Recipes` : searchQuery ? `Results for "${searchQuery}"` : "Our Most Popular Recipes" }}
        </h2>
        <p class="text-lg lg:text-xl text-gray-600">
          Showing {{ data?.recipes?.length || 0 }} recipes
        </p>
      </div>

      <div v-if="status === 'pending'" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-apple-green"></div>
      </div>

      <div
        v-else-if="!error && data?.recipes?.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
      >
        <RecipeCard v-for="recipe in data?.recipes" :key="recipe.id" :recipe="recipe" />
      </div>

      <div v-else-if="!error && !data?.recipes?.length" class="text-center py-20">
        <p class="text-2xl font-bold mb-4">No recipes found.</p>
        <p class="text-lg text-gray-600 mb-8">Try adjusting your search or filters.</p>
        <button
          @click="resetFilters"
          class="bg-apple-green text-white px-8 py-3 rounded-md font-bold"
        >
          Reset All Filters
        </button>
      </div>

      <p v-else class="text-xl text-red-500 text-center py-20">
        Oops, something went wrong. Please try again later.
      </p>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-[#f1f1f1] py-20">
      <SignupForm />
    </section>
  </main>
</template>
