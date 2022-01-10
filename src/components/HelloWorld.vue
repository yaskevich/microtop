<script setup lang="ts">

  import { ref } from 'vue';
  import beladmdiv from '../beladmdiv.json';
  import bibliography from '../bibliography.json';

  // console.log('adm', Object.fromEntries(beladmdiv.map(item => [item.name_be, item])));

  interface IBibItem {
    title: string,
    year: string,
    district: string,
    region: string,
    meta: string,
    type: string,
  };

  const userinput = ref('');
  const bib = ref([] as Array<IBibItem>);
  bib.value = bibliography;

  const inputEvent = () => {
    userinput.value = userinput.value.replace(/[^'’0-9а-яёўіa-z\- ]/gi, '');
    // console.log(userinput.value);
    if (userinput.value.length > 2) {
      const re  = new RegExp( userinput.value, 'gi' );
      bib.value = bibliography.filter(x=> re.test(x.title) );
    } else {
      bib.value = bibliography;
    }
    // console.log(userinput.value);
  }

</script>

<template>

  <h2>Бібліяграфія па беларускай мікратапаніміцы</h2>

  <div class="p-field p-mx-auto p-text-center">
    <InputText id="search" aria-describedby="search-help" type="text" v-model="userinput" @input="inputEvent" class="p-d-block p-mx-auto" />
    <small id="search-help">Увядзіце больш за 2 знакі. <br/>Вынік адлюстроўваецца імгненна</small>
  </div>

  <div v-for="(item, key) in bib" class="p-shadow-1 item" :key="key">{{item.title}}</div>

  <!-- <p>
    Вядзецца распрацоўка праекта...
    </p>
    <p>
    Неўзабаве ўсё будзе!
    </p>
     -->
  <hr />
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

</template>

<style scoped>

  h2, a {
    color: darkred;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  .p-field * {
      display: block;
  }

  .item {
    margin-bottom: 1rem;
    padding: 5px;
    background: darkred;
    color:white;
  }

</style>
