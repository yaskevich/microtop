<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="content">
    <HelloWorld />
  </div>
  <div class="footer">
    <p>
      ☼ <a href="https://philology.by/" target="_blank">Philology.BY</a>, 2022
    </p>
    <p>
      Падрыхтоўка дадзеных — <a href="https://philology.by/shkliaryk" target="_blank">Вадзім Шклярык</a>. Лічбавы праект — <a href="https://yaskevich.com/" target="_blank">Аляксей Яскевіч</a>.
    </p>
    <p>
      <small>
        Значок «Place Marker» узяты з сайта <a href="https://icons8.com/icon/30622/place-marker" target="_blank">Icons8</a>.
       </small>
    </p>
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
}
</style>
