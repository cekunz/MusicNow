<!-- Form for creating Song Selection -->

<template>
    <div class="info">
      <h1> {{song.songTitle}} </h1>
      <h3> {{song.songArtist}} </h3>
    </div>
</template>

<script>

export default {
  name: 'SongComponent',
  props: {
    song: {
        type: Object,
        required: false
    },
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 110px;
  height: 110px;
  margin:10px;
  border: solid 3px rgb(24, 23, 23);
  border-radius: 2px;
  
}

</style>