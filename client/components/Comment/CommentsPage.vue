<!-- eslint-disable vue/max-attributes-per-line -->
<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main class="viewport">
    <section>
      <header>
        <h2>Comments Section</h2>
      </header>
      <MixtapeComponent v-if="mixtape !== undefined" :mixtape="mixtape" />
    </section>
    <section v-if="$store.state.username">
      <CreateCommentsForm :mixtape-id="$route.params.mixtapeId" />
    </section>
    <section v-if="$store.state.mixtapes.length">
      <CommentComponent
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
      />
    </section>
  </main>
</template>

<script>
import MixtapeComponent from '@/components/Mixtape/MixtapeComponent.vue';
import CommentComponent from '@/components/Comment/CommentComponent.vue';
import CreateCommentsForm from '@/components/Comment/CreateCommentsForm.vue';

export default {
  name: 'CommentsPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MixtapeComponent,
    CreateCommentsForm,
    CommentComponent
  },
  props: {},

  data() {
    return {};
  },
  computed: {
    mixtape() {
      // look for mixtapes in current feed and profile
      const allMixtapes = [
        ...(this.$store.state.mixtapes ?? []),
        ...(this.$store.state.profileMixtapes ?? [])
      ];
      for (const mixtape of allMixtapes) {
        if (this.$route.params.mixtapeId === mixtape._id) {
          return mixtape;
        }
      }
      return undefined;
    },
    comments() {
      return this.$store.state.comments ?? [];
    }
  },
  created() {
    if (this.mixtape !== undefined) {
      this.$store.commit('setComments', this.$route.params.mixtapeId);
    }
  }
};
</script>

<style>
.viewport {
  margin: auto;
  width: 70%;
}
</style>
