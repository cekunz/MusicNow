<template>
  <main>
    <!-- <section> -->
    <!-- <div class="center"> -->
        <header>
            <h1>MusicNow</h1>
            <h2> Nov. 22, 2022 </h2><!-- <h2>prompt.date</h2> -->
        </header> 
        <p>
            This will be where the prompt text is added.
        </p>
    <!-- </div> -->
      <!--Make Mixtape form here -->
    <!-- <body> -->
    <!-- <div> -->
    <button
      @click="submitMixtape"
    >
      Submit
    </button>
    <!-- </div> -->
    <!-- </body> -->
    <!-- </section> -->
  </main>
</template>

<script>
import PromptComponent from '@/components/Prompt/Prompt.vue';

export default {
  name: 'MakeMixtapePage',
  components: {PromptComponent},
//  data() {
//     // return {value: this.$store.state.filter};
//   },
  methods: {
    submitMixtape() {
        this.$store.commit('postMixtape'); 
    }
  }
};
</script>

