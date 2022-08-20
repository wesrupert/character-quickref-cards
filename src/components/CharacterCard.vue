<template>
  <div class="character-card">
    <div
      v-if="props.character.portrait"
      class="portrait"
      :style="{
        'background-image': `url(${props.character.portrait})`,
      }"
    />
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
      <div class="blurbs">
        <p v-for="block in props.character.personality" :key="block.text">
          <span v-if="block.header" class="header">{{ block.header }}</span>
          <span>{{ block.text }}</span>
        </p>
      </div>
      <div v-if="props.character.quote" class="quote">
        {{ props.character.quote }}
      </div>
      <div class="status">Hello status bar!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Character {
  name: string;
  portrait?: string;

  physiology?: string;
  role?: string;

  personality?: { header?: string; text: string }[];
  quote?: string;

  status?: string;
  relationship?: string;
}

const props = defineProps<{ character: Character }>();
</script>

<style scoped lang="scss">
@import "@/styles/theme";

.character-card {
  @include rounded-card;

  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

h1 {
  font-family: $font-script;
  font-weight: normal;
  font-size: $font-l;
  margin: 0;
}

h2 {
  font-size: $font-m;
  margin: 0;
}

h3 {
  font-size: $font-s;
  font-weight: normal;
  margin: 0;
}

p {
  font-size: $font-s;
  font-weight: normal;
  text-align: left;
}

.portrait {
  padding: $gap-m;
  flex: 2;

  background-origin: content-box;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-right: $border-card {
    style: dotted;
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
  align-items: top;
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

.blurbs {
  flex: 1;
}

.header {
  font-size: $font-m;
  font-weight: bold;
}

.quote {
  font-size: $font-m;
  font-style: italic;
  text-align: left;
}
</style>
