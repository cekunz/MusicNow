<!-- Form for creating Song Selection -->

<template>
    <div class="info">
      <img class='image' :src='albumCover'>
      <h3 class='track'> {{shortenedTrack}} </h3>
      <h4 class='artist'> {{artist}} </h4>

      <button v-if="!simpleCover || simpleCover===null"
       @click="$emit('select', {songTitle: trackName, songArtist: artist, trackId: trackId, albumCover:albumCover})">
        Select
      </button>
    </div>
</template>

<script>
export default {
  name: 'SongComponent',
  props: {
    trackName: {
        type: String,
        required: false
    },
    artist: {
        type: String,
        required: false
    },
    trackId: {
        type: String,
        required: false
    },
    albumCover: {
        type: String,
        required: false
    },
    simpleCover: {
        type: Boolean,
        required: false
    }
  },
  computed: {
    shortenedTrack() {
        if (this.trackName.length > 35) {
            return this.trackName.substring(0,33) + '...';
        } else return this.trackName;
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
  }
};
</script>

<style scoped>

.info {
  /* justify-content: center; */
  text-align: center;
  width: 220px;
  height: 220px;
  margin-bottom:115px;
  /* border: solid 3px rgb(24, 23, 23); */
  border-radius: 2px;
}

.track {
    font-size: 0.8vi;
    font-size: 2.5vh;
    margin-bottom:-16px;
}
.image {
    height: 200px;
    width: 200px;
    margin-bottom: -15px;
 }

.artist {
    font-size: 10;
    font-weight: lighter;
    margin-bottom: 7px;
}

button {
    font-size: 15px;
    padding: 5px;
}
</style>