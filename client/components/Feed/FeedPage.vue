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
    <section v-if="!$store.state.username">>
      <header>
        <h2>Welcome to MusicNow!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
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
import FreetComponent from '@/components/Feed/FreetComponent.vue';
import CreateFreetForm from '@/components/Feed/CreateFreetForm.vue';
// import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import MakeMixtapePage from '@/components/Mixtape/MakeMixtapePage.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, CreateFreetForm, MakeMixtapePage},
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
