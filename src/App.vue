<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="cards">
    <CharacterCard
      v-for="character in characters"
      :key="character.name"
      :character="character"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CharacterCard, { Character } from "./components/CharacterCard.vue";
import characterData from "@/assets/characters.json";
console.debug(characterData);
const characters = ref<Character[]>(characterData);
</script>

<style lang="scss">
@import "@/styles/global";
@import "@/styles/theme";

.cards {
  width: min(100%, 800px);
  overflow-x: hidden;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: $gap-m;
}
</style>
