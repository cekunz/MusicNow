
<template>
  <article
    class="friend"
  >
    <header>
      <h3 class="author">
        @{{ friend }} 
      </h3>
      <div
        v-if="!confirmed"
        class="actions"
      >
        <!-- <button @click="deleteMixtape">
          🗑️ Delete
        </button> -->
      </div>
    </header>
    

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
import SongComponent from '@/components/Song/SongComponent.vue';

export default {
  name: 'FriendComponent',
  components: {SongComponent},
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
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted mixtape!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    todayDate() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      // Formatted as Month Day, Year (Nov 21, 2022 for example)
      return `${this.numberToMonth(month)} ${day}, ${year}`;
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
        const r = await fetch(`/api/mixtape/${this.mixtape.creator}?date=${this.todayDate()}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('resetMixtape'); // reset status to unposted mixtape

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

.mixtape {
  padding: 10px;
  margin-bottom: 20px;
  border: solid 3px rgb(24, 23, 23);
  border-radius: 2px;
}
</style>
