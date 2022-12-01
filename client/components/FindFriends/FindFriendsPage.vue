<!-- User should be authenticated in order to see this page -->

<template>
  <main>
      <header>
        Find Friends
      </header>
      <!-- <form id="form"> -->
        <center class ="search">
         <textarea
            class="searchbar"
            rows="1"
            @input="usernameQuery = $event.target.value"
            placeholder="Search for Friends"
            style="resize: none"
          />
         <button 
          @click="filterUsers"
         > 
          🔎
         </button>
        </center>
      <!-- </form> -->
  </main>
</template>



<script>
import GetFriendsForm from '@/components/FindFriends/GetFriendsForm.vue';

export default { 
  name: 'FindFriendsPage',
  components: {GetFriendsForm},
  data() {
    return {
      usernameQuery: '',
      alerts: {}, 
    };
  },
  methods: {
    filterUsers() {
      // const usernameQuery = document.getElementById("query").value;

      if (this.usernameQuery.length === 0) {
        const error = 'Error: Search cannot be empty.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      // when a username is passed in, call to the store to filter users
      // based on users that contain the full string 
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
}

button:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(54, 54, 54);
}

</style>
