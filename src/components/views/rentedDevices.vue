<template>
  <section class="content container">
    <!-- Small boxes (Stat box) -->
    <div class="row">
      <div class="col-sm-12">
        <p>
          This is the rented devices view. This view will hold information about
          your rented devices. Information like ports, logins, and passwords.
        </p>
      </div>

    </div>
    <!-- /.row (main row) -->

  </section>
</template>

<script>
  export default {
    name: 'rentedDevices',
    data () {
      return {
        msg: 'This is the rented devices view.'
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
