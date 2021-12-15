import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    loggedInUser: {},
  },
  getters: {
  },
  mutations: {
    setLoggedInUser: (state, user) => {
      console.log(user, 'storeeee');
      state.loggedInUser = user;
    },
  },
  plugins: [createPersistedState()],
});
