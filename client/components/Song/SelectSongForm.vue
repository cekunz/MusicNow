<!-- Form for creating Song Selection -->

<template>
<div>
    <section v-if="!submitted">
        <div v-if="!editing">
            <button class='plus'
            v-if="!editing"
            @click="startEditing"  
            >
            +
            </button> 
        </div>
        <div v-if="editing" class="song">
            <textarea
            @input="songArtist = $event.target.value"
            placeholder="Enter the Song Artist"
            />
             <textarea
            @input="songTitle = $event.target.value"
            placeholder="Enter the Song Title"
            />
             <textarea
            @input="trackId = $event.target.value"
            placeholder="Enter the Song Spotify ID"
            />
            <button class ='submit'
            @click="submitSong"
            >
            Submit
            </button>
        </div>
    </section>
    <section v-if="submitted">
      <h1> {{songTitle}} </h1>
      <h3> {{songArtist}} </h3>
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
      songArtist: '',
      songTitle: '', 
      trackId: '',
      submitted: false,
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
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
        body: JSON.stringify({songTitle: this.songTitle,  songArtist: this.songArtist, trackId: this.trackId}),
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
        url:`/api/song?songTitle=${this.songTitle}&songArtist=${this.songArtist}`,
        method: 'GET',
        message: 'Successfully found song!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
     
     // to do, first check if the song already exists, then create if needed
     // this would likely require a change to the backend, maybe a patch?
        this.createSong();
        this.submitted = true;
        this.$emit(`submit`, this.trackId);
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
  padding: 50px;
  margin: 10px;
  border: solid 4px rgb(192, 192, 192);
  border-radius: 2px;
  width: 100%;
}

.song {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(54, 54, 54);
}
</style>