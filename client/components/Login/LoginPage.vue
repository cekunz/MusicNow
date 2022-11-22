<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <MusicNowHeader />
    <article class="forms-container">
      <LoginForm />
      <section class="signup-section">
        <p>Dont have an account?</p>
        <button>Sign Up</button>
      </section>
    </article>
  </main>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';
import LoginForm from '@/components/Login/LoginForm.vue';
import MusicNowHeader from '@/components/common/MusicNowHeader.vue';

export default {
  name: 'LoginPage',
  components: {
    RegisterForm,
    LoginForm,
    MusicNowHeader
  }
};
</script>

<style scoped>
.forms-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 32%;
}

.signup-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 4px;
  padding: 1rem 4rem;
  padding-bottom: 2rem;
  margin-top: 8px;
}

button {
  font-size: 15px;
  padding: 4px;
  margin-top: 8px;
  height: 2em;
  width: 100%;
}
</style>
