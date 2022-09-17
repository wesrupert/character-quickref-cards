import { Card } from "@/model/card";
import { defineStore } from "pinia";
import { ref } from "vue";
import _ from "lodash";

export const STORAGE_KEY = "cards";

export const useStore = defineStore("main", () => {
  const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  console.debug(`loaded ${data.length} cards`);

  const cards = ref<Card[]>(data);

  function addCard(card: Card) {
    cards.value.push(card);
  }

  function removeCard(card: Card) {
    cards.value = cards.value.filter((c) => !_.isEqual(c, card));
  }

  return {
    cards,
    addCard,
    removeCard,
  };
});
