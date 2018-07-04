<template>

  <div class="container">
    <div id="deviceList">
      <!-- Device list will populate this div -->

      <!-- Template scaffold -->
      <!--
      <div class="row deviceScaffold" style="margin: 10px; border-radius: 25px; border: 1px solid black;">
        <h3>Device ID:
          <span class="deviceId">{{ device._id }}</span>
          <span class="pull-right">
            <button class="btn btn-danger deviceDelete" style="margin-right: 30px;" v-on:click="showDeleteModal()">Delete</button>
          </span>
        </h3>
        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="nice-border">
            <h4><strong>Status:</strong> <span v-bind:class="statusText" class="deviceConnectionStatus">{{ clientStatus }}</span></h4>
            <p><strong>Last Check-In:</strong> {{ formatTimeStamp }}</p>
          </div>
          <div class="nice-border">
            <h4><u>Device Specs:</u></h4>
            <ul>
              <li><strong>Memory:</strong> <span class="deviceMemory">{{ device.memory }}</span></li>
              <li><strong>Disk Space:</strong> <span class="deviceDiskSpace">{{ device.diskSpace }}</span></li>
              <li><strong>Internet Speed:</strong> <span class="deviceInternetSpeed">{{ device.internetSpeed }}</span></li>
              <li><strong>Processor:</strong> <span class="deviceProcessor">{{ device.processor }}</span></li>
            </ul>
          </div>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="nice-border" style="min-height: 230px;">
            <div>
              <h4><u>Name:</u> <span class="deviceName">{{ device.deviceName }}</span></h4>
              <h4><u>Description:</u></h4>
              <div class="deviceDescription">
                <p>{{ device.deviceDesc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <div class="nice-border" style="max-height: 300px; overflow-y: scroll; min-height: 230px;">
            <div>
              <h4><u>Money Earned:</u> <span>${{ device.moneyOwed }}</span></h4>

              <h4><u>Reviews:</u></h4>
              <div class="deviceReviews">
                <p>3/5 - Randy</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent odio enim, tempus et venenatis non, sagittis sit amet augue.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      -->

      <!-- This will be removed. Temporarily here to show device login data. -->
      <div class="row well">
        <div class="col-sm-12">
          <p class="pull-right"><i>This information will be removed</i></p>
          <ul class="list-inline">
            <li><strong>SSH server: </strong><span>p2pvps.net</span></li>
            <li><strong>port: </strong><span>{{ device.serverSSHPort }}</span></li>
            <li><strong>login: </strong><span>{{ device.deviceUserName }}</span></li>
            <li><strong>password: </strong><span>{{ device.devicePassword }}</span></li>
          </ul>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'deviceListingItem',
    data () {
      return {
        msg: 'This is a listed device item.',
        statusText: 'text-red', // 0 = red, 1 = yellow, 2 = green
        marketBtnDisabled: true,
        marketBtnText: 'Submit to Market',
        marketButtonState: 'btn-primary'
      }
    },
    props: ['device'],

    computed: {

      // Format the time stamp into an easy to read format.
      formatTimeStamp: function () {
        var timeStamp = new Date(this.device.checkinTimeStamp)
        return timeStamp.toLocaleString()
      },

      // Format the client status, based on the time stamp.
      clientStatus: function () {
        // debugger

        var statusText = 'Not Connected'

        // Convert all times to milliseconds
        var now = new Date()
        now = now.getTime()
        var timeStamp = new Date(this.device.checkinTimeStamp)
        timeStamp = timeStamp.getTime()
        var twoMin = 1000 * 60 * 2 // number of milliseconds in two minutes

        var goodThreshold = now - twoMin * 2
        var mediumThreshold = now - twoMin * 4
        // var badThreshold = now - twoMin * 5

        if (timeStamp > goodThreshold) {
          this.statusText = 'text-green'
          // this.marketBtnDisabled = false
          statusText = 'Connected'
        } else if (timeStamp > mediumThreshold) {
          this.statusText = 'text-yellow'
          // this.marketBtnDisabled = true
          statusText = 'Delayed'
        } else {
          this.statusText = 'text-red'
          // this.marketBtnDisabled = true
          statusText = 'Not Connected'
        }

        // If the device has not been submitted to the market, control if the button is enabled or disabled.
        if (!this.device.obContract) {
          if (statusText === 'Connected') {
            this.marketBtnDisabled = false
          } else if (statusText === 'Delayed') {
            this.marketBtnDisabled = true
          } else {
            this.marketBtnDisabled = true
          }

        // If the device has already been submitted to the market
        } else {
          this.marketBtnDisabled = false // Enable the button.
          this.marketButtonState = 'btn-danger' // Turn the button red.
          this.marketBtnText = 'Remove from Market' // Change the label of the button.
        }

        return statusText
      }
    },

    methods: {
      // Show the modal when the user clicks on the delete button.
      showDeleteModal: function () {
        // debugger

        var modalState = this.$store.state.modal

        // Display a modal to the user
        modalState = {
          show: true,
          title: 'Are you sure?',
          body: 'Are you sure you want to delete this device entry?',
          button1Text: 'No',
          button1Func: function () { $('.appModal').modal('hide') },
          button1Show: true,
          button2Text: 'Yes',
          button2Func: this.deleteDevice,
          button2Show: true
        }

        this.$store.commit('UPDATE_MODAL', modalState)
      },

      deleteDevice: function () {
        // debugger

        // Hide the modal
        $('.appModal').modal('hide')

        // Delete the device on the server
        this.$store.dispatch('deleteDevice', this.device._id)
      },

      marketBtnCtl: function () {
        // Submit to market if there is no obContract associates with this device.
        if (!this.device.obContract) {
          this.submitToMarket()

        // Remove the obContract associated with this device.
        } else {
          // debugger

          // Remove the obContract from the devicePublicModel
          var obContractId = this.device.obContract
          this.device.obContract = ''

          // Persist the data to the server.
          this.$store.dispatch('persistPublicDeviceModel', this.device)

          // Remove the listing from the OpenBazaar marketplace.
          var removeObListingPromise = $.get('/api/ob/removeMarketListing/' + obContractId, '', (data) => {
            // debugger

            if (data.success) console.log('Successfully removed OB listing.')
            else console.log('OB listing removal failed.')
          })
          .fail(function (xhr, status, error) {
            // debugger
            console.error('Error trying to delete OpenBazaar listing: ', error)
          }).promise()

          // Remove the obContract model from the server.
          removeObListingPromise.then(data => {
            // debugger

            $.get('/api/obContract/' + obContractId + '/remove', '', (data) => {
              // debugger

              if (data.success) console.log('Successfully deleted OB contract model.')
              else console.log('Failed to delete OB contract model on server.')
            })
            .fail(function (xhr, status, error) {
              // debugger
              console.error('Error trying to delete obContract model: ', error)
            }).promise()
          })
        }
      },

      submitToMarket: function () {
        // debugger

        // if (this.device) return

        var now = new Date()
        var oneMonth = 1000 * 60 * 60 * 24 * 30
        var oneMonthFromNow = new Date(now.getTime() + oneMonth)

        // Create new obContract model
        var obj = {
          clientDevice: this.device._id,
          ownerUser: this.$store.state.userInfo.GUID,
          renterUser: '',
          price: 115,
          experation: oneMonthFromNow.toISOString(),
          title: this.device.deviceName,
          description: this.device.deviceDesc,
          listingUri: '',
          imageHash: '',
          listingState: 'Listed',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        }

        // Generate a new obContract model on the server.
        var createModelPromise = $.post('/api/obContract/create', obj, (data) => {
          // debugger
          var obContractModel = data.collection

          console.log('New model created. ID: ' + obContractModel._id)
          return obContractModel
        })
        .fail(function (xhr, status, error) {
          // debugger
          console.error('Error trying to create new obContract model: ', error)
        }).promise()

        // Update the devicePublicData model with the obContract model ID.
        createModelPromise.then((obContractModelId) => {
          // debugger

          var publicDeviceModel = this.device
          publicDeviceModel.obContract = obContractModelId.collection._id

          this.$store.dispatch('persistPublicDeviceModel', publicDeviceModel)

          return obContractModelId
        })

        // submit the contract to OpenBazaar
        .then(obContractModel => {
          var createObListingPromise = $.get('/api/ob/createMarketListing/' + obContractModel.collection._id, '', (data) => {
            // debugger

            if (data.success) console.log('Successfully created OB listing.')
            else console.log('OB listing creation failed.')
          })
          .fail(function (xhr, status, error) {
            // debugger
            console.error('Error trying to create new OpenBazaar listing: ', error)
          }).promise()

          createObListingPromise.then(data => {
            // debugger
          })
        })

        // .catch(err => {
        //  debugger
        //  console.error('Error trying to update device model with obContract model ID: ', err)
        // })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nice-border {
    border: 1px solid black;
    border-radius: 25px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .nice-border ul {
    list-style: none;
  }
  .nice-border button {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .nice-border p {
    font-size: 16px;
  }

  /* Text color */
  .text-red {
    color: red;
  }
  .text-yellow {
    color: yellow;
  }
  .text-green {
    color: green;
  }
</style>
