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
    label: string;
  }

  interface ICascadeItem {
    name: string;
    level: number;
    label: string;
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

  const showInfo = ref(false);

  for (let item of bibliography) {
    // console.log(item.region, item.district);
    const node = admTree.filter(x => x.name === item.region);
    if (node.length) {
      const child = node[0]['children'];
      if (!child.filter(x => x.name === item.district).length) {
        child.push({ name: item.district, level: 3, label: `${item.district} раён` } as ICascadeChild);
      }
    } else {
      admTree.push({
        name: item.region,
        level: 2,
        label: `${item.region} вобласць`,
        children: [{ name: item.region, level: 2, parent: true, label: `${item.region} вобласць`, }, { name: item.district, level: 3, label: `${item.district} раён` } as ICascadeChild],
      } as ICascadeItem);
    }
  }

  for (let item of admTree.sort((a,b) => a.name.localeCompare(b.name)) as Array<ICascadeItem>) {
      const header = item.children.shift() as ICascadeChild;
      item.children.sort((a,b) => a.name.localeCompare(b.name));
      item.children.unshift(header);
  }

  const processCascadeSelect = (item: any) => {
    bib.value = bibliography.filter(x => x[item.value?.parent ? 'region' : 'district'] === item.value.name);
  };

  const renderLabel = (item: ICascadeChild | ICascadeItem) => {
    return item.name + ' ' + (item.level === 3 ? 'раён' : 'вобласць');
  };

  const selectTypeIcon = (name:string) => {
    if  (name === 'Кніга') {
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
  <Tag class="mb-4"
       severity="danger"
       icon="pi pi-exclamation-triangle"
       value="Вядзецца распрацоўка. Апублікаваны пакуль толькі фрагмент бібліяграфіі"></Tag>

  <div class="field mx-auto text-center">
      <InputText id="search" aria-describedby="search-help" type="text" v-model="userinput" @input="inputEvent" class="d-block mx-auto" />
      <small id="search-help">Увядзіце больш за 2 знакі. <br/>Вынік адлюстроўваецца імгненна</small>
  </div>
  -->

  <div class="flex justify-content-between flex-wrap mb-4" style="max-width:250px;">
    <div class="flex align-items-center justify-content-center mr-2 font-bold">
      Ад укладальніка
    </div>
    <div class="flex align-items-center justify-content-center ml-auto">
      <div>
        <Button :icon="'pi pi-' + (showInfo ? 'minus': 'plus')" :title="(showInfo ? 'згарнуць': 'разгарнуць')"
         class="p-button-link p-button-sm"  @click="showInfo = !showInfo"/>
      </div>
    </div>
  </div>

    <div class="mb-4" v-if="showInfo">
      <p>
        Храналагічны дыяпазон прадстаўленых у бібліяграфіі публікацый — 1959–2021 гг. На дадзеным этапе ўлічваліся толькі тыя працы, якія апублікаваны на тэрыторыі Беларусі, утрымліваюць лакалізаваны матэрыял (г. зн. абавязкова ўказаны прынамсі раён(-ы)) і змяшчаюць тры і больш назваў дробных геаграфічных аб’ектаў. Публікацыі, прысвечаныя разгляду тапонімаў з архіўных крыніц і помнікаў пісьменства, у базу не ўключаліся. Акрамя таго, не ўлічваліся працы па гісторыі і крыніцы фальклорна-этнаграфічнага характару, якія часам таксама ўтрымліваюць мікратапонімы.
      </p>
      <p>
        Многія публікацыі ў бібліяграфіі забяспечаны каментарыем, які датычыць асаблівасцей падачы назваў дробных геаграфічных аб’ектаў у канкрэтнай працы. Адсутнасць такога каментарыя азначае, што мікратапонімы ў публікацыі пададзены з пазначэннем націску, указаннем аб’екта і падрабязнай лакалізацыяй. Працы, электронныя версіі якіх удалося знайсці ў адкрытых інтэрнэт-крыніцах і прыватных архівах, забяспечаны ў бібліяграфіі спасылкамі. Вобласці і раёны вылучаны ў адпаведнасці з адміністрацыйна-тэрытарыяльным падзелам, адлюстраваным у нарматыўных даведніках з серыі «Назвы населеных пунктаў Рэспублікі Беларусь» (Мінск, 2003–2010).
      </p>
      <p>
        Звесткі пра не ўлічаныя ў бібліяграфіі або новыя публікацыі адпраўляйце, калі ласка, на адрас vsh@philology.by. Будзем удзячныя таксама за падрыхтаваныя ў прыватным парадку сканы прац, што яшчэ не маюць электронных версій. Усё гэта дазволіць зрабіць бібліяграфію больш інфарматыўнай і зручнай.
      </p>
      <hr/>
    </div>

  <div class="grid mb-4">
    <div class="col col-fixed" style="min-width:80px;">
      <Badge :value="[...new Set(bib.map(x=>x.title))].length - (selectedArea? 1: 0)" size="large"></Badge>
    </div>
    <div class="col col-fixed">
      <div class="p-inputgroup">
        <CascadeSelect v-model="selectedArea"
                       :options="admTree"
                       optionLabel="label"
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
                :class="selectedArea?'p-button-text':'hidden'"
                @click="bib = bibliography;selectedArea = ''" />
      </div>
    </div>
  <!--
        <div class="col">
          <Button :disabled="!selectedArea" label="Ачысціць" class="ml-2 p-button-raised p-button-text" @click="bib = bibliography;selectedArea = ''" />
        </div>
              -->

  </div>

  <template v-for="(item, key) in bib" :key="key">
    <div v-if="key && bib[key - 1]['title'] !== item.title" class="shadow-8 item">
      <i :class="selectTypeIcon(item.type)" :title="item.type" class="mr-1"></i>
      {{item.title}}
      <a v-if="item.link" :href="item.link" style="color:blue;" target="_blank"><i class='pi pi-external-link' title="Спасылка на файл публікацыі"></i></a>
      <!-- <Tag class="ml-2" severity="info" :value="item.type" rounded></Tag> -->
      <div class="ml-4" v-if="item.meta">
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
