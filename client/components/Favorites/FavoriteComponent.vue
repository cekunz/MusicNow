<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- Reusable component for displaying the Music Now header that shows today's date -->

<template>
  <section class="favorite-container circle">
    <!-- <div v-if="userHasLiked" class="liked" @click="removeLike">
      <i class="fas fa-fire fa-2x" />
    </div>
    <div v-else class="notLiked" @click="addLike">
      <i class="fas fa-fire fa-2x" />
    </div> -->
      <p class="circle-inner">
        <i class="fas fa-bookmark bookmark" />
      </p>
  </section>
</template>

<script>
export default {
  name: 'FavoriteComponent',
  props: {
    favoritedSongId: {type: String, required: true}
  },
  data() {
    return {};
  },
  computed: {
    /**
     * Compute if the user has favorited the object with this.favoritedObjectId
     */
    userHasFavorited() {
      return this.$store.state.favorites.includes(favoritedSongId);
    }
  },
  methods: {
    addFavorite() {
      this.$store.commit('addLike', this.like);
      this.submit(false);
    },
    removeLike() {
      this.$store.commit('removeLike', this.like);
      this.submit(true);
    },
    async submit(remove = false) {
      /**
       * Submits a form with the specified options from data().
       */
      const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };

      options.body = JSON.stringify({id: this.likedObjectId, remove: remove});

      try {
        const r = await fetch('/api/likes', options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.favorite-container {
  position: absolute;
  right: 10%;
  top: 0%;
  border-radius: 50%;
  background-color: white;
}
.liked {
  color: rgb(255, 126, 28);
  -webkit-animation-name: wiggle;
  -ms-animation-name: wiggle;
  -ms-animation-duration: 1000ms;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-iteration-count: 1;
  -ms-animation-iteration-count: 1;
  -webkit-animation-timing-function: ease-in-out;
  -ms-animation-timing-function: ease-in-out;
}
.liked:hover {
  color: rgb(223, 100, 0);
}

.notLiked {
  color: rgb(0, 0, 0);
}
.notLiked:hover {
  color: rgb(255, 143, 92);
}

.circle-inner {
  display: table-cell;
  text-decoration: none;
  height: 30px;
  width: 30px;
}

.bookmark {
  margin-top: 20%;
}

@-webkit-keyframes wiggle {
  0% {
    -webkit-transform: rotate(10deg);
  }
  25% {
    -webkit-transform: rotate(-10deg);
  }
  50% {
    -webkit-transform: rotate(20deg);
  }
  75% {
    -webkit-transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}

@-ms-keyframes wiggle {
  0% {
    -ms-transform: rotate(1deg);
  }
  25% {
    -ms-transform: rotate(-1deg);
  }
  50% {
    -ms-transform: rotate(1.5deg);
  }
  75% {
    -ms-transform: rotate(-5deg);
  }
  100% {
    -ms-transform: rotate(0deg);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(10deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
