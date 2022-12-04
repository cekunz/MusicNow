import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    username: null, // Username of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    mixtapePosted: false, 
    mixtapes: [],
    friends: [],
    friendRequests: [],
    nonFriends: [],
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
    async refreshFeed(state) {
    /**
     * Update prompt of the day
     */
     const date = new Date();
     const day = date.getDate();
     const month = date.toLocaleString('default', { month: 'long'})
     const year = date.getFullYear();
     // Formatted as Month Day, Year (Nov 21, 2022 for example)
     
     const today = `${month} ${day}, ${year}`;
      const url = `/api/mixtape/${state.username}?date=${today}&feed=true`
      const res = await fetch(url).then(async r => r.json());
      state.mixtapes = res;

    },
    async refreshFriends(state) {
      /**
       * Update all of a users' friends
      */
      const url = `/api/friend/${state.username}?confirmed=true`
      const res = await fetch(url).then(async r => r.json());
      state.friends = res;
    },
    async refreshFriendRequests(state) {
      /**
       * Update all of a users' friends requests
       */
        const url = `/api/friend/${state.username}?confirmed=false`
        const res = await fetch(url).then(async r => r.json());
        state.friendRequests = res;
    },
    async refreshPossibleFriends(state) {
    /**
     * Update all of a users' friends requests
     */
      const url = `/api/users`
      const res = await fetch(url).then(async r => r.json());
      
     const allOtherUsers = res;
     const diff =  [...allOtherUsers].filter((user) => !state.friendRequests.includes(user));
     const nonFriendUsers =  [...diff].filter((user) => !state.friends.includes(user));
     state.nonFriends = nonFriendUsers;
     console.log(state);
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
   
   
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
