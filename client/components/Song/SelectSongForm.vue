<!-- Form for creating Song Selection -->

<template>
<div>
    <section v-if="!submitted">
        <div v-if="!editing && !selecting">
            <button class='plus'
            v-if="!editing"
            @click="startEditing"  
            >
            +
            </button> 
        </div>
        <div v-if="editing" class="song"> 
            <textarea
            @input="searchQuery = $event.target.value"
            placeholder="Search for a song title..."
            />
            <!-- <label for="type">Search type:</label>
            <select name="searchType" id="searchType">
              <option value="track">Song</option>
              <option value="album">Album</option>
            </select> -->
            <button class ='submit'
            @click="submitSong"
            >
            Search
            </button>
        </div>
        <div v-if="selecting" class="songPicture"> 
          <SongComponent 
          v-for="result in searchResults"
          @select="selected"
          :key="result.index"
          :trackName="result.trackName"
          :artist="result.artist"
          :trackId="result.trackId"
          :albumCover="result.albumCover"/>
        </div>
    </section>
    <section class='submitted' v-if="submitted">
      <h1> {{trackName}} </h1>
      <h3> {{artist}} </h3>
    </section>
</div>
</template>

<script>
import SongComponent from '@/components/Song/SongComponent.vue';
export default {
  name: 'SelectSongForm',
  components: {SongComponent},
  props: {
    prompt: {
        type: Object,
        required: false
    },
  },
  data() {
    return {
      editing: false, // Whether or not this song is in edit mode
      selecting: false,
      artist: '',
      trackName: '', 
      searchQuery: '',
      searchResults: [],
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
    async selected(songInfo) {
      this.trackName = songInfo.songTitle;
      this.artist = songInfo.songArtist;
      await this.createSong(songInfo)
      this.submitted = true;
      this.$emit('submit', {songTitle: this.trackName, songArtist: this.artist, trackId: songInfo.trackId})
    },
    formatSongs(result) {
      /**
       * puts search results into a usable format
       */
      for (const s of result) {
        const trackId = '' + s.id ;
        const artist = s.artists[0].name;
        const trackName = s.name;
        const albumCover = s.album.images[0].url //.substring(8,);
        this.searchResults.push({artist:artist, trackName:trackName, albumCover:albumCover, trackId: trackId});
      }
      return;
    },
    async createSong(songDetails) {
      /**
       * Create song object in db
       */
      const options = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(songDetails)
      };
      
       try {
        const r = await fetch('api/song', options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    submitSong() {
      /**
       * Finds song for mixtape
       * - first get the song objects, then ping the mixtape endpoint
       */
      // const searchType = document.getElementById("searchType").value;
      // if (this.searchQuery === '') {
      //   const error = 'Error: Search cannot be empty.';
      //   this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
      //   setTimeout(() => this.$delete(this.alerts, error), 3000);
      //   return;
      // }
      // if (searchType  !== "track" && searchType !== "album") {
      //   searchType = "track";
      // }
      // //   const error = 'Error: Search type cannot be empty.';
      // //   this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
      // //   setTimeout(() => this.$delete(this.alerts, error), 3000);
      // //   return;
      // // }
      // if 
      const url = `api/song/search?q=${this.searchQuery}&type=track`
      const params = {
        url: url,
        method: 'GET',
        message: 'Successfully found search results!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
     this.request(params);
    },
    async request(params) {
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

        const returned = await r.json();
        this.formatSongs(returned.tracks.items);
        this.editing = false;
        this.selecting = true;

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
  padding: 70px;
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

.submitted {
  text-align: center;
  margin: 10px;
  padding: 40px;
  border: solid 4px rgb(192, 192, 192);
  border-radius: 2px;
}

button:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(54, 54, 54);
}
</style>