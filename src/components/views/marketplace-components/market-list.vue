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
        <td v-for="key in columns" v-html="convertToHTML(entry[key])">
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
    filterKey: String
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

    convertToHTML: function(input) {
      var storeUrl =
        "ob://QmPUf97TtPT1JapY6ey1tc9tiErcUpZPoTQTx5KVD2rQ5r/store";
      var slug = "";

      if (input.toString().indexOf("ob:") > -1) {
        slug = input.slice(3, input.length);
        // input = `<a type="button" class="btn btn-xs btn-primary" href=${storeUrl+slug}>See Listing</a>`;
        input = `<button type='button' class='btn btn-primary btn-xs' onclick="openModal(1,'${slug}')">See Listing</button>`;
      } else if (input.toString().indexOf("desc:") > -1) {
        const desc = input.slice(5, input.length);
        input = `<button type='button' class='btn btn-primary btn-xs' onclick="openModal(2,'${desc}')">See Info</button>`;
      }

      input = `<td>${input}</td>`;

      return input;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
