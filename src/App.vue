<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/Home";

export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    Home
  }
};
</script>

<style>
@import "../node_modules/wijmo/styles/wijmo.css";
</style>  
