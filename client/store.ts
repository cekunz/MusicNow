import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    // filter: null, // Username to filter shown freets by (null = show all)
    // freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    mixtapePosted: false,
    prompt: '', // the daily prompt 
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    postMixtape(state) {
      /**
       * Update status if Mixtape has been posted for the day
       */
      state.mixtapePosted = true;
    },
    resetMixtape(state) {
    /**
     * Update status if Mixtape has been posted for the day
     */
      state.mixtapePosted = false;
    },
    async refreshPrompt(state) {
    /**
     * Update prompt of the day
     */
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long'})
      const year = date.getFullYear();
      // Formatted as Month Day, Year (Nov 21, 2022 for example)
      
      const today = `${month} ${day}, ${year}`;
      const url = `/api/prompt?date=${today}`;
      const res = await fetch(url).then(async r => r.json());
      state.prompt = res[0];
    },
    // async getCredentials(state) {
    //   const client_id = '27fc9a26af9b4c83a61da1db5c1a4833';
    //   const client_secret = secret;
    //   const url =  'https://accounts.spotify.com/api/token';

    //   console.log('encoded',Buffer.from(client_id + ':' + client_secret, 'base64')); 
      
    //   const options = {
    //     headers: {
    //       'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret, 'base64')
    //     },
    //     method: "POST",
    //     form: {
    //       grant_type: 'client_credentials'
    //     },
    //     json: true
    //   }
    //   console.log('options', options);
    //   const r = await fetch(url, options);
    //   if (!r.ok) {
    //     const res = await r.json();
    //     throw new Error(res.error);
    //   }
    //   const returned = await r.json();
    //   console.log('returned!', returned);
    //   const token = returned.body.access_token;

    //   state.token = token;
      
    // },
   
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
