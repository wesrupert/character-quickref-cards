<template>
  <div class="cards-view">
    <div class="cards">
      <CharacterCard v-for="card in cards" :key="card.name" :card="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCard from "@/components/CharacterCard.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const { cards } = storeToRefs(useStore());
</script>

<style lang="scss">
@import "@/styles";

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
