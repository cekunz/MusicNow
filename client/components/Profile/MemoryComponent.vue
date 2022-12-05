
<template>
  <router-link 
    class="memory"
    style="text-decoration: none; color: black;" 
    :to="{name: 'Mixtape', params: {username: this.mixtape.creator, date: this.mixtape.date}}"
  > 
      <div class="square">
      </div>
      <div class="content">
        {{this.displayDate}}
      </div>
  </router-link>
</template>

<script>
import MixtapeComponent from '@/components/Mixtape/MixtapeComponent.vue';

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
  border: solid 3px rgb(176, 176, 176);
  background-color: rgb(176, 176, 176);
  border-radius: 2px;
  height: 44%;
  width: 20%;
}
.memory:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(84, 84, 84);
}

.square {
  margin-top: 10%;
  margin-bottom: 10%;
  display: inline-block;
  background-color: #ccc;
  border-radius: 2px;
  height: 60%;
  width: 75%;
}
</style>
