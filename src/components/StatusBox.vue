<template>
  <div class="status-box" :class="{ wide: props.wide }">
    <div class="title">
      {{ props.title }}
    </div>
    <input type="text" />
    <input class="default-value" type="text" :value="props.options" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  options?: string;
  wide?: boolean;
}>();
</script>

<style scoped lang="scss">
@import "@/styles/theme";

.status-box {
  position: relative;

  @include rounded-card;
  max-height: 6em;
  aspect-ratio: 1/1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.wide {
    aspect-ratio: 2/1;
  }
}

.title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  border-bottom: $border-card {
    style: dotted;
  }

  text-transform: capitalize;
}

input {
  @include chromeless-input;
  width: 100%;
  font-size: $font-l;
  font-family: $font-sans;

  &.default-value {
    position: absolute;
    bottom: 0;
    left: 0;

    padding-bottom: $gap-s;
    font-size: $font-xs;
    font-style: italic;
  }
}
</style>
