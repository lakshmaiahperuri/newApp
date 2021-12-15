<template>
  <nav class="navbar">
  <div class="navbar-brand">
    <router-link to="/menu">
    <a class="navbar-item">Product Management</a>
    </router-link>
  </div>
</nav>
  <router-view/>
</template>

<style scoped>
.navbar{
  background-color: cadetblue;
}
</style>
