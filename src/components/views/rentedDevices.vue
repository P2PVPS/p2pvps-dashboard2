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
  export default {
    name: 'rentedDevices',
    data () {
      return {
        msg: 'This is the rented devices view.',
        showForm: false,
        dashId: ''
      }
    }
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
