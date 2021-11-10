<template>
  <div class="container">
    <Header 
      title="Football Stadiums"
    />

    <!-- router-view to render the matched view componenet for the given path -->
    <router-view></router-view>

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  }
});
</script>

<style>
  * {
    /* with border-box the width and height of an element is equal to the full size of the element box */
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: "Roboto", sans-serif;
  }

  .container {
    max-width: 1366px;
    margin: 30px;
    overflow: auto;
    min-height: 300px;
    border: 1px solid black;
    padding: 30px;
    border-radius: 5px;
  }

</style>
