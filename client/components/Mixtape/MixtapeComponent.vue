<template>
  <article class="mixtape">
    <header>
      <h3 
        class="author"
        v-if="this.$store.state.friends.includes(mixtape.creator)"
      >
        <router-link 
          style="text-decoration: none; color: black" 
          :to="{name: 'Profile', params: {name: mixtape.creator}}"
        >
          <span v-on:click="goToProfile"> @{{ mixtape.creator }} </span>
        </router-link>
      </h3>
      <h3 
        class="author"
        v-else
      >
      @{{mixtape.creator}}
      </h3>
      <div v-if="$store.state.username === mixtape.creator" class="actions">
        <button @click="deleteMixtape">🗑️ Delete</button>
      </div>
    </header>
    <div class="content">
      <SongComponent 
        :trackName="mixtape.songs[0].songTitle"
        :artist="mixtape.songs[0].songArtist"
        :trackId="mixtape.songs[0].trackId" 
        :albumCover="mixtape.songs[0].albumCover" 
        :simpleCover="true"
      />
      <SongComponent 
        :trackName="mixtape.songs[1].songTitle"
        :artist="mixtape.songs[1].songArtist"
        :trackId="mixtape.songs[1].trackId"
        :albumCover="mixtape.songs[1].albumCover" 
        :simpleCover="true"
      />
      <SongComponent 
        :trackName="mixtape.songs[2].songTitle"
        :artist="mixtape.songs[2].songArtist"
        :trackId="mixtape.songs[2].trackId"
        :albumCover="mixtape.songs[2].albumCover" 
        :simpleCover="true"
      />
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
    <LikeComponent :liked-object-id="mixtape._id" />
    <router-link :to="{name: 'Comments', params: {mixtapeId: mixtape._id}}">
      Comments
    </router-link>
  </article>
</template>

<script>
// create song component that will show the image of the album ,
// loop over that
import SongComponent from '@/components/Song/SongComponent.vue';
import LikeComponent from '@/components/Likes/LikeComponent.vue';

export default {
  name: 'MixtapeComponent',
  components: {SongComponent, LikeComponent},
  props: {
    // Data from the stored mixtape
    mixtape: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    goToProfile() {
      this.$store.commit('refreshProfile', this.mixtape.creator);
      this.$store.commit('setProfilePopUp', false);
    },
    deleteMixtape() {
      /**
       * Deletes this mixtape.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted mixtape!',
            status: 'success'
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
        method: params.method,
        headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(
          `/api/mixtape/${this.mixtape.creator}?date=${this.todayDate()}`,
          options
        );
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
  position: relative;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 3px rgb(24, 23, 23);
  border-radius: 2px;
}
</style>
