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
          <section class="user-info">
            <h2 class="">Memories</h2>
            <div class="rectangle">
              <div class="rectangle-inner">
                <MemoryComponent
                  v-for="mixtape in $store.state.profileMixtapes"
                  :key="mixtape.id"
                  :mixtape="mixtape"
                />
              </div>
            </div>
          </section>
        </div>
      </header>
    </section>
  </main>
</template>

<script>
import MemoryComponent from '@/components/Profile/MemoryComponent.vue';
import FriendComponent from '@/components/FindFriends/FriendComponent.vue';
import FriendPopUp from '@/components/Profile/FriendPopUp.vue';

export default {
  name: 'ProfilePage',
  components: {FriendComponent, FriendPopUp, MemoryComponent},
  data() {
    return {
      isOpen: false,
      friendsList: this.friends
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
        this.$store.commit('setProfileMixtapes', resProfile.mixtapes);
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
}

.info {
  margin: 0px;
}

.left {
  width: 30%;
}

.right {
  width: 70%;
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

.rectangle-inner {
  margin: 2%;
  color: black;
  height: 400px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
}

.user-info {
  text-align: center;
}
</style>
