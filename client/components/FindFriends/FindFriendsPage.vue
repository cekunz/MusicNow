<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Find Friends for @{{ $store.state.username }}</h2>
        <h4><i>Here's where we'll show friends to find</i> </h4>
      </header>
    </section>
  </main>
</template>



<script>

export default {
  name: 'FindFriendsPAge',
  components: {},
  data() {
    return {
      alerts: {}, 
    };
  },
  methods: {
  }
}

</script>

<style scoped>

</style>
