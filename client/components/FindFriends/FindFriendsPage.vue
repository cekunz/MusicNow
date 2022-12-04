<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <div v-if="searchPage===true" >
      <header>
        Find Friends
      </header>
        <center class ="search">
         <textarea
            class="searchbar"
            rows="1"
            @input="usernameQuery = $event.target.value"
            placeholder="Search for Users..."
            style="resize: none"
          />
         <button 
          @click="filterUsers"
         > 
          🔎
         </button>
        </center>
        <div class="friends"
        v-if="friendsToShow.length>0"
        >
        <FriendComponent
          v-for="user in friendsToShow"
          :key="user"
          :friend="user"
          :confirmed="false"
        />
        </div>
        <div class="friends" v-else>
          <h2> There are currently no other users to add as friends, check back later! </h2>
        </div>


    </div>
     <div class="friends" v-if="yourFriends===true" >
      <header>
        Your Friends
      </header>
      <div  v-if="$store.state.friends.length>0">
         <FriendComponent
          v-for="user in $store.state.friends"
          :key="user"
          :friend="user"
          :confirmed="true"
        />
      </div>
      <div  v-else>
        <h2> You currently haven't added any friends, send a friend request to get started! </h2>
      </div>
    </div>
    <div v-if="requestsPage===true" >
      <header>
        Friend Requests
      </header>
      <div v-if="$store.state.friendRequests.length>0" >
         <FriendComponent
          v-for="user in $store.state.friendRequests"
          :key="user"
          :friend="user"
          :confirmed="false"
         />
        </div>
        <div class="friends" v-else>
          <h2> You currently have no friend requests, check back later! </h2>
      </div>
    </div>
    


     <footer>
        <center>
         <button class="inactive"
         v-if="!searchPage"
          @click="searchPageToggle"
         > 
          Search for Friends
         </button>
          <button class="active"
          v-if="searchPage"
          @click="searchPageToggle"
         > 
          Search for Friends
         </button>

          <button class="inactive"
          v-if="!yourFriends"
          @click="yourFriendsToggle"
         > 
          Your Friends
         </button>
          <button class="active"
           v-if="yourFriends"
          @click="yourFriendsToggle"
         > 
          Your Friends
         </button>

          <button class="inactive"
           v-if="!requestsPage"
          @click="requestsPageToggle"
         > 
          Friend Requests
          </button>   
          <button class="active"
            v-if="requestsPage"
          @click="requestsPageToggle"
         > 
          Friend Requests
         </button>
         </center>
      </footer>
  </main>
</template>



<script>
import GetFriendsForm from '@/components/FindFriends/GetFriendsForm.vue';
import FriendComponent from '@/components/FindFriends/FriendComponent.vue';

export default { 
  name: 'FindFriendsPage',
  components: {GetFriendsForm, FriendComponent},
  data() {
    return {
      usernameQuery: '',
      alerts: {},
      searchPage: true,
      yourFriends: false,
      requestsPage: false, 
      
    };
  },
  computed: {
    friendsToShow() {
      return this.$store.state.nonFriends.splice(0,5); 
    }
  },
  mounted() {
      this.$store.commit('refreshFriends');
      this.$store.commit('refreshFriendRequests');
  },
  methods: {
    filterUsers() {
      if (this.usernameQuery.length === 0) {
        const error = 'Error: Search cannot be empty.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      // when a username is passed in, call to the store to filter users
      // based on users that contain the full string 
    },
    searchPageToggle() {
      this.searchPage = true;
      this.yourFriends = false;
      this.requestsPage = false;
    },
    yourFriendsToggle() {
      this.searchPage = false;
      this.yourFriends = true;
      this.requestsPage = false;
      this.$store.commit('refreshFriends');   
    },
    requestsPageToggle() {
      this.searchPage = false;
      this.yourFriends = false;
      this.requestsPage = true;
      this.$store.commit('refreshFriendRequests');
    }
  }
}

</script>

<style scoped>
header {
  /* margin: auto; */
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 50px;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 2rem;
}

.friends {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.searchbar {
  /* text-align: center; */
  font-size: 25px;
  padding: 15px;
  /* align-content: center; */
  /* margin-top: 10px; */
  /* border: solid 4px rgb(192, 192, 192); */
  width: 50%;
  position: relative;

}

button {
  position: relative;
  padding: 15px;
  font-size: 20px;
  margin-left: 2px;
}

button:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(54, 54, 54);
}


.active {
  background-color: rgb(28, 28, 28);
  color: white;
  border-color: rgb(54, 54, 54);
}

</style>
