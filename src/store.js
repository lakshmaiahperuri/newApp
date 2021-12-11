import { createStore } from 'vuex';

export default createStore({
  state : {
    loggedInUser: {},
  },
  getters : { 
  },
  mutations : {
    setLoggedInUser: (state, user) => {
      state.loggedInUser = user;
    }
  }
})