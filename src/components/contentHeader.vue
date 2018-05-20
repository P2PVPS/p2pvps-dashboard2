<template>
  <section class="content-header">
    <h1 v-if="this.$store.state.menuState.dashboard">Dashboard</h1>
    <h1 v-if="this.$store.state.menuState.marketplace">Marketplace</h1>
    <h1 v-if="this.$store.state.menuState.ownedDevices">Owned Devices</h1>
    <h1 v-if="this.$store.state.menuState.rentedDevices">Rented Devices</h1>
    <!-- <small>Control panel</small> -->

    <!--
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
      <li class="active">Dashboard</li>
    </ol>
    -->
  </section>
</template>

<script>
export default {
  name: 'content-header',
  data () {
    return {
      msg: 'This is the content header'
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
