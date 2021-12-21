<template>
<section class="hero">
  <div class="hero-body">
   <div class="columns is-centered">
      <div class="column is-4">
        <div class="card">
       <p className="card-header-title is-centered"> User Details</p>
       <div class="card-content">
          <div class="form-group">
    </div>
        <label class="label">Name</label>
        <input class="input" placeholder="Name" type="text"  v-model="name" required>
          <label class="label">Email</label>
        <input class="input" placeholder="Email" type="email"  v-model="email" required>
        <label class="label" >Mobile Number:</label>
        <input placeholder="Mobile Number" type="number" class="input" v-model="mobile" required>
          <label class="label">Password:</label>
        <input class="input" placeholder="Password" type="password" v-model="password" required>
        </div>
        <div class="box">
         <button class="button is-primary" @click="addUser()"  >SignUP</button>
        </div>
       </div>
        </div>
        </div>
  </div>
</section>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import users from '../services/users';

export default ({
  setup() {
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      name: '',
      email: '',
      mobile: '',
      password: '',
    });

    const addUser = async () => {
      console.log('aaaaaaaaaaaa', {
        name: state.name, email: state.email, mobile: state.mobile, password: state.password,
      });
      const user = await users.createUser({
        name: state.name, email: state.email, mobile: state.mobile, password: state.password, role: 'admin',
      });
      toast.success('user added ');
      router.push({ path: '/' });
    };
    return {
      ...toRefs(state),
      addUser,
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
</style>
