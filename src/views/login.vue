<template>
  <section class="hero ">
    <nav class="navbar"></nav>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-4-tablet is-6-desktop is-5-widescreen">
          <div class="card">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. Lakshmaiah@gmail.com" class="input" v-model="email" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input"  v-model="password" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
            </div>
            <div class="field">
              <button class="button is-success" @click.prevent="loginUser()">
                Login
              </button>
              <router-link to="/addingUser"><span class="icon" id= "create"></span><b>Create New Account</b></router-link>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>
<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import users from '../services/users';

export default ({
  setup() {
    const state = reactive({
      email: '',
      password: '',
    });
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const loginUser = async () => {
      console.log('aaaaaaaaaaaa', {
        name: state.name, email: state.email, mobile: state.mobile, password: state.password,
      });
      if (!state.email && !state.password) {
        toast.error('invalid credentials');
      }
      const { data } = await users.login({
        email: state.email, password: state.password,
      });
      const { token } = data;
      toast.success('LoggedIn Successfully');
      console.log(token, 'oopppps');
      store.commit('setLoggedInUser', data.user);
      localStorage.setItem('auth-token', token);
      console.log('userrrrrrrrrrrrr', data.user.role);
      if (data.user.role === 'admin') {
        router.push({ path: '/menu' });
      } else {
        router.push({ path: '/list' });
      }
      // console.log(product, 'Lakhsm');
    };
    return {
      ...toRefs(state),
      loginUser,
    };
  },
});

</script>
<style scoped>
.hero{
  background-image: linear-gradient(to right bottom,#ffffff,#6dd5fa,#2980b9);
}
section{
  height: 100vh;
}
#create{

}
</style>
