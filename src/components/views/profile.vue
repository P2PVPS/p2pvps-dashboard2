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
                <input type="text" class="form-control" placehold="Add your BCH address" v-on:keyup.enter="updateAddress" v-model="localAddress">
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>

    <!-- Menu Footer-->
    <li class="user-footer">
      <div class="pull-left">
        <a href="#" class="btn btn-default btn-flat" v-on:click="testBtn">Profile</a>
      </div>
      <div class="pull-right">
        <a href="/" class="btn btn-default btn-flat">Sign out</a>
      </div>
    </li>
  </ul>

</template>

<script>
let  globalThis;

export default {
  name: 'profile-view',
  props: {
    viewState: Boolean
  },
  watch: {
    // This function is triggered when the profile visibility is toggled.
    viewState: function(newVal, oldVal) {
      // Force the editFlag to update based on the store, when the profile view opened.
      this.editFlag = this.hasAddress
      // Force the localAddress to update to the store value.
      this.localAddress = this.bchAddress
    }
  },

  data() {
    return {
      editFlag: false,  // Determins if BCH address is an input box or a label.
      localAddress: ""  // BCH address displayed in this component.
    }
  },

  computed: {
    bchAddress: function() {
      return this.$store.state.userInfo.bchAddr
    },

    // Return true if an address has been saved to the user profile. False otherwise.
    hasAddress: function () {
      return !!this.bchAddress || !(this.bchAddress === "")
    },
  },

  methods: {
    updateAddress: async function() {
      globalThis = this;

      // Update the bchAddress for the user on the server.
      await persistAddressChange(this.$store, this.localAddress);
    },

    // Temporary. Just used for testing.
    testBtn: function() {
      console.log(`Button clicked!`)
      console.log(`editFlag: ${this.editFlag}`)
      console.log(`bchAddress: ${this.bchAddress}`)
      console.log(`hasAddress: ${this.hasAddress}`)
      console.log(`viewState: ${this.viewState}`)
    }
  },

  mounted: function() {
    //debugger;
    this.editFlag = this.hasAddress
  }
}

// Updates the user model on the server, as well as the Vuex store.
function persistAddressChange(thisStore, bchAddr) {
  //debugger;
  console.log(`persistAddressChange() address: ${bchAddr}`);

  return new Promise(function(resolve, reject) {
    //debugger;
    var tmpModel = {
      user: {
        bchAddr: bchAddr,
      },
    };

    $.ajax({
      type: "PUT",
      url: `/api/users/${thisStore.state.userInfo.GUID}`,
      headers: {
        Authorization: `Bearer ${thisStore.state.userInfo.token}`,
      },
      data: tmpModel,
      success: handleSuccess,
      dataType: "json",
      error: handleError,
    });

    function handleSuccess(data, textStatus, jqXHR) {
      //debugger;
      console.log(`User model updated on server.`);

      // Update the userInfo Store
      data.token = globalThis.$store.state.userInfo.token
      globalThis.$store.commit('SET_USER_ID', data);
      globalThis.editFlag = true;
      resolve(true);
    }

    function handleError(err) {
      debugger;
      return reject(new Error(err.responseText));
    }
  });
}

</script>

<style scoped>
</style>
