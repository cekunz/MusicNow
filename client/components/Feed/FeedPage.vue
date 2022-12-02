<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.mixtapePosted===false && $store.state.username">
      <MakeMixtapePage />
    </section>

    <section v-if="$store.state.mixtapePosted===true && $store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
    </section>

    <section class="general" v-if="!$store.state.username">
      <h3 class="welcome" >Welcome to MusicNow</h3>
      <h3>The app for finding new music with your friends through a daily prompted mixtape.</h3>
      <article class="logins">
          <button @click="$router.push('/login')">Log In</button>
          <button @click="$router.push('/register')">Register</button>
      </article>
    </section>

    <section v-if="$store.state.mixtapePosted===true && $store.state.username">
      <header>
        <div class="left">
          <h2>
            Viewing all Mixtapes
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import MixtapeComponent from '@/components/Feed/MixtapeComponent.vue';
import CreateFreetForm from '@/components/Feed/CreateFreetForm.vue';
import MusicNowHeader from '@/components/common/MusicNowHeader.vue';
import MakeMixtapePage from '@/components/Mixtape/MakeMixtapePage.vue';

export default {
  name: 'FeedPage',
  components: {MixtapeComponent, CreateFreetForm, MakeMixtapePage, MusicNowHeader},
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

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.welcome {
  font-size: 50px;
  margin-bottom: 20px;
}

h3 {
  font-size:20px;
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
</style>

