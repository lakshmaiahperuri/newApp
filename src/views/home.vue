<template>
<div>
<nav class="navbar is-primary">
  <div class="navbar-brand" id="header1" >Product Management</div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="https://bulma.io/">
        Home
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown is-boxed">
          <router-link to="/lists">
          <a class="navbar-item" >
           All The Products
           </a>
           </router-link>
          <router-link to="/add">
          <a class="navbar-item" >
           Add New Product
          </a>
          </router-link>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
<div class="menu">
<aside class="menu">
    <p class="menu-label">Main Menu</p>
    <ul class="menu-list">
      <li>
        <a>
       Total Products :
        </a>
      </li>
      <li>
        <a>
       Pusrchased Products :
        </a>
      </li>
      <li>
        <a>
       Help
        </a>
      </li>
    </ul>
  </aside>
</div>
</div>
 </template>