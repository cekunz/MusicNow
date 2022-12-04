
<template>
  <article
    class="friend"
  >
    <header>
      <h3 class="author">
        @{{ friend }} 
      </h3>
    </header>
    <div class="right"
       
      >
        <button @click="removeFriend"
         v-if="confirmed"
        >
          Remove Friend
        </button>

        <button @click="acceptFriend"
         v-if="!confirmed && requested"
        >
          Accept
        </button>
        <button @click="rejectFriend"
         v-if="!confirmed && requested"
        >
          Reject
        </button>

         <button @click="sendFriendRequest"
         v-if="!confirmed && !requested"
        >
          + Add Friend
        </button>
      </div>

    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
// create song component that will show the image of the album ,
// loop over that 

export default {
  name: 'FriendComponent',
  components: {},
  props: {
    // Data from the stored mixtape
    friend: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    requested() {
        return this.$store.state.friendRequests.includes(this.friend);
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    delete() {
      /**
       * Deletes this mixtape.
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted mixtape!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    removeFriend() {
      /**
       * removes friend
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully removed friend.', status: 'success'
          });
        }
      };
      this.request(params);
    },
    acceptFriend() {
      /**
       * accepts friend request
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}&confirmed=true`,
        method: 'PATCH',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully accepted friend request!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    rejectFriend() {
      /**
       * rejects friend request
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}&confirmed=false`,
        method: 'PATCH',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully accepted rejected friend request.', status: 'success'
          });
        }
      };
      this.request(params);
    },
    sendFriendRequest() {
        /**
         * send new friend request
        */
        const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}`,
        method: 'POST',
        callback: () => {
            this.$store.commit('alert', {
            message: 'Successfully sent sent friend request.', status: 'success'
            });
        }
        };
        this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(params.url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshFriends'); 
        this.$store.commit('refreshFriendRequests'); 
        this.$store.commit('refreshPossibleFriends'); 
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.right {
  display: flex;
  flex-direction: row;
  justify-content: right;
}
.friend {
  padding: 10px;
  margin-bottom: 20px;
  border: solid 3px rgb(24, 23, 23);
  border-radius: 2px;
  width: 50%;
}
</style>
