<template>
  <div class="landing">
    <div class="header">
      <h1 class="title">Character Quick-ref Cards</h1>
      <h2 class="subtitle">
        Character notes: on-hand, customized, flexible, printable!
      </h2>
    </div>
    <div class="sample-card">
      <CharacterCard
        class="sample"
        :style="{ width: `${width}%` }"
        :character="sampleCharacter"
      />
    </div>
    <div class="inputs">
      <label
        >Resize me!
        <input type="range" min="66" max="95" v-model="width" />
      </label>
      <div class="checkboxes">
        Show the:
        <label>quote? <input type="checkbox" v-model="quote" /></label>
        <label>portrait? <input type="checkbox" v-model="portrait" /></label>
        <label>title? <input type="checkbox" v-model="title" /></label>
        <label>subtitle? <input type="checkbox" v-model="subtitle" /></label>
      </div>
      <div class="checkboxes">
        <label
          >Paragraphs galore!
          <input
            type="range"
            min="0"
            :max="sample.notes.length - 1"
            v-model="notes"
          />
        </label>
        <label
          >...too many?
          <input type="checkbox" :disabled="loremDisabled" v-model="lorem"
        /></label>
      </div>
      <label
        >And boxes too!
        <input
          type="range"
          min="0"
          :max="sample.status.length"
          v-model="status"
        />
      </label>
    </div>
    <div class="button-bar">
      <button @click="onGetStartedClick">Get started</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCard, { Character } from "@/components/CharacterCard.vue";
import { Routes } from "@/router";
import { computed } from "@vue/reactivity";
import { ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";

const sample: Required<Character> = {
  name: "Hally Wyrld",
  portrait: "sample-portrait.png",
  useFullscreenPortrait: false,
  title: "Professional example-maker",
  subtitle: "Human Title-carder",
  quote: "Flash cards are *literally* my life",
  notes: [
    {
      header: "Whatever you need! ",
      text: "It's all yours to customize. Quick notes at a glance, quick glances at your notes! The possibilities are endless! Well, as endless as can fit on a notecard.",
    },
    {
      header: "However you like! ",
      text: "Just want the notes? Skip the quotes! Need more space? Drop the portrait!",
    },
    {
      header: "Whatever the content! ",
      text: "works for NPCs, players, even settings!",
    },
    {
      text: "It's all down to what you want to add, and how you want to use them! Click below and get started, or import characters to get set up quickly! They're your notes, they should work for you.",
    },
    {
      header: "Lorem ipsum dolor sit amet",
      text: ", consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor consequat id porta nibh venenatis cras. Leo duis ut diam quam nulla porttitor massa id. Turpis egestas integer eget aliquet. Euismod nisi porta lorem mollis aliquam ut porttitor leo a. A diam sollicitudin tempor id eu nisl. Enim ut sem viverra aliquet eget. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Nisi est sit amet facilisis. Et magnis dis parturient montes. Sed enim ut sem viverra aliquet eget sit amet tellus. Purus viverra accumsan in nisl nisi. Turpis egestas sed tempus urna et pharetra pharetra massa. Nibh venenatis cras sed felis eget velit aliquet. Pellentesque habitant morbi tristique senectus et netus. Integer vitae justo eget magna fermentum iaculis eu non.",
    },
  ],
  status: [
    { title: "Boxes" },
    { title: "More boxes", options: "With hints!" },
    {
      title: "And even wide boxes!",
      wide: true,
      options: "Woah, so much space!",
    },
    { title: "So many boxes!" },
  ],
};

const router = useRouter();

const width = ref(100);
const portrait = ref(true);
const title = ref(true);
const subtitle = ref(true);
const quote = ref(true);
const lorem = ref(false);
const notes = ref(sample.notes.length - 1);
const status = ref(sample.status.length);

const loremDisabled = computed(() => notes.value < sample.notes.length - 1);

watch(loremDisabled, () => {
  if (loremDisabled.value) {
    lorem.value = false;
  }
});

const sampleCharacter = computed<Character>(() => ({
  name: sample.name,
  portrait: portrait.value ? sample.portrait : undefined,
  title: title.value ? sample.title : undefined,
  subtitle: subtitle.value ? sample.subtitle : undefined,
  quote: quote.value ? sample.quote : undefined,
  useFullscreenPortrait: portrait.value
    ? sample.useFullscreenPortrait
    : undefined,
  notes: sample.notes.slice(0, lorem.value ? notes.value + 1 : notes.value),
  status: sample.status.slice(0, status.value),
}));

function onGetStartedClick() {
  router.push(Routes.cards);
}
</script>

<style scoped lang="scss">
@import "@/styles";

.landing {
  @include vertical-flex(space-between);
}

h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
}

button {
  @include rounded-card;
  border-radius: 4 * $border-width;
}

label {
  @include horizontal-flex;
}

.sample-card {
  @include vertical-flex;
  align-self: stretch;
  flex: 1;
}

.inputs {
  @include vertical-flex;
}

.checkboxes {
  @include horizontal-flex;

  & > label {
    padding: 0 $gap-s;
    border: $border-card {
      style: dotted;
      radius: $border-radius-m;
    }
  }
}

.button-bar {
  @include horizontal-flex;
  margin: $gap-l;
}
</style>
