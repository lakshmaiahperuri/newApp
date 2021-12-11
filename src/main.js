import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Oruga from '@oruga-ui/oruga-next'

import {
  Button,
  Checkbox,
  Collapse,
  Datepicker,
  Dropdown,
  Field,
  Icon,
  Input,
  Inputitems,
  Loading,
  Modal,
  Notification,
  Radio,
  Select,
  Skeleton,
  Slider,
  Steps,
  Switch,
  Table,
  Tabs,
  Toast
} from '@oruga-ui/oruga-next';
// import App from './App.vue';
// import router from './router/router';
// import store from './store/store';
// Only treeshake components whichever is needed.
// VTooltip.enabled = window.innerWidth > 1024;
const app = createApp(App);
// app.mixin(mixin)
// import Dependencies.
app.use(store);
app.use(router);
app.use(Button);
app.use(Checkbox);
app.use(Collapse);
app.use(Datepicker);
app.use(Dropdown);
app.use(Field);
app.use(Icon);
app.use(Input);
app.use(Inputitems);
app.use(Loading);
app.use(Modal);
app.use(Notification);
app.use(Radio);
app.use(Select);
app.use(Skeleton);
app.use(Slider);
app.use(Steps);
app.use(Switch);
app.use(Table);
app.use(Tabs);
app.use(Toast);
// app.use(Oruga);
// https://maronato.github.io/vue-toastification/
app.use(Toast, {
  position: 'top-center',
  timeout: 5000,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  hideProgressBar: true,
  closeButton: false,
  icon: false,
});
// font-awesome icon pack configuration for Oruga
// app.use(Config, {
//   iconPack: 'fas',
//   useHtml5Validation: true,
//   statusIcon: true,
// });
// import Components
require('./styles/main.scss');
// require('./styles/custom_icon.css');
app.mount('#app');
// createApp(App).use(store).use(router).use(Oruga).mount('#app')