<script setup lang="ts">
import { ref, reactive } from 'vue';
import store from '../store';
import Description from './Description.vue';
import D3Map from './D3Map.vue';

// const userinput = ref('');

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

const selectedArea = ref({} as ICascadeItem);

const showInfo = ref(false);

const bibliographySelection = ref([] as Array<IBibItem>);
bibliographySelection.value = store.bibliography;

const dropSelection = () => {
  bibliographySelection.value = store.bibliography;
  selectedArea.value = {} as ICascadeItem;
};

const processCascadeSelect = (item: any) => {
  bibliographySelection.value = store.bibliography.filter(
    x => x[item.value?.parent ? 'region' : 'district'] === item.value.name
  );
};

const renderLabel = (item: ICascadeChild | ICascadeItem) => {
  return item.name + ' ' + (item.level === 3 ? 'раён' : 'вобласць');
};

const selectTypeIcon = (name: string) => {
  if (name === 'Кніга') {
    return 'pi pi-book';
  } else if (name === 'Рукапіс') {
    return 'pi pi-pencil';
  }
  return 'pi pi-file-o';
};
</script>

<template>
  <h2>Бібліяграфія па беларускай мікратапаніміцы</h2>

  <!--
  <div class="field mx-auto text-center">
      <InputText id="search" aria-describedby="search-help" type="text" v-model="userinput" @input="inputEvent" class="d-block mx-auto" />
      <small id="search-help">Увядзіце больш за 2 знакі. <br/>Вынік адлюстроўваецца імгненна</small>
  </div>
  -->

  <div class="grid font-bold">
    <div class="col" style="min-width: 350px"><a style="text-decoration: none" href="#about">Пра праект</a></div>
    <div class="col flex justify-content-between flex-wrap" style="min-width: 350px">
      <div class="flex align-items-center justify-content-center mr-2">Ад укладальніка</div>
      <div class="flex align-items-center justify-content-center ml-auto">
        <Button
          :icon="'pi pi-' + (showInfo ? 'minus' : 'plus')"
          :title="showInfo ? 'згарнуць' : 'разгарнуць'"
          class="p-button-link p-button-sm"
          @click="showInfo = !showInfo" />
      </div>
    </div>
  </div>
  <div class="mb-4" v-if="showInfo">
    <Description />
    <!-- <hr /> -->
  </div>

  <div class="grid mb-4">
    <div class="col col-fixed" style="min-width: 80px">
      <Badge :value="[...new Set(bibliographySelection.map(x => x.title))].length" size="large"></Badge>
    </div>
    <div class="col col-fixed">
      <div class="p-inputgroup">
        <CascadeSelect
          v-model="selectedArea"
          :options="store.options"
          optionLabel="label"
          :optionGroupChildren="['children']"
          placeholder="Абярыце арэал"
          @change="processCascadeSelect">
          <template #option="slotProps">
            <div class="country-item">
              <template v-if="slotProps.option?.parent">
                <span>Уся вобласць</span>
                <hr style="margin-bottom: -0.5rem" />
              </template>
              <template v-else>
                <span>{{ renderLabel(slotProps.option) }}</span>
              </template>
            </div>
          </template>
        </CascadeSelect>
        <!-- pi-undo -->
        <Button
          icon="pi pi-times-circle"
          :class="selectedArea?.level ? 'p-button-text' : 'hidden'"
          @click="dropSelection" />
      </div>
    </div>
    <!--
        <div class="col">
          <Button :disabled="!selectedArea" label="Ачысціць" class="ml-2 p-button-raised p-button-text" @click="bib = bibliography;selectedArea = ''" />
        </div>
    -->
  </div>

  <template v-for="(item, key) in bibliographySelection" :key="key">
    <div v-if="!key || (key && bibliographySelection[key - 1]['title'] !== item.title)" class="shadow-8 item">
      <i :class="selectTypeIcon(item.type)" :title="item.type" class="mr-1"></i>
      {{ item.title }}
      <a v-if="item.link" :href="item.link" style="color: blue" target="_blank">
        <i class="pi pi-external-link" title="Спасылка на файл публікацыі"></i>
      </a>
      <!-- <Tag class="ml-2" severity="info" :value="item.type" rounded></Tag> -->
      <div class="ml-4" v-if="selectedArea?.level === 3 && item.meta">
        <small>{{ item.meta }}</small>
      </div>
    </div>
  </template>
</template>

<style scoped>
.item {
  margin-bottom: 1rem;
  padding: 5px;
  /* background: darkred;
     color:white;
    */
}
</style>
