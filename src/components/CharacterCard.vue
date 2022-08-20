<template>
  <div class="character-card">
    <div
      v-if="props.character.portrait"
      class="portrait"
      :class="{ fullscreen: props.character.useFullscreenPortrait }"
      :style="{
        'background-image': `url(${props.character.portrait})`,
      }"
    />
    <div v-else class="portrait quote">
      <span v-if="props.character.quote">“{{ props.character.quote }}”</span>
    </div>
    <div class="details">
      <div class="title">
        <h1 class="name">{{ props.character.name }}</h1>
        <div
          v-if="props.character.physiology || props.character.role"
          class="subtitle"
        >
          <h2 v-if="props.character.role">{{ props.character.role }}</h2>
          <h3 v-if="props.character.physiology">
            {{ props.character.physiology }}
          </h3>
        </div>
      </div>
      <div class="blurbs-wrapper">
        <div class="blurbs">
          <p v-for="block in props.character.personality" :key="block.text">
            <span v-if="block.header" class="header">{{ block.header }}</span>
            <span>{{ block.text }}</span>
          </p>
        </div>
      </div>
      <div
        v-if="props.character.portrait && props.character.quote"
        class="quote"
      >
        “{{ props.character.quote }}”
      </div>
      <div v-if="props.character.status" class="status">
        <StatusBox
          v-for="status in props.character.status"
          :key="status.title"
          v-bind="status"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBox from "./StatusBox.vue";
export interface Character {
  name: string;
  portrait?: string;
  useFullscreenPortrait?: boolean;

  physiology?: string;
  role?: string;

  personality?: { header?: string; text: string }[];
  quote?: string;

  status?: { title: string; options?: string; wide?: boolean }[];
  health?: string;
  amity?: string;
  emotion?: string;
  behavior?: string;
}

const props = defineProps<{ character: Character }>();
</script>

<style scoped lang="scss">
@import "@/styles/theme";

.character-card {
  @include rounded-card;
  @include paper-corners;
  aspect-ratio: 16/8;

  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

h1,
h2,
h3 {
  font-family: $font-script;
  font-weight: normal;
  margin: 0;
}

h1 {
  font-size: $font-l;
}

h2 {
  font-weight: bold;
  font-size: $font-m;
}

h3 {
  font-size: $font-s;
}

p {
  font-size: $font-s;
  font-weight: normal;
  text-align: left;
  margin: $gap-s 0;
}

.portrait {
  padding: $gap-m;
  flex: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  background-origin: content-box;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-top-left-radius: $border-radius-s;
  border-bottom-left-radius: $border-radius-s;
  border-right: $border-card {
    style: dotted;
  }

  &.fullscreen {
    background-size: cover;
    padding: 0;
  }
}

.details {
  padding: $gap-m;
  flex: 3;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

.title {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.name {
  flex: max-content;
  text-align: left;
}

.subtitle {
  align-self: center;
  text-align: right;
}

.blurbs-wrapper {
  position: relative;
  flex: 1;
}

.blurbs {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  overflow-y: scroll;
}

.header {
  font-family: $font-serif;
  font-size: $font-m;
  font-weight: bold;
}

.quote {
  font-family: $font-script;
  font-size: $font-m;
  font-style: italic;
  text-align: left;
  padding-bottom: $gap-m;
}

.status {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: $gap-l;
}
</style>
