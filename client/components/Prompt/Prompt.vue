<template>
  <article
    class="prompt"
  >
   <div class="center">
    <header>
        <h1>MusicNow</h1>
        <h2> Nov. 22, 2022 </h2><!-- <h2>prompt.date</h2> -->
    </header>
    <body>
        This will be where the prompt text is added soon.
    </body>
   </div>
  </article>
</template>

<script>
export default {
  name: 'PromptComponent',
  props: {
    // Data from the stored freet
    prompt: { // CHECK COMPONENTS
      type: Object,
      required: false // CHANGE ONCE PROMPT IS MADE
    }
  },
//   data() {
//     // return {
//     //   editing: false, // Whether or not this freet is in edit mode
//     //   draft: this.freet.content, // Potentially-new content for this freet
//     //   alerts: {} // Displays success/error messages encountered during freet modification
//     // };
//   },
  methods: {
    
  }
};
</script>

<style scoped>
.freet {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>
