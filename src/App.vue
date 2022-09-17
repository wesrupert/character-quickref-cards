<template>
  <div class="app" :class="{ dark: isDarkMode }">
    <button class="theme-toggle" @click="onThemeToggleClick">
      {{ themeToggleText }}
    </button>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/cards">My cards</router-link> |
      <!-- TODO: <router-link to="/cards/new">New card</router-link> | -->
      <router-link to="/cards/import">Import</router-link>
    </nav>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref } from "vue";

const isDarkMode = ref(false);
const themeToggleText = computed(() =>
  isDarkMode.value ? "light theme" : "dark theme"
);

function onThemeToggleClick() {
  isDarkMode.value = !isDarkMode.value;
}
</script>

<style lang="scss">
@import "@/styles/solarized";
@import "@/styles";

html,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
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

p,
html {
  font-size: $font-s;
  font-weight: normal;
  text-align: left;
  margin: 0 {
    bottom: $gap-s;
  }
}

.app {
  width: 100vw;
  height: 100vh;

  font-family: $font-sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-rows: min-content 1fr;
}

.theme-toggle {
  position: absolute;
  top: $gap-s;
  left: $gap-s;
}

nav {
  padding: $gap-m;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main {
  @include vertical-flex;
  overflow-x: hidden;
  overflow-y: auto;
  padding: $gap-l {
    top: $gap-s;
  }

  & > * {
    max-width: min(100%, 860px);
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
