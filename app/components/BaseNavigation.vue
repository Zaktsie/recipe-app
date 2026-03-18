<template>
  <header class="py-4 border-b">
    <nav class="flex container items-center">
      <NuxtLink to="/" class="flex gap-1 items-center">
        <NuxtImg
          width="56"
          height="56"
          densities="x1 x2"
          src="/icon-green.png"
          alt="Green logo"
          format="webp"
        />
        <span class="text-3xl font-bold">Recipe app</span>
      </NuxtLink>
      <ul class="flex gap-5 ml-auto text-xl font-bold capitalize">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>
          <NuxtLink to="/about">about</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
