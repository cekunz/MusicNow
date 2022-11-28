<!-- Form for creating Mixtape -->

<template>
<div class='forms-container'>
    <header>
        <h1> Prompt text will go here </h1>
        <h2> Select Songs for your Mixtape </h2>
    </header>
    <section class="songs">
        <SelectSongForm @submit="updateSong1" />
        <SelectSongForm @submit="updateSong2"/>
        <SelectSongForm @submit="updateSong3"/>
    </section>
     <button
      v-if="song1!==null && song2!==null && song3!==null"
      @click="submitMixtape"
    >
      Submit
    </button>
</div>
</template>

<script>
import PromptComponent from '@/components/Prompt/Prompt.vue';
import SelectSongForm from '@/components/Song/SelectSongForm.vue';

export default {
  name: 'CreateMixtapeForm',
  components: {PromptComponent, SelectSongForm},
  props: { // PROMPT GOES HERE!
    prompt: {
        type: Object,
        required: false
    },
  },
  data() {
    return {
      song1: null,
      song2: null,
      song3: null,
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    updateSong1(song1){
        this.song1 = song1;
    },
    updateSong2(song2){
        this.song2 = song2;
    },
    updateSong3(song3){
        this.song3 = song3;
    },

    submitMixtape() {
      /**
       * puts together mixtape
       */
      const params = {
        method: 'POST',
        message: 'Successfully created mixtape!',
        body: JSON.stringify({song1: this.song1, song2: this.song2, song3:this.song3}),
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

header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.songs {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  /* border: 1px solid rgb(176, 176, 176); */
  /* border-radius: 4px; */
  /* padding: 10px; */
  padding-bottom: 2rem;
  /* margin-top: 8px; */
}

/* SelectSongForm {
  padding: 10px;
} */



</style>