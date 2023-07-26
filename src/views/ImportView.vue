<template>
  <div class="import">
    <h3>
      Enter json below and hit import, or hit export to export the current
      cards.
    </h3>
    <textarea v-model="input" />
    <div class="button-bar">
      <button @click="onImportButtonClick">Import</button>
      <button @click="onExportButtonClick">Export</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCards } from "@/model/card";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { cards } = storeToRefs(useStore());
const input = ref(JSON.stringify(cards.value, null, 2));

function onImportButtonClick() {
  cards.value = getCards(input.value);
}

function onExportButtonClick() {
  input.value = JSON.stringify(cards.value, null, 2);
}
</script>

<style lang="scss">
@import "@/styles";

.import {
  @include vertical-flex;
}

textarea {
  width: 100%;
  height: min(80%, 400px);
}

.button-bar {
  @include horizontal-flex;
}
</style>
