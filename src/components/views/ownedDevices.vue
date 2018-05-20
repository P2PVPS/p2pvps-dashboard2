<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <p>
            This section is used to register new devices on the network. Follow
            <a href="https://p2pvps.org/install-client/" target="_blank">these instructions</a>
            to register your device.
          </p>
        </div>
      </div>
    </div>


    <div class="container">
      <device-listing-item v-for="device in devices" :key="device._id" v-bind:device="device"></device-listing-item>

      <hr style="border-top: 2px solid #000;">

      <div class="row">
        <div class="col-md-12">
          <button v-on:click="showForm = !showForm" type="button" class="btn btn-success" id="addNewDeviceBtn" style="margin-top: 10px; margin-bottom: 20px;">+ Add New Device</button>
        </div>
      </div>

      <transition name="fade">
        <div v-if="showForm" class="row addNewDeviceForm">
          <div class="col-sm-12">
            <form>
              <div class="form-group">
                <label for="deviceName">Device Name</label>
                <input v-model="deviceName" type="text" class="form-control" id="deviceName" placeholder="">
              </div>
              <div class="form-group">
                <label for="deviceDescription">Description</label>
                <textarea v-model="deviceDesc" class="form-control" id="deviceDescription" rows="6"></textarea>
              </div>

              <button type="button" class="btn btn-default" id="submitButton" v-on:click="addDevice()">Submit</button>
            </form>
          </div>
        </div>
      </transition>

    </div>

  </section>
</template>

<script>
  import deviceListingItem from './ownedDevicesComponents/deviceListingItem.vue'

  export default {
    name: 'ownedDevices',
    data () {
      return {
        msg: 'This is the owned devices view.',
        showForm: false,
        deviceName: '',
        deviceDesc: ''
      }
    },
    components: {
      deviceListingItem
    },

    computed: {
      devices () {
        return this.$store.state.ownedDevices
      }
    },

    methods: {
      addDevice: async function () {
        // debugger
        try {
          // Maintain scope inside the callback functions
          var ownerId = this.$store.state.userInfo.GUID
          var token = this.$store.state.userInfo.token
          var thisStore = this.$store

          // Error Handling
          if ((this.deviceName === '') || (this.deviceDesc === '')) {
            console.log('Launch modal.')
            return
          }

          // Register a new public device model on the server.
          // (This will also create a private model)
          var deviceModel = {
            ownerUser: ownerId,
            deviceName: this.deviceName,
            deviceDesc: this.deviceDesc
          }
          var device = await createDevice(token, deviceModel)

          // Update the Vues store with device info.
          thisStore.dispatch('getDeviceData')
        } catch(err) {
          console.error(`Error in ownedDevices.vue/addDevice(): `, err)
        }

        /*
        $.post('/api/devices', deviceModel, function (data) {
          // debugger
          var newPublicModel = data.collection

          // Register a new private device model on the server.
          var privateModel = {
            ownerUser: ownerId,
            publicData: newPublicModel._id
          }
          $.post('/api/devicePrivateData/create', privateModel, function (data) {
            // debugger
            var newPrivateModel = data.collection

            // Update the public model with the privateModel ID
            newPublicModel.privateData = newPrivateModel._id
            $.post('/api/devicePublicData/' + newPublicModel._id + '/update', newPublicModel, function (data) {
              // debugger

              // Refresh the Store.
              if (thisStore.state.userInfo.GUID !== 'Not Logged In') {
                thisStore.dispatch('getDeviceData')
              }
            })
            .fail(function (jqxhr, textStatus, error) {
              console.error('API call to /api/devicePublicData/' + newPublicModel._id + '/update unsuccessful. Error: ' + jqxhr.responseJSON.detail)
            })
          })
          .fail(function (jqxhr, textStatus, error) {
            console.error('API call to /api/devicePrivateData/create unsuccessful. Error: ' + jqxhr.responseJSON.detail)
          })
        })
        .fail(function (jqxhr, textStatus, error) {
          console.error('API call to /api/devicePublicData/create unsuccessful. Error: ' + jqxhr.responseJSON.detail)
        })
        */
        // Hide the form
        this.showForm = false
        this.deviceName = ''
        this.deviceDesc = ''
      }
    }
  }

  // Creates a new device model.
  function createDevice(token, deviceData) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'POST',
        url: '/api/devices',
        data: {
          device: deviceData
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        success: handleSuccess,
        dataType: 'json',
        error: handleError
      })

      function handleSuccess(data, textStatus, jqXHR) {
        //debugger
        resolve(data.device)
      }

      function handleError(err) {
        debugger
        reject(err)
      }
    })
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
