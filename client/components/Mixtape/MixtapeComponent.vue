<template>
  <article>
    <div class="mixtape-container">
      <h3
        v-if="
          $store.state.friends.includes(mixtape.creator) ||
          mixtape.creator === $store.state.username
        "
        class="username-container"
      >
        <div class="circle">
          <p class="circle-inner">{{ profileCircleText }}</p>
        </div>
        <router-link
          class="username-link"
          style="text-decoration: none; color: black"
          :to="{name: 'Profile', params: {name: mixtape.creator}}"
        >
          <span v-on:click="goToProfile"> @{{ mixtape.creator }} </span>
        </router-link>
      </h3>
      <h3 class="username-container" v-else>@{{ mixtape.creator }}</h3>

      <header class="delete-button-container">
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
      <div class="comment-button-container">
        <button @click="$router.push(`/comments/${mixtape._id}`)">
          Comments
        </button>
      </div>
    </div>
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
      profileCircleColor: null,
      profileCircleText: null,
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  async mounted() {
    const url = `/api/profile?username=${this.mixtape.creator}`;
    const res = await fetch(url).then(async (r) => r.json());
    if (res.iconText === undefined) {
      this.profileCircleText = res.fullName[0];
    } else {
      this.profileCircleText = res.iconText;
    }
    if (res.iconColor === undefined) {
      this.profileCircleColor = '#ccc';
    } else {
      this.profileCircleColor = res.iconColor;
    }
  },
  computed: {},
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
  margin: 50px 0;
}

.circle {
  display: inline-block;
  background-color: v-bind(profileCircleColor);
  margin-right: 15px;
  margin-left: -15px;
  margin-bottom: 0px;
  border-radius: 50%;
}

.circle-inner {
  color: black;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  height: 60px;
  width: 60px;
  font-size: 22px;
}

.mixtape-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  padding: 20px 30px;
  margin-bottom: 20px;
  border: solid 2px rgb(222, 222, 222);
  border-radius: 36px;
  background-color: whitesmoke;
}

.mixtape-container button {
  background-color: rgb(243, 243, 243);
  border: solid 1px rgb(193, 193, 193);
  border-radius: 8px;
}

.mixtape-container button:hover {
  border-color: #1aeeab;
  border-width: 3px;
  color: #00c385;
}

.username-container {
  /* display: flex;
  flex-direction: row;
  align-content: center; */
  position: absolute;
  z-index: 1;
  left: 40px;
  top: 0;
}

.username-link {
  position: absolute;
  z-index: 1;
  /* left: 40px; */
  top: 25%;
}

.comment-button-container {
  position: absolute;
  z-index: 1;
  right: 40px;
  bottom: 40px;
}

.delete-button-container {
  position: absolute;
  z-index: 1;
  left: 40px;
  bottom: 40px;
}
</style>
