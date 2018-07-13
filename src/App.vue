<template>
  <div id="app" style="border: 1px solid black">
    <header class="main-header">
      <!-- Logo -->
      <a href="index2.html" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>P2P VPS</b></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>P2P VPS</b></span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">

            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <!-- <a href="#" class="dropdown-toggle" data-toggle="dropdown"> -->
              <a href="#" class="dropdown-toggle" v-on:click="openDropDown">
                <img src="/img/profile-placeholder-white-grey.jpg" class="user-image" alt="User Image">
                <span class="hidden-xs">{{ this.$store.state.userInfo.username }}</span>
              </a>
              <profile-view></profile-view>

            </li>

            <!-- Control Sidebar Toggle Button -->
            <!--
            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
            -->
          </ul>
        </div>
      </nav>
    </header>

    <!-- Vue Components -->
    <left-menu></left-menu>
    <activeView></activeView>
    <modalView></modalView>

  </div>
</template>


<script>
  import LeftMenu from './components/LeftMenu'
  import ActiveView from './components/ActiveView.vue'
  import ModalView from './components/views/modal.vue'
  import ProfileView from './components/views/profile.vue'

  export default {
    name: 'app',
    components: {
      LeftMenu,
      ActiveView,
      ModalView,
      ProfileView
    },
    data: function () {
      return {
        modalShow: false,
        deviceUpdateTimer: null
      }
    },

    methods: {
      // Toggles the drop-down.
      openDropDown: function() {
        const dropDown = $('.dropdown-toggle');
        if(dropDown.parent().hasClass('open')) {
          dropDown.parent().removeClass('open')
        } else {
          dropDown.parent().addClass('open')
        }

      }
    },


    // Executes after the SPA has finished loading.
    mounted: function () {
      // Retrieve the GUID for the currently logged in user
      const guid = this.$store.state.userInfo.GUID
      //console.log(`guid: ${guid}`)

      if(guid === '' || guid === 'Not Logged In') {
        // Prevent the user from dismissing the modal with the ESC button.
        $('.appModal').attr('data-keyboard', 'false')

        // Display the login modal.
        this.$store.dispatch('getId')

        // Hide the close button on the modal, to prevent user from accidentally
        // circumventing the login.
        $('#modalClose').hide()
      }
    }
  }
</script>


<style>
/*
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*/
</style>
