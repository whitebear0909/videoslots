import * as types from "../mutation-types";
import { getImages } from "../../core/services/service.api.js";
// state
const state = {
  images: [],
};

// getters

/**
 * Get  images list
 * @returns Array
*/
const getters = {
  images: (state) => state.images,
};

// mutations
const mutations = {
  [types.MUTATION_SET_IMAGES](state, images) {
    state.images = images;
  },
};

// actions
const actions = {
  getAllImages({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getImages(payload).then(({data}) => {
        commit(types.MUTATION_SET_IMAGES, data)
        resolve(data)
      }).catch((e) => {
        reject(e);
      })
    });
  },
};

const imageModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default imageModule;