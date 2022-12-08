<!-- Form for creating Mixtape -->

<template>
<div class='forms-container'>
    <header>
        <PromptComponent />
    </header>
    <section class="songs">
        <SelectSongForm style='margin-right:30px' @submit="updateSong1" />
        <SelectSongForm style='margin-right:30px' @submit="updateSong2"/>
        <SelectSongForm @submit="updateSong3"/>
    </section>
     <button class='submit'
      v-if="song1!==null && song2!==null && song3!==null"
      @click="submitMixtape"
    >
      Submit
    </button>


</div>
</template>

<script>
import PromptComponent from '@/components/Prompt/PromptComponent.vue';
import SelectSongForm from '@/components/Song/SelectSongForm.vue';

export default {
  name: 'CreateMixtapeForm',
  components: {PromptComponent, SelectSongForm},
  data() {
    return {
      song1: null,
      song2: null,
      song3: null,
      alerts: {} // Displays success/error messages
    };
  },
  methods: {
    updateSong1(song1){
      this.song1 = song1.trackId;
    },
    updateSong2(song2){
      this.song2 = song2.trackId;
    },
    updateSong3(song3){
      this.song3 = song3.trackId;
    },

    submitMixtape() {
      /**
       * puts together mixtape
       */

      // only pass in the trackId
      const body = JSON.stringify({song1: this.song1, song2: this.song2, song3:this.song3});
      const params = {
        method: 'POST',
        message: 'Successfully created mixtape!',
        body: body,
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.postMixtape(params);
    },
    async postMixtape(params) {
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
        const r = await fetch(`/api/mixtape/${this.$store.state.username}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('postMixtape');
        this.$store.commit('refreshFeed');

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
.forms-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: solid 4px rgb(192, 192, 192);
}

h2 {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: lighter;
}
.songs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 50px;
  
}
.submit {
  width: 300px;
  text-align: center;
} 



</style>