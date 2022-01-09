<script setup lang="ts">

  import { ref } from 'vue';
  import beladmdiv from '../beladmdiv.json';
  import bibliography from '../bibliography.json';

  defineProps<{ msg: string }>();

  console.log('adm', Object.fromEntries(beladmdiv.map(item => [item.name_be, item])));

  const bib = bibliography;

  const count = ref(0);

</script>

<template>

  <!-- <h1>{{ msg }}</h1> -->

  <h3>Бібліяграфія па беларускай мікратапаніміцы</h3>

  <div v-for="item in bib" class="p-shadow-1" :key="item.id" style="margin-bottom: 1rem;padding: 5px;">{{item.title}}</div>

  <!-- <p>
    Вядзецца распрацоўка праекта...
    </p>
    <p>
    Неўзабаве ўсё будзе!
    </p>
     -->
  <hr />
  <p>
    <small><a href="https://philology.by/" target="_blank"> Philology.BY</a>, 2022</small>
  </p>
  <p>
    <small>Падрыхтоўка дадзеных — Вадзім Шклярык. Лічбавы праект – Аляксей Яскевіч</small>
  </p>

  <div style="display:none">
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a> +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Docs
      </a> |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
    <Button label="Submit" />
  </div>

</template>

<style scoped>

  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }

</style>
