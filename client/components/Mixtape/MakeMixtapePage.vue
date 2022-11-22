<template>
  <main>
    <section>
      <header>
        <h2>Prompt Here</h2>
      </header>
      <!--Make Mixtape form here -->
    </section>
    <button
      @click="submitMixtape"
    >
      Submit
    </button>
  </main>
</template>

<script>

export default {
  name: 'MakeMixtapePage',
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

