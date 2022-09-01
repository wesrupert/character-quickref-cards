import { Card } from "@/model/card";
import { defineStore } from "pinia";
import { ref } from "vue";
import characterData from "@/assets/characters.json";

export const useStore = defineStore("main", () => {
  const cards = ref<Card[]>(characterData);

  return {
    cards,
  };
});
