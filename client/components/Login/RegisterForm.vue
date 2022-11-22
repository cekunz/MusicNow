<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RegisterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/',
      method: 'GET',
      hasBody: false,
      setUsername: false,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'fullName', label: 'Full Name', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Create account',
      showTitle: true,
      callback: () => {
        const message = 'Successfully created an account!';
        this.$router.push({name: 'Home'});
        this.$set(this.alerts, message, 'not connected to backend yet');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
