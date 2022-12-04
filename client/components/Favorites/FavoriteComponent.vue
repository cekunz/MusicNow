<template>
    <article class="Favorite">
        <h1> Your Favorites </h1>
        <div class="content">
            <article v-for="song in favorites">
                <SongComponent :song="song" />
            </article>
        </div>
    </article>
</template>

<script>
import SongComponent from '@/components/Song/SongComponent.vue';
import store from '@/store.ts'

export default {
  name: 'FavoriteComponent',
  components: {SongComponent},
  props: {

  },
  data() {
    return {
        alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  computed: {
    favorites() {
        await store.refreshFavorites();
        return store.favorites.map(favorite => favorite.song);
    }
  },
  methods: {

  }
};
</script>

<style scoped>

.Favorite{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>