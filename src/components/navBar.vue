<template>
  <nav class="navbar">
  <div class="navbar-brand">

    <a class="navbar-item">Product Management</a>
    <o-button class="button" id ="btn1" :disabled="isDisabled" @click="myOrders()"> My Orders </o-button>
   <o-button class="button" id ="btn2" @click="logOut()">LogOut </o-button>
  <span class="icon">
  </span>
    <i class="fa fa-sign-out" aria-hidden="true"></i>
  </div>
</nav>
</template>
<script>
import { reactive, toRefs, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { useStore, mapState } from 'vuex';
import users from '../services/users';

export default ({
  setup() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();

    const logOut = () => {
      localStorage.removeItem('auth-token', store.state.loggedInUser.token);
      toast.success('logged out successfully ');
      router.push({ path: '/' });
    };
    const myOrders = () => {
      router.push({ path: '/purchaseList' });
    };
    const isDisabled = computed(() => store.state.loggedInUser.role === 'admin');
    return {
      logOut,
      isDisabled,
      myOrders,
    };
  },
});
</script>
<style scoped>
.navbar{
  background-color: cadetblue;
}
button{
  margin-top:10px ;
  margin-left: 50px;
}
#btn1{
margin-left: 720px;
}
.fa{
  margin-left: 1050px;
  font-size: 50px;
}
</style>
