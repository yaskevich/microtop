<script setup lang="ts">

  import { ref, reactive } from 'vue';
  // import beladmdiv from '../beladmdiv.json';
  import bibliography from '../bibliography.json';

  // console.log('adm', Object.fromEntries(beladmdiv.map(item => [item.name_be, item])));

  interface IBibItem {
    title: string;
    link: string;
    district: string;
    region: string;
    meta: string;
    type: string;
  }

  interface ICascadeChild {
    name: string;
    level: number;
    parent?: boolean;
  }

  interface ICascadeItem {
    name: string;
    level: number;
    children: Array<ICascadeChild>;
  }

  // const userinput = ref('');
  const bib = ref([] as Array<IBibItem>);
  bib.value = bibliography;

  // const inputEvent = () => {
  //   userinput.value = userinput.value.replace(/[^'’0-9а-яёўіa-z\- ]/gi, '');
  //   // console.log(userinput.value);
  //   if (userinput.value.length > 2) {
  //     const re  = new RegExp( userinput.value, 'gi' );
  //     bib.value = bibliography.filter(x=> re.test(x.title));
  //   } else {
  //     bib.value = bibliography;
  //   }
  // }

  const selectedArea = ref('');
  const admTree = reactive([] as Array<ICascadeItem>);

  for (let item of bibliography) {
    // console.log(item.region, item.district);
    const node = admTree.filter(x => x.name === item.region);
    if (node.length) {
      const child = node[0]['children'];
      if (!child.filter(x => x.name === item.district).length) {
        child.push({ name: item.district, level: 3 } as ICascadeChild);
      }
    } else {
      admTree.push({
        name: item.region,
        level: 2,
        children: [{ name: item.region, level: 2, parent: true }, { name: item.district, level: 3 } as ICascadeChild],
      } as ICascadeItem);
    }
  }

  for (let item of admTree.sort((a,b) => a.name.localeCompare(b.name))) {
      const header = (item as ICascadeItem).children.shift() as ICascadeChild;
      item.children.sort((a,b) => a.name.localeCompare(b.name));
      item.children.unshift(header);
  }

  const processCascadeSelect = (item: any) => {
    // console.log(item);
    bib.value = bibliography.filter(x => x[item.value?.parent ? 'region' : 'district'] === item.value.name);
  };

  const renderLabel = (item: ICascadeChild | ICascadeItem) => {
    return item.name + ' ' + (item.level === 3 ? 'раён' : 'вобласць');
  };

</script>

<template>

  <h2>Бібліяграфія па беларускай мікратапаніміцы</h2>
  <!--
  <Tag class="p-mb-4"
       severity="danger"
       icon="pi pi-exclamation-triangle"
       value="Вядзецца распрацоўка. Апублікаваны пакуль толькі фрагмент бібліяграфіі"></Tag>

  <div class="p-field p-mx-auto p-text-center">
      <InputText id="search" aria-describedby="search-help" type="text" v-model="userinput" @input="inputEvent" class="p-d-block p-mx-auto" />
      <small id="search-help">Увядзіце больш за 2 знакі. <br/>Вынік адлюстроўваецца імгненна</small>
  </div>
  -->
  <div class="p-grid p-mb-4">
    <div class="p-col p-col-fixed" style="min-width:80px;">
      <Badge :value="[...new Set(bib.map(x=>x.title))].length - (selectedArea? 1: 0)" size="large"></Badge>
    </div>
    <div class="p-col p-col-fixed">
      <div class="p-inputgroup">
        <CascadeSelect v-model="selectedArea"
                       :options="admTree"
                       :optionLabel="renderLabel"
                       :optionGroupChildren="['children']"
                       placeholder="Абярыце арэал"
                       @change="processCascadeSelect">
          <template #option="slotProps">
            <div class="country-item">
              <template v-if="slotProps.option?.parent">
                <span>Уся вобласць</span>
                <hr style="margin-bottom: -.5rem;" />
              </template>
              <template v-else>
                <span>{{renderLabel(slotProps.option)}}</span>
              </template>
            </div>
          </template>
      </CascadeSelect>
      <!-- pi-undo -->
      <Button icon="pi pi-times-circle"
              :class="selectedArea?'p-button-text':'p-d-none'"
              @click="bib = bibliography;selectedArea = ''" />
    </div>
  </div>
  <!--
        <div class="p-col">
          <Button :disabled="!selectedArea" label="Ачысціць" class="p-ml-2 p-button-raised p-button-text" @click="bib = bibliography;selectedArea = ''" />
        </div>
              -->

  </div>

  <template v-for="(item, key) in bib" :key="key">
    <div v-if="key && bib[key - 1]['title'] !== item.title" class="p-shadow-11 item">
      <i :class="'pi pi-'+ (item.type==='Кніга'?'book':'file-o')" :title="item.type" class="p-mr-1"></i>
      {{item.title}}
      <a v-if="item.link" :href="item.link" style="color:blue;" target="_blank"><i class='pi pi-external-link' title="Спасылка на файл публікацыі"></i></a>
      <!-- <Tag class="p-ml-2" severity="info" :value="item.type" rounded></Tag> -->
      <div class="p-ml-4" v-if="item.meta">
        <small>{{item.meta}}</small>
      </div>
    </div>
  </template>

  <!--
                <p>
                  Вядзецца распрацоўка праекта...
                </p>
                <p>
                  Неўзабаве ўсё будзе!
                </p>
            -->

</template>

<style scoped>

  /*
          label {
            margin: 0 0.5em;
            font-weight: bold;
          }

          .p-field * {
            display: block;
          }
        */
  .item {
    margin-bottom: 1rem;
    padding: 5px;
    /* background: darkred;
                color:white; */
  }

</style>
