<template>
  <div>

    <!-- Display views based on the menuState -->
    <dashboard v-if="this.$store.state.menuState.dashboard"></dashboard>
    <ownedDevices v-if="this.$store.state.menuState.ownedDevices"></ownedDevices>
    <rentedDevices v-if="this.$store.state.menuState.rentedDevices"></rentedDevices>
    <marketplace v-if="this.$store.state.menuState.marketplace"></marketplace>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import dashboard from './views/dashboard'
  import ownedDevices from './views/ownedDevices.vue'
  import rentedDevices from './views/rentedDevices.vue'
  import marketplace from './views/marketplace.vue'

  export default {
    name: 'active-content',
    data () {
      return {
        msg: 'This is the active content.'
        // dashboard: true
      }
    },
    components: {
      dashboard,
      ownedDevices,
      rentedDevices,
      marketplace
    },
    computed: {
      dashboard () {
        return this.$store.menuState.dashboard
      },
      getMenuState: function () {
        // debugger
        return this.$store.state.menuState.dashboard
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
