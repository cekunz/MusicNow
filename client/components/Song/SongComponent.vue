<!-- Form for creating Song Selection -->

<template>
    <div class="info">
      <img src="albumCover">
      <h3 class='track'> {{shortenedTrack}} </h3>
      <h4 class='artist'> {{artist}} </h4>

      <button v-if="!simpleCover || simpleCover===null"
       @click="$emit('select', {songTitle: trackName, songArtist: artist, trackId: trackId})">
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
        if (this.trackName.length > 45) {
            return this.trackName.substring(0,42) + '...';
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
  justify-content: center;
  text-align: center;
  width: 220px;
  height: 220px;
  margin:10px;
  border: solid 3px rgb(24, 23, 23);
  border-radius: 2px;
}

.track {
    font-size: 0.8vi;
    font-size: 2.5vh;
}

.artist {
    font-size: 10;
    font-weight: lighter;
}
</style>