function generateGrid (deviceModels, obContracts) {
  // debugger;

  // register the grid component
  Vue.component('demo-grid', {
    template: '#grid-template',
    replace: true,
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      filteredData: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }

        // if(data.description === "<b>Comming Soon</b>") console.log('Mark');
        // console.log(JSON.stringify(data,null,2));

        return data
      }

    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },

      convertToHTML: function (input) {
        var storeUrl = 'ob://QmYfMAnHQrHAKrWD6bENvD7Z4JCgvdxFJgKzt2kCpCTidw/store/';
        var slug = '';

        if (input.toString().indexOf('ob:') > -1) {
          slug = input.slice(3, input.length);
          // input = `<a type="button" class="btn btn-xs btn-primary" href=${storeUrl+slug}>See Listing</a>`;
          input = `<button type='button' class='btn btn-primary btn-xs' onclick="openModal(1,'${slug}')">See Listing</button>`;
        } else if (input.toString().indexOf('desc:') > -1) {
          desc = input.slice(5, input.length);
          input = `<button type='button' class='btn btn-primary btn-xs' onclick="openModal(2,'${desc}')">See Info</button>`;
        }

        input = `<td>${input}</td>`;

        return input;
      }
    }
  })

  var listingData = [];
  for (var i = 0; i < obContracts.length; i++) {
    var thisContract = obContracts[i];
    var thisDeviceModel = deviceModels.find(model => model.obContract === obContracts[i]._id);

    // Continue if the device doesn't have an OB contract.
    if (thisDeviceModel === undefined) continue;

    var thisListing = {};
    thisListing.price = formatPrice(thisContract.price);
    thisListing.name = thisDeviceModel.deviceName;
    thisListing.uptime = 'N/A';
    thisListing.memory = 'N/A';
    thisListing.diskspace = 'N/A';
    thisListing.listing = 'ob:' + thisContract.listingSlug;
    thisListing.description = 'desc:' + thisDeviceModel._id;

    listingData.push(thisListing);
  }

  // bootstrap the demo
  var demo = new Vue({
    el: '#demo',
    data: {
      searchQuery: '',
      gridColumns: ['price', 'name', 'uptime', 'memory', 'diskspace', 'listing', 'description'],
      // gridData: [
      //  { price: 2.51, name: 'Chuck Norris', uptime: Infinity, memory: '1', diskspace: 54, description: 'desc' },
      //  { price: 2.52, name: 'Bruce Lee', uptime: 9000, memory: '2', diskspace: 45, description: 'desc' },
      //  { price: 2.11, name: 'Jackie Chan', uptime: 7000, memory: '3', diskspace: 23, description: 'desc' },
      //  { price: 2.32, name: 'Jet Li', uptime: 8000, memory: '4', diskspace: 65, description: 'desc' }
      // ]
      gridData: listingData
      // Price = rent button, deviceName, Uptime, Memory, Disk space, description button,
    }
  })
}

function formatPrice (price) {
  var thisPrice = Number(price)
  thisPrice = (thisPrice / 100).toFixed(2);
  thisPrice = '$' + thisPrice + ' per Hour';

  return thisPrice;
}
