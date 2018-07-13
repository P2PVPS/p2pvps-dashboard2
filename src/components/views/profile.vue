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
          <div v-on:click="editFlag=!editFlag">
            <p v-if="editFlag"><small>{{ this.$store.state.userInfo.bchAddress }}</small></p>
            <p v-if="!editFlag">test</p>
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
      editFlag: false
    }
  },

  methods: {
    logOut: function () {
      $.post('/keystone/api/session/signout', '', function (data) {
        if (!data.success) {
          console.error('Something went wrong with trying to log out. See App.vue logOut() method.')
        }
      })
    }
  },
}

</script>

<style scoped>
</style>
