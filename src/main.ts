import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
const app = createApp(App);
app.component('Button', Button);
app.component('InputText', InputText);

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
import "@fontsource/open-sans" // Defaults to weight 400 with normal variant.
import "@fontsource/open-sans/400-italic.css" // Italic variant.
import "@fontsource/open-sans/700.css" // Bold variant.
import "@fontsource/open-sans/700-italic.css" // Bold italic variant.

app
.use(PrimeVue)
.mount('#app');
