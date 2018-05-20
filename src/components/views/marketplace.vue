<template>
  <div id="demo" class="container">

    <div class="row">
      <div class="col-sm-12">
        <h1>Rental Listings</h1>
        <p>
          The table below shows all the VPS rentals available for purchase on
          the P2P VPS Alpha store. While limited at the moment, the functionality
          of the table below will be improved as the network grows and it's necessary
          to easily search and filter listings.
        </p>
        <p>
          <a href="http://p2pvps.org/rent-a-vps/" target="_blank">Here are instructions</a> on
          how to rent one of the VPSs listed below.
        </p>
        <br><br>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <form id="search">
          Search <input name="query" v-model="searchQuery">
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <demo-grid
          :data="gridData"
          :columns="gridColumns"
          :filter-key="searchQuery"
          :devices="devices">
        </demo-grid>
      </div>
    </div>
  </div>

</template>

<script>
  import demoGrid from './marketplace-components/market-list.vue'

  export default {
    name: 'rentedDevices',
    data () {
      return {
        msg: 'This is the marketplace view.',
        searchQuery: "",
        gridColumns: [
          "price",
          "name",
          "uptime",
          "memory",
          "diskspace",
          "listing",
          "description"
        ],
        gridData: [
          {
            price: 'N/A',
            name: 'N/A',
            uptime: 'N/A',
            memory: 'N/A',
            diskspace: 'N/A',
            name: 'N/A',
            listing: 'ob:notavailable',
            description: 'Retrieving data from server...'
          }
        ],
        devices: [],
        contracts: []
      }
    },

    components: {
      demoGrid
    },

    mounted: async function() {
      //debugger;
      try {
        // get the devicePublicModels for all the devices on the server.
        this.devices = await getDevices();

        this.contracts = await getObContractData();

        this.gridData = generateGrid(this.devices, this.contracts);
      } catch (err) {
        debugger;
        console.error(`Error in marketplace.vue/mounted(): `, err);
      }
    }
  }

  // Retrieve all devicePublicModels from the server.
  function getDevices() {
    return new Promise(function(resolve, reject) {
      return $.get(`/api/devices`, "", function(data) {
        var collection = data.devices;

        return resolve(collection);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        return reject(jqXHR);
      });
    });
  }

  // Retrieve all obContract models from the server.
  function getObContractData() {
    return new Promise(function(resolve, reject) {
      return $.get(`/api/obcontract`, "", function(data) {
        var collection = data.obContracts;

        resolve(collection);
      });
    });
  }

  // Generate the gridData array after data has been downloaded from server.
  function generateGrid(devices, contracts) {
    //debugger;
    var listingData = [];
    for (var i = 0; i < contracts.length; i++) {
      var thisContract = contracts[i];
      var thisDeviceModel = devices.find(
        model => model.obContract === contracts[i]._id
      );

      // Continue if the device doesn't have an OB contract.
      if (thisDeviceModel === undefined) continue;

      var thisListing = {};
      thisListing.price = formatPrice(thisContract.price);
      thisListing.name = thisDeviceModel.deviceName;
      thisListing.uptime = "N/A";
      thisListing.memory = "N/A";
      thisListing.diskspace = "N/A";
      thisListing.listing = "ob:" + thisContract.listingSlug;
      thisListing.description = "desc:" + thisDeviceModel._id;

      listingData.push(thisListing);
    }

    return listingData;
  }

  function formatPrice(price) {
    var thisPrice = Number(price);
    thisPrice = (thisPrice / 100).toFixed(2);
    thisPrice = "$" + thisPrice + " per Hour";

    return thisPrice;
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
