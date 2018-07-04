<template>
  <section class="content">
    <div class="container">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-sm-12">
          <p>
            This is the rented devices view. This view will hold information about
            your rented devices; information like ports, logins, and passwords.
            <b>This view has not yet been implemented.</b>
          </p>
        </div>

      </div>
      <!-- /.row (main row) -->
    </div>


    <div class="container">
      <rented-device-item v-for="device in devices" :key="device._id" v-bind:device="device"></rented-device-item>

      <hr style="border-top: 2px solid #000;">

      <div class="row">
        <div class="col-md-12">
          <button v-on:click="showForm = !showForm" type="button" class="btn btn-success" id="addNewRentalBtn" style="margin-top: 10px; margin-bottom: 20px;">
            + Add New Rental
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="showForm" class="row addNewRentalForm">
          <div class="col-sm-12">
            <form>
              <div class="form-group">
                <p>
                  When your rental contract was fulfilled in OpenBazaar, you recieved a <b>Dash ID</b>.
                  Enter it below, to manage your rental in this dashboard.
                </p>
                <label for="dashId">Dashboard ID</label>
                <input v-model="dashId" type="text" class="form-control" id="dashId" placeholder="">
              </div>

              <button type="button" class="btn btn-default" id="submitButton" v-on:click="addRental()">Submit</button>
            </form>
          </div>
        </div>
      </transition>
    </div>

  </section>
</template>

<script>
import rentedDeviceItem from "./rentedDevicesComponents/rentedDeviceItem.vue";

export default {
  name: "rentedDevices",
  data() {
    return {
      msg: "This is the rented devices view.",
      showForm: false,
      dashId: "",
      privateDataModels: [],
    };
  },
  components: {
    rentedDeviceItem,
  },
  computed: {
    devices() {
      return this.privateDataModels;
    },
  },
  methods: {
    // User clicked the button to manually add a rental via DashID.
    addRental: async function() {
      try {
        // No empty input
        if (this.dashId === "") {
          console.log("Launch modal.");
          return;
        }

        // Validate the input ID.
        if (!this.dashId.match(/^[0-9a-zA-Z]{10}$/)) {
          console.log("Invalid Dash ID");
          return;
        }

        const thisStore = this.$store;
        const userInfo = thisStore.state.userInfo;
        const token = userInfo.token;

        // Get private model data from dash ID.
        const privateModel = await getPrivateModel(token, this.dashId);
        debugger;
        // Save dash ID to user profile.
        userInfo.dashIds.push(this.dashId);
        await saveUserDashIds(thisStore, userInfo.dashIds);
        console.log(`privateModel: ${JSON.stringify(privateModel, null, 2)}`);

        // Hide the form
        this.showForm = false;
        this.deviceId = "";
      } catch (err) {
        throw err;
      }
    },
  },

  // Retrieve rental data from the server for the current user.
  mounted: async function() {
    debugger;
    // Get the list of saved Dash IDs from the user profile.
    const dashIds = this.$store.state.userInfo.dashIds;

    const token = this.$store.state.userInfo.token;
    const globalThis = this;

    // Download private model data for each DashID in the list.
    for (var i = 0; i < dashIds.length; i++) {
      const thisDashId = dashIds[i];

      try {
        const thisPrivateModel = await getPrivateModel(token, thisDashId);
        debugger;
        globalThis.privateDataModels.push(thisPrivateModel);
      } catch (err) {
        console.log(`err: ${JSON.stringify(err, null, 2)}`);
        debugger;
        console.log(`DashID ${thisDashId} not found, remove from user profile.`);

        // Remove the selected DashID from the user info.
        const newDashIds = dashIds.filter(function(item) {
          return item !== thisDashId;
        });

        // Update the user model on the server.
        saveUserDashIds(this.$store, newDashIds);
      }
    }
  },
};

// Returns a promise.
// Retrieves a device private model given a Dashboard ID.
function getPrivateModel(token, dashId) {
  return new Promise(function(resolve, reject) {
    debugger;
    $.ajax({
      type: "GET",
      url: `/api/deviceprivatedata/dashid/${dashId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: handleSuccess,
      dataType: "json",
      error: handleError,
    });

    function handleSuccess(data, textStatus, jqXHR) {
      debugger;
      return resolve(data.devicePrivateData);
    }

    // If the dash ID can't be found.
    function handleError(err) {
      debugger;
      return reject(new Error(err.responseText));
    }
  });
}

// Update the dashIds field of the user model on the server.
function saveUserDashIds(thisStore, dashIds) {
  return new Promise(function(resolve, reject) {
    debugger;
    // Create a publicDeviceModel from data in the store.
    var tmpModel = {
      user: {
        dashIds: dashIds,
      },
    };

    //return new Promise(function(resolve, reject) {
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
      resolve(true);
    }

    function handleError(err) {
      debugger;
      return reject(new Error(err.responseText));
    }
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  */
</style>
