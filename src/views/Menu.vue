<template>
<div>
<nav class="navbar">
  <div class="navbar-brand">
    <router-link to="/menu">
    <a class="navbar-item">Product Management</a>
    </router-link>
    <i class="fa fa-sign-out" aria-hidden="true"></i>
  </div>
</nav>
<div>
<div class="columns">
<div class="column is-3">
  <div class="card">
    <div class="card-content">
      <router-link to='/addProduct'>
      <button class="button is-primary">Add Product</button>
      </router-link>
    </div>
  </div>
</div>
<div class="column is-3">
  <div class="card">
    <div class="card-content">
      <router-link to="/list">
  <button class="button is-primary">Products List</button>
      </router-link>
      <router-view/>
    </div>
  </div>
</div>
<div class="column is-3">
  <div class="card">
    <div class="card-content">
      <router-link to="/purchaseList">
  <button class="button is-primary">Purchased Products</button>
      </router-link>
      <router-view/>
    </div>
  </div>
</div>
</div>
</div>
</div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default ({
  setup() {
    const store = useStore();
    const router = useRouter();
    const logOut = async () => {
      localStorage.removeItem('auth-token', store.state.loggedInUser.token);
      router.push({ path: '/' });
    };
    return {
      
      logOut,
    };
  },
});
</script>
<style scoped>
.navbar{
  background-color: cadetblue;
}
.card{
  margin-top: 20px;
  height: 200px;
  width: 300px;
  margin-left: 185px;
}
button{
  margin-top:50px ;
  margin-left: 50px;
}
.icon{
  margin-left: 1200px;
}
.fa{
  margin-left: 1050px;
  font-size: 50px;
}
</style>
