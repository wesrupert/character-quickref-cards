import { type Card, getCards } from "@/model/card";
import { defineStore } from "pinia";
import { ref } from "vue";
import { isEqual } from "lodash-es";

export const STORAGE_KEY = "cards";

export const useStore = defineStore("main", () => {
  const data = getCards(window.localStorage.getItem(STORAGE_KEY));
  console.debug(`loaded ${data.length} cards`);

  const cards = ref<Card[]>(data);

  function addCard(card: Card) {
    cards.value.push(card);
  }

  function removeCard(card: Card) {
    cards.value = cards.value.filter((c) => !isEqual(c, card));
  }

  return {
    cards,
    addCard,
    removeCard,
  };
});
