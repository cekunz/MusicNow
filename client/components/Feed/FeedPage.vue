<!-- eslint-disable vue/max-attributes-per-line -->

<template>
  <main class="viewport">
    <!-- what you see before you log in -->
    <section class="general" v-if="!$store.state.username">
      <h3 class="welcome">Welcome to MusicNow</h3>
      <h3>
        The app for finding new music with your friends through a daily prompted
        mixtape.
      </h3>
      <article class="logins">
        <button @click="$router.push('/login')">Sign in or register</button>
      </article>
    </section>

    <!-- what you see after logging in before you post a mixtape-->
    <section v-if="!$store.state.mixtapePosted">
      <MakeMixtapePage />
    </section>

    <!-- what you see after logging in after you post a mixtape-->
    <section v-if="$store.state.mixtapePosted">
      <!-- <header> -->
      <div class="heading">
        <h2>Welcome @{{ $store.state.username }}</h2>
        <h2>Today's prompt</h2>
        <h1>{{ $store.state.prompt.promptText }}</h1>
      </div>

      <center>
        <h2 v-if="$store.state.personalMixtape !== null">
          Here's what you responded to today's prompt
        </h2>
      </center>
      <MixtapeComponent
        v-if="$store.state.personalMixtape !== null"
        :mixtape="$store.state.personalMixtape"
      />
      <div class="heading">
        <h2>Here's how your friends responded to today's prompt</h2>
      </div>
      <!-- </header> -->
      <section v-if="$store.state.mixtapes.length" class="post-container">
        <MixtapeComponent
          v-for="mixtape in $store.state.mixtapes"
          :key="mixtape.id"
          :mixtape="mixtape"
        />
      </section>
      <article v-else>
        <center><h3>Your friends haven't posted any mixtapes yet!</h3></center>
      </article>
    </section>
  </main>
</template>

<script>
import MixtapeComponent from '@/components/Mixtape/MixtapeComponent.vue';
import MusicNowHeader from '@/components/common/MusicNowHeader.vue';
import MakeMixtapePage from '@/components/Mixtape/MakeMixtapePage.vue';
import PromptComponent from '@/components/Prompt/PromptComponent.vue';

export default {
  name: 'FeedPage',
  components: {
    MixtapeComponent,
    MakeMixtapePage,
    MusicNowHeader,
    PromptComponent
  },
  async beforeCreate() {
    if (!this.$store.state.username) {
      this.$router.push('/login');
    }
  },
  mounted() {
    if (this.$store.state.username) {
      this.$store.commit('refreshFeed');
    }
  },
  computed: {
    feedPrompt() {
      const prompt = this.$store.state.prompt.promptText;
      const promptSection = prompt.substring(25);
      return `${promptSection}`;
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

.general {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logins {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* header,
header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */

.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* text-align: center; */
}

.welcome {
  font-size: 50px;
  margin-bottom: 20px;
}

h3 {
  font-size: 20px;
  margin-bottom: 40px;
}

button {
  margin-right: 10px;
  width: 200px;
  height: 80px;
  margin-bottom: 10px;
  font-size: 30px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

.post-container {
  position: relative;
}

.viewport {
  margin: auto;
  width: 80vw;
}
</style>
