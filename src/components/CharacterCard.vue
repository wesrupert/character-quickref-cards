<template>
  <div
    ref="root"
    class="character-card"
    :style="{
      'font-size': width < 800 ? `${(16 * width) / 800}px` : '16px',
    }"
  >
    <div
      v-if="props.card.portrait"
      class="portrait"
      :class="{ fullscreen: props.card.useFullscreenPortrait }"
      :style="{
        'background-image': `url(${props.card.portrait})`,
      }"
    />
    <div v-else class="portrait quote">
      <span v-if="props.card.quote">“{{ props.card.quote }}”</span>
    </div>
    <div class="details">
      <div class="title">
        <h1 class="name">{{ props.card.name }}</h1>
        <div v-if="props.card.subtitle || props.card.title" class="subtitle">
          <h2 v-if="props.card.title">{{ props.card.title }}</h2>
          <h3 v-if="props.card.subtitle">
            {{ props.card.subtitle }}
          </h3>
        </div>
      </div>
      <div class="blurbs-wrapper">
        <div class="blurbs">
          <p v-for="block in props.card.notes" :key="block.text">
            <span v-if="block.header" class="header">{{ block.header }}</span>
            <span>{{ block.text }}</span>
          </p>
        </div>
      </div>
      <div v-if="props.card.portrait && props.card.quote" class="quote">
        “{{ props.card.quote }}”
      </div>
      <div v-if="props.card.status" class="status">
        <StatusBox
          v-for="status in props.card.status"
          :key="status.title"
          v-bind="status"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementLayout } from "@/composables/resize";
import { Card } from "@/model/card";
import { ref } from "vue";
import StatusBox from "./StatusBox.vue";

const root = ref<HTMLElement | null>(null);

const props = defineProps<{ card: Card }>();

const { width } = useElementLayout(root);
</script>

<style scoped lang="scss">
@import "@/styles";

h1,
h2,
h3,
h4,
h5,
h6 {
  color: $card-fg-color;
}

.character-card {
  @include rounded-card;
  @include paper-corners;
  aspect-ratio: 16/8;

  display: flex;
  align-items: stretch;
  justify-content: stretch;
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
  font-weight: bold;
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
  margin-bottom: $gap-s;
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
  justify-content: space-evenly;

  overflow-y: auto;
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
  align-items: stretch;
  justify-content: start;
  gap: $gap-l;
}
</style>
