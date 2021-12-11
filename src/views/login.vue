<template>
  <section class="hero ">
    <nav class="navbar"></nav>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6-tablet is-6-desktop is-5-widescreen">
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
              <label for="" class="checkbox">
                <input type="checkbox">
               Remember me
              </label>
            </div>
            <div class="field">
              <button class="button is-success" @click.prevent="loginUser()">
                Login
              </button>
              <router-link to="/signup"><span class="icon"></span><b>Create New Account</b></router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>


</template>
<script>
import { reactive, toRefs} from 'vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import users from '../services/users'

export default ({
  setup(){
    const state = reactive({ 
      email: '',
      password:''
    });
    const store = useStore();
    const router = useRouter();
    const loginUser = async () => {
      console.log('aaaaaaaaaaaa', {
        name: state.name, email: state.email, mobile: state.mobile, password:state.password
      });
      const user = await users.login({
       email: state.email, password:state.password
      });
      store.commit("setLoggedInUser", user);
      console.log('userrrrrrrrrrrrr', user.data.user.role)
      if(user.data.user.role === 'admin'){
      router.push({ path: '/add' });
      }
      else{
        router.push({ path: '/list' })
      }
      console.log(product,"Lakhsm");
    }
    return {
      ...toRefs(state),
      loginUser
    };
  },
  })

</script>
