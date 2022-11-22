<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Profile for @{{ $store.state.username }}</h2>
        <h4><i>Here's where we'll store all the profile info</i> </h4>
      </header>
    </section>
  </main>
</template>



<script>

export default {
  name: 'ProfilePage',
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
