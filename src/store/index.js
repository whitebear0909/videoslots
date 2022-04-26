import {createStore} from 'vuex';
import imageModule from'./modules/image.js';

export default createStore({
  modules: {
    imageModule,
  }
})