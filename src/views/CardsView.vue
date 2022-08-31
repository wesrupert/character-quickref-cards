<template>
  <div class="cards-view">
    <div class="cards">
      <CharacterCard
        v-for="character in characters"
        :key="character.name"
        :character="character"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import characterData from "@/assets/characters.json";
import CharacterCard, { Character } from "@/components/CharacterCard.vue";
import { ref } from "vue";

const characters = ref<Character[]>(characterData);
</script>

<style lang="scss">
@import "@/styles";

.cards-view {
  width: min(100%, 800px);

  overflow-x: hidden;
  overflow-y: auto;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: $gap-m;

  @media print {
    & > *:nth-child(2n) {
      margin-bottom: 240px;
    }
  }
}
</style>
