<template>
  <table v-if="filteredData.length" class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          <span v-if="shapeHtml(entry[key])">{{ entry[key] }}</span>
          <button v-if="!shapeHtml(entry[key])" type='button' class='btn btn-primary btn-xs' v-on:click="showListingInfo(entry[key])">View</button>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>

<script>
export default {
  name: 'demo-grid',
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    devices: Array
  },
  data: function() {
    var sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredData: function() {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.data;
      if (filterKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }

      // if(data.description === "<b>Comming Soon</b>") console.log('Mark');
      // console.log(JSON.stringify(data,null,2));

      return data;
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },

    // Pops up a modal with more information about the listing.
    showListingInfo(inputStr) {
      console.log(`inputStr was: ${inputStr}`);

      let modalState = this.$store.state.modal

      // OpenBazaar listing
      if (inputStr.toString().indexOf("ob:") > -1) {
        const storeUrl =
          "ob://QmPUf97TtPT1JapY6ey1tc9tiErcUpZPoTQTx5KVD2rQ5r/store";

        inputStr = inputStr.slice(3, inputStr.length);

        const bodyMsg = `Copy and paste this address into your OpenBazaar
        application to view or purchase the listing:
        ${storeUrl}/${inputStr}`;

        // Display a modal to the user
        modalState = {
          show: true,
          title: 'View Listing',
          body: bodyMsg,
          button1Text: 'No',
          button1Func: function () { },
          button1Show: false,
          button2Text: 'Close',
          button2Func: function () { $('.appModal').modal('hide') },
          button2Show: true
        }

        this.$store.commit('UPDATE_MODAL', modalState)

      // Description
      } else if (inputStr.toString().indexOf("desc:") > -1) {
        // Parse the ID of this device.
        const modelId = inputStr.slice(5, inputStr.length);

        // Retrieve the description for the selected device.
        const thisDeviceModel = this.devices.find(model => model._id === modelId);
        const desc = thisDeviceModel.deviceDesc;

        // Display a modal to the user
        modalState = {
          show: true,
          title: 'Device Description',
          body: desc,
          button1Text: 'No',
          button1Func: function () { },
          button1Show: false,
          button2Text: 'Close',
          button2Func: function () { $('.appModal').modal('hide') },
          button2Show: true
        }

        this.$store.commit('UPDATE_MODAL', modalState)

      }
    },

    // Determines which HTML element gets shown in the rental grid table.
    shapeHtml(input) {
      // OpenBazaar listing
      if (input.toString().indexOf("ob:") > -1) {
        return false;
      // Description
      } else if (input.toString().indexOf("desc:") > -1) {
        return false;
      }

      return true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
