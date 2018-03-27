<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- content-header. Contains in-page navigation elements -->
    <content-header></content-header>
    <!-- active-content. The current view being displays renders here -->
    <active-content></active-content>
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
  import contentHeader from './contentHeader'
  import activeContent from './activeContent'

  export default {
    name: 'activeView',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      contentHeader,
      activeContent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
