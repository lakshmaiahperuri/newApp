<template>
<div class="columns">
<div class="column is-4">
  <div class="card">
    <div class="card-content">
      <router-link to='/bookings'>
      <button class="button is-primary">Start Booking</button>
      </router-link>
      <router-view/>
    </div>
  </div>
</div>
<div class="column is-4">
  <div class="card">
    <div class="card-content">
      <router-link to="/bookingList">
  <button class="button is-primary">Booking List</button>
      </router-link>
      <router-view/>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>
.navbar{
  background-color: cadetblue;
}
a{
  background-color: honeydew;
}
.card{
  margin-top: 30px;
  height: 200px;
  width: 300px;
  margin-left: 250px;
}
button{
  margin-top:50px ;
  margin-left: 50px;
}
</style>