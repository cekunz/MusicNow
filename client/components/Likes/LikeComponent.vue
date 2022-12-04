<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- Reusable component for displaying the Music Now header that shows today's date -->

<template>
  <section class="like-container">
    <i class="fas fa-fire fa-lg" />
  </section>
</template>

<script>
export default {
  name: 'MusicNowHeader',
  data() {
    return {};
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 20px;
  position: relative;
}
.header-big-text {
  font-size: 60px;
  font-weight: normal;
  margin: 15px 15px;
}
.header-small-text {
  font-size: 30px;
  font-weight: normal;
  margin: 5px 5px;
}
.like-container {
  color: rgb(0, 0, 0);
  position: absolute;
  z-index: 1;
  right: 40px;
  top: 40px;
}

.like-container:hover {
  color: rgb(216, 12, 12);
}
</style>
