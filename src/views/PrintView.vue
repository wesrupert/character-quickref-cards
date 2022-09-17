<template>
  <div class="print-view">
    <CharacterCard v-for="card in cards" :key="card.name" :card="card" />
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

.print-view {
  display: flex;
  flex-direction: column;
  gap: $gap-m;

  padding: $gap-m {
    bottom: 0;
  }

  @media print {
    max-width: unset !important;
    background: white;

    & > *:nth-child(2n) {
      margin-bottom: 240px;
    }
  }
}
</style>
