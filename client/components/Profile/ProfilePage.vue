<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <div class="left">
          <section class="user-info">
            <div class="circle">
              <p class="circle-inner">{{ $store.state.profileCircle }}</p>
            </div>
            <h2 class="info">{{ $store.state.profileFullname }}</h2>
            <h2 class="info">@{{ $store.state.profileUsername }}</h2>
            <button @click="open">
              {{ $store.state.profileFriends.length }} Friends
            </button>
            <FriendPopUp
              v-if="this.isOpen == true"
              @close="close"
              :friends="$store.state.profileFriends"
            />
          </section>
        </div>
        <div class="right">
          <section class="memory-info">
            <h2>Memories</h2>
            <div class="rectangle">
              <div class="memory-rectangle">
                <MemoryComponent
                  v-for="mixtape in this.memoriesToShow"
                  :key="mixtape.id"
                  :mixtape="mixtape"
                />
              </div>
              <div 
                class="show-more"
                v-if="this.showMoreMemories"
              >
              <router-link
                style="text-decoration: none; color: black"
                :to="{name: 'Memories'}"
              >
                View All →
              </router-link>
            </div>
            </div>
          </section>
        </div>
      </header>
      <footer>
        <section class="user-info">
          <h2>Saved Songs</h2>
          <div class="rectangle">
            <div class="favorites-rectangle">
              <SongComponent
                v-for="favorite in this.favoritesToShow"
                class="profile-song"
                :trackName="favorite.song.songTitle"
                :artist="favorite.song.songArtist"
                :trackId="favorite.song.trackId"
                :albumCover="favorite.song.songTitle"
              />
              <div
                class="view-all-box profile-song"
                v-if="this.showMoreFavorites"
              >
                View All →
              </div>
            </div>
          </div>
        </section>
      </footer>
    </section>
  </main>
</template>

<script>
import MemoryComponent from '@/components/Profile/MemoryComponent.vue';
import SongComponent from '@/components/Song/SongComponent.vue';
import FriendComponent from '@/components/FindFriends/FriendComponent.vue';
import FriendPopUp from '@/components/Profile/FriendPopUp.vue';

export default {
  name: 'ProfilePage',
  components: {FriendComponent, FriendPopUp, MemoryComponent, SongComponent},
  data() {
    return {
      isOpen: false,
      friendsList: this.friends,
      memoriesToShow:
        this.$store.state.profileMixtapes.length > 8
          ? this.$store.state.profileMixtapes.slice(0, 8)
          : this.$store.state.profileMixtapes,
      showMoreMemories: this.$store.state.profileMixtapes.length > 8,
      favoritesToShow:
        this.$store.state.profileFavorites.length > 7
          ? this.$store.state.profileFavorites.slice(0, 6)
          : this.$store.state.profileFavorites,
      showMoreFavorites: this.$store.state.profileFavorites.length > 7
    };
  },
  beforeMount() {
    this.updating();
  },
  methods: {
    async updating() {
      const urlProfile = this.$route.params.name
        ? `/api/profile?username=${this.$route.params.name}`
        : `/api/profile?username=${this.$store.state.username}`;

      try {
        const rProfile = await fetch(urlProfile);
        const resProfile = await rProfile.json();

        if (!rProfile.ok) {
          throw new Error(resProfile.error);
        }

        this.$store.commit('setProfileUsername', resProfile.username);
        this.$store.commit('setProfileFullname', resProfile.fullName);
        this.$store.commit('setProfileCircle', resProfile.fullName[0]);
        this.$store.commit('setProfileFriends', resProfile.friends);
        this.$store.commit('setProfileMixtapes', resProfile.mixtapes.reverse());
        this.$store.commit(
          'setProfileFavorites',
          resProfile.favorites.reverse()
        );
      } catch (e) {}
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

header,
header > * {
  display: flex;
  align-items: center;
}

button {
  padding: 10px;
  font-size: 20px;
  align-self: center;
  margin-top: 30px;
  border: solid 1px #ccc;
  background-color: #ccc;
  border-radius: 2px;
  width: 50%;
}

button:hover {
  background-color: rgb(54, 54, 54);
  color: white;
  border-color: rgb(54, 54, 54);
  cursor: pointer;
}

.info {
  margin: 0px;
}

.left {
  width: 30%;
}

.right {
  width: 70%;
  justify-content: flex-end;
}

.circle {
  display: inline-block;
  background-color: #ccc;
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 50%;
}

.circle-inner {
  color: black;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  height: 250px;
  width: 250px;
  font-size: 120px;
}

.rectangle {
  display: inline-block;
  background-color: #ccc;
}

.memory-rectangle {
  margin: 2%;
  color: black;
  height: 50vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.favorites-rectangle {
  margin: 2%;
  color: black;
  height: 15vh;
  width: 96%;
  display: flex;
  gap: 2%;
}

.profile-song {
  width: 12.5%;
  height: 100%;
}

.view-all-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  /* height: 110px; */
  border: solid 3px rgb(24, 23, 23);
  border-radius: 2px;
}

.view-all-box:hover {
  text-decoration: underline;
  cursor: pointer;
}

.user-info {
  text-align: center;
}
.memory-info {
  text-align: center;
  width: 100%;
}
.show-more {
  margin-bottom: 0.05%;
  margin-right: 1%;
  float: right;
}

.show-more:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
