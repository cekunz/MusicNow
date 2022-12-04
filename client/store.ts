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
    profileUsername: null, // Username of the profile
    profileFullname: null, // Full Name of the profile
    profileCircle: null, // First Initial to be displayed on profile page
    profileFriends: [], // Friends of profile page
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    mixtapePosted: false,
    mixtapes: [],
    friends: [],
    friendRequests: [],
    nonFriends: [],
    favorites: [],
    prompt: '', // the daily prompt
    likes: Object.create(null) // All likes from friends
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
    setProfileUsername(state, profileUsername) {
      /**
       * Update the stored profileUsername to the specified one.
       * @param profileUsername - new profileUsername to set
       */
      state.profileUsername = profileUsername;
    },
    setProfileFullname(state, profileFullname) {
      /**
       * Update the stored profileFullname to the specified one.
       * @param profileFullname - new profileFullname to set
       */
      state.profileFullname = profileFullname;
    },
    setProfileCircle(state, profileCircle) {
      /**
       * Update the stored profileCircle to the specified one.
       * @param profileCircle - new profileCircle to set
       */
      state.profileCircle = profileCircle;
    },
    setProfileFriends(state, profileFriends) {
      /**
       * Update the stored profileFriends to the specified ones.
       * @param profileFriends - new profileFriends to set
       */
      state.profileFriends = profileFriends;
    },
    setLikes(state, likes) {
      /**
       * Set the stored likes to the provided likes.
       * @param likes - likes to store
       */
      const newLikes = Object.create(null);
      // Group likes by their corresponding object Ids
      for (const like of likes) {
        const objectId = `${like.likedObjectId}`;
        if (!(objectId in newLikes)) {
          newLikes[objectId] = like;
        }
      }
      state.likes = newLikes;
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
      const month = date.toLocaleString('default', {month: 'long'});
      const year = date.getFullYear();
      // Formatted as Month Day, Year (Nov 21, 2022 for example)

      const today = `${month} ${day}, ${year}`;
      const url = `/api/mixtape/${state.username}?date=${today}&feed=true`;
      const res = await fetch(url).then(async (r) => r.json());
      state.mixtapes = res;

      // Refresh likes after getting new mixtapes
      this.commit('refreshLikes');
    },
    async refreshFriends(state) {
      /**
       * Update all of a users' friends
       */
      const url = `/api/friend/${state.username}?confirmed=true`;
      const res = await fetch(url).then(async (r) => r.json());
      state.friends = res;
    },
    async refreshFriendRequests(state) {
      /**
       * Update all of a users' friends requests
       */
      const url = `/api/friend/${state.username}?confirmed=false`;
      const res = await fetch(url).then(async (r) => r.json());
      state.friendRequests = res;
    },
    async refreshPossibleFriends(state) {
      /**
       * Update all of a users' friends requests
       */
      const url = `/api/friend/${state.username}`;
      const res = await fetch(url).then(async (r) => r.json());

      state.nonFriends = res;
    },
    async refreshPrompt(state) {
      /**
       * Update prompt of the day
       */
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('default', {month: 'long'});
      const year = date.getFullYear();
      // Formatted as Month Day, Year (Nov 21, 2022 for example)

      const today = `${month} ${day}, ${year}`;
      const url = `/api/prompt?date=${today}`;
      const res = await fetch(url).then(async (r) => r.json());
      state.prompt = res[0];
    },
    async refreshFavorites(state) {
      /**
       * Update favorited songs
       */
      const url = `/api/favorite/:${state.username}`;
      const res = await fetch(url).then(async (r) => r.json());
      state.favorites = res;
    },
    async refreshLikes(state) {
      /**
       * Update all of the likes
       */
      const requests = state.mixtapes.map((mixtape) => {
        const url = `/api/likes/${mixtape._id}`;
        const res = fetch(url).then(async (r) => r.json());
        return res;
      });

      const likes = await Promise.all(requests); // wait for all requests to finish
      this.commit('setLikes', likes);
    },
    removeLike(state, like) {
      /**
       * Remove the user's name from the list of likers on an object.
       * @param like - The like object to modify
       */
      const newLikes = JSON.parse(JSON.stringify(state.likes)); // Copy to ensure no alliasing occurs;
      const objectId = like.likedObjectId;
      const user = state.username;
      if (objectId in newLikes) {
        const likers = newLikes[objectId].likers;

        // Remove liker with a matching username
        newLikes[objectId].likers = likers.filter((liker) => {
          liker !== user;
        });
      }
      state.likes = newLikes;
    },
    addLike(state, like) {
      /**
       * Add the user's name to the list of likers on an object.
       * @param like - The new like to store
       */
      const newLikes = JSON.parse(JSON.stringify(state.likes)); // Copy to ensure no alliasing occurs;
      const objectId = like.likedObjectId;
      const user = state.username;
      if (objectId in newLikes) {
        newLikes[objectId].likers.push(user); // add user to list of likers
      }
      state.likes = newLikes;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
