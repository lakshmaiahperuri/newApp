<template>
<div class="columns">
      <div class="column is-4">
        <div class="card">
       <p className="card-header-title is-centered"> Product Details</p>
       <div class="card-content">
          <div class="form-group">
    </div>
        <label class="label">Name</label>
        <input class="input" placeholder="Name" type="text"  v-model="name" required>
          <label class="label">Email</label>
        <input class="input" placeholder="Name" type="email"  v-model="email" required>
        <label class="label" >Mobile Number:</label>
        <input placeholder="Price" type="number" class="input" v-model="mobile" required>
          <label class="label">Password:</label>
        <input class="input" placeholder="Model" type="password" v-model="password" required>
        </div>
        <div class="box">
         <button class="button is-primary" @click="addUser()"  >SignUP</button>
        </div>
       </div>
        </div>
        </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import users from '../services/users';

export default ({
  setup() {
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
      console.log(product, 'Lakhsm');
    };
    return {
      ...toRefs(state),
      addUser,
    };
  },
});
</script>
