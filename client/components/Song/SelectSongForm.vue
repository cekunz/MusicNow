<!-- Form for creating Song Selection -->

<template>
<div>
    <section>
        <div v-if="!editing">
            <button class='plus'
            v-if="!editing"
            @click="startEditing"  
            >
            +
            </button> 
        </div>
        <div v-if="editing">
            <textarea
            class="song"
            @input="draft = $event.target.value"
            placeholder="Enter the Spotify Song ID"
            />
            <button class ='submit'
            @click="createSong"
            >
            Submit
            </button>
        </div>
    </section>
</div>
</template>

<script>

export default {
  name: 'SelectSongForm',
  props: {
    prompt: {
        type: Object,
        required: false
    },
  },
  data() {
    return {
      editing: false, // Whether or not this song is in edit mode
      draft: '', // new song
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
   selectSong() {
      /**
       * Select a song
       */
        console.log('draft', this.draft);
    },
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
       this.editing = true; 
    },
    async createSong() {
      /**
       * Submits a request to the song's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const params = {
        url: `/api/song`,
        method: 'POST',
        message: 'Successfully created song!',
        body: JSON.stringify({songTitle: "Good Days", songArtist:"SZA", trackId: '3YJJjQPAbDT7mGpX3WtQ9A'}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.sendRequest(params);
    },
    submitSong() {
      /**
       * Finds song for mixtape
       * - first get the song objects, then ping the mixtape endpoint
       */
      const params = {
        url:`/api/song?trackId=${this.draft}`,
        method: 'GET',
        message: 'Successfully found song!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.sendRequest(params);
    },
    async sendRequest(params) {
      /**
       * Submits a request to the song's endpoint
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

        this.editing = false;
        const returned = await r.json();
        console.log('returned', returned);

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

.plus {
  font-size: 30px;
  padding: 30px;
  margin: 8px;
  border: solid 4px rgb(192, 192, 192);
  border-radius: 2px;
  width: 100%;
}

button:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(54, 54, 54);
}
</style>