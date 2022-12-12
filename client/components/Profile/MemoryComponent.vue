<template>
  <router-link
    class="memory"
    style="text-decoration: none; color: black"
    :to="{name: 'Comments', params: {mixtapeId: mixtape._id}}"
  >
    <!-- <div class="square"></div> -->
    <img class="square" :src="mixtape.songs[0].albumCover" />
    <div class="content">
      {{ this.displayDate }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MemoryComponent',
  components: {},
  props: {
    // Data from the stored mixtape
    mixtape: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      displayDate: this.mixtape.date
    };
  },
  beforeMount() {
    this.parseDate();
  },
  methods: {
    parseDate() {
      this.displayDate = this.mixtape.date.slice(0, -6);
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.memory {
  margin: 2%;
  /* border: solid 3px rgb(176, 176, 176); */
  /* background-color: rgb(176, 176, 176); */
  border: solid 3px #009965;
  background-color: #009965;
  border-radius: 2px;
  height: 44%;
  width: 20%;
}
.memory:hover {
  /* background-color: rgb(84, 84, 84);
  border-color: rgb(84, 84, 84); */
  color: white;
  background-color: #004c33;
  border-color: #004c33;
}

.square {
  margin-top: 5%;
  margin-bottom: 2.5%;
  display: inline-block;
  border-radius: 2px;
  width: 75%;
}
</style>
