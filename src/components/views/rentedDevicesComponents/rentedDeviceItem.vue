<template>

  <div class="container">
    <div id="deviceList">

      <!-- Show device login data. -->
      <div class="row well">
        <div class="col-sm-12">
          <h3>{{ device._id }}</h3>
          <div class="row">
            <div class="col-sm-8">
              <ul class="list-inline">
                <li><strong>SSH server: </strong><span>p2pvps.net</span></li>
                <li><strong>port: </strong><span>{{ device.serverSSHPort }}</span></li>
                <li><strong>login: </strong><span>{{ device.deviceUserName }}</span></li>
                <li><strong>password: </strong><span>{{ device.devicePassword }}</span></li>
              </ul>
            </div>
            <div class="col-sm-4 pull-right">
              <button class="btn btn-primary" style="margin-right: 30px;" v-on:click="renew()">Renew</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "rentedDeviceItem",
  data() {
    return {
      msg: "This is a listed rented device.",
    };
  },
  props: ["device"],

  computed: {

  },

  methods: {

    renew: function() {
      // debugger

      return new Promise((resolve, reject) => {

        const deviceId = this.device.publicData;

        $.ajax({
          type: "GET",
          url: `/api/renteddevices/renew/${deviceId}`,
          headers: {
            Authorization: `Bearer ${this.$store.state.userInfo.token}`
          },
          success: handleSuccess,
          dataType: "json",
          error: handleError
        });

        function handleSuccess(data, textStatus, jqXHR) {
          debugger;
          console.log(`Device ${deviceId} renewed with obContract: ${data.obContract}`);
          return resolve(true);
        }

        function handleError(err) {
          debugger;
          console.error(err.responseText);
          return reject(err);
        }
      });
    },
  },
};
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
