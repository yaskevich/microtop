<script setup lang="ts">
import Home from './components/Home.vue';
import store from './store';
</script>

<template>
  <ScrollTop />
  <div class="container">
    <div class="content">
      <Home />
    </div>
    <div class="footer p-2" id="about">
      <p>
        <a href="https://philology.by/" target="_blank">Philology.BY</a>, 2022. Версія: {{ store.version }}
        <a :href="store.git" target="_blank">
          <i class="pi pi-github"></i>
        </a>
      </p>
      <p>
        Падрыхтоўка дадзеных —
        <a href="https://philology.by/shkliaryk" target="_blank">Вадзім Шклярык</a>. Лічбавы праект —
        <a href="https://yaskevich.com/" target="_blank">Аляксей Яскевіч</a>.
      </p>
      <p>
        <small>
          Значок «Place Marker» узяты з сайта
          <a href="https://icons8.com/icon/30622/place-marker" target="_blank">Icons8</a>.
        </small>
      </p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Open Sans', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: left; */
  color: #2c3e50;
  /* margin-top: 60px; */
  padding: 2rem;
}
.footer {
  background: #f8f6f6;
  border-radius: 5px;
  padding: 5px;
}
.content {
  min-height: calc(100vh - 220px);
}

a {
  color: gray;
  font-weight: bold;
  text-decoration: none;
}
.container {
  max-width: 900px;
  margin: auto;
}
</style>
