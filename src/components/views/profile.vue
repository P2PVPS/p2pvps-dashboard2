<template>
  <ul class="dropdown-menu">
    <!-- User image -->
    <li class="user-header">
      <img src="/img/profile-placeholder-white-grey.jpg" class="img-circle" alt="User Image">

      <p style="color: black;">
        <!-- Alexander Pierce - Web Developer -->
        <small>{{ this.$store.state.userInfo.username }}</small>
      </p>
    </li>
    <!-- Menu Body -->

    <li class="user-body">
      <div class="row">
        <div class="col-xs-12 text-center">
          <p>BCH Address</p>
          <div >
            <p v-if="editFlag" v-on:click="editFlag=!editFlag"><small>{{ bchAddress }}</small></p>

            <form v-if="!editFlag" class="navbar-form">
              <div class="form-group">
                <input type="text" class="form-control" placehold="Add your BCH address" v-on:keyup.enter="updateAddress" v-model="bchAddress">
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>

    <!-- Menu Footer-->
    <li class="user-footer">
      <div class="pull-left">
        <a href="#" class="btn btn-default btn-flat">Profile</a>
      </div>
      <div class="pull-right">
        <a href="/" class="btn btn-default btn-flat">Sign out</a>
      </div>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'profile-view',
  data() {
    return {
      msg: 'This is the profile view',
      editFlag: false,
      bchAddress: this.$store.state.userInfo.bchAddress
    }
  },

  methods: {
    updateAddress: function() {

      // Update the bchAddress for the user on the server.
      persistAddressChange();

      // Toggle the form off and display the value.
      this.editFlag=!this.editFlag
    }
  },
}

// Updates the user model on the server, as well as the Vuex store.
function persistAddressChange() {
  
}

</script>

<style scoped>
</style>
