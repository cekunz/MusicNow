<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <div class="left">
          <section class="user-info">
            <div class="circle">
              <p class="circle-inner">RL</p>
            </div>
            <h2 class="info"> {{$store.state.profileFullname}} </h2>
            <h2 class="info"> @{{$store.state.profileUsername}} </h2>
            <p>Friends</p>
          </section>
        </div>
        <div class="right">
          <section class="user-info">
            <h2 class="">Memories</h2>
            <div class="rectangle">
              <div class="rectangle-inner">

              </div>
            </div>
          </section>
        </div>
        
        
      </header>
    </section>
  </main>
</template>



<script>

export default {
  name: 'ProfilePage',
  components: {},
  data() {
    return {
      alerts: {}, 
    };
  },
  beforeMount() {
    // if (!this.$route.params.name) {
    //   this.updating(this.$route.params.name);
    // }
    this.updating();
    // this.$store.commit('setProfileUsername', this.$route.params.name);

  },
  methods: {
    async updating() {
      const urlUser = this.$route.params.name ? `/api/users?username=${this.$route.params.name}` 
                                              : `/api/users?username=${this.$store.state.username}`;

      try {
        const rUser = await fetch(urlUser);
        const resUser = await rUser.json();

        if (!rUser.ok) {
          throw new Error(resUser.error);
        }

        this.$store.commit('setProfileUsername', resUser.username);
        this.$store.commit('setProfileFullname', resUser.fullName);
      } catch (e) {

      }
    }
  }
}

</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

header, header > * {
  display: flex;
  align-items: center;
}

.info{
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
  font-size: 30px;
}

.rectangle {
  display: inline-block;
  background-color: #ccc;
}

.rectangle-inner {
  color: black;
  height: 400px;
  width: 800px;
}

.user-info {
  text-align: center;
}
</style>
