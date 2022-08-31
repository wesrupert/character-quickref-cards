<template>
  <div class="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/cards">My cards</router-link> |
      <router-link to="/cards/new">New card</router-link> |
      <router-link to="/import">Import</router-link>
    </nav>
    <router-view class="main" />
  </div>
</template>

<style lang="scss">
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
    max-width: min(100%, 900px);
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
