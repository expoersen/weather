<template>
  <v-card class="mx-auto fill-height">
      <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
        scroll-behavior="elevate hide collapse"
      >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <v-app-bar-title>Weather App</v-app-bar-title>

        <v-spacer></v-spacer>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme">
</v-btn>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
      v-model="drawer"
      fixed
      bottom
      temporary
      location="right"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Son Aramalarım</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
    <v-bottom-navigation color="teal" grow>
    <v-btn to="/" value="recent">
            <v-icon>mdi-home</v-icon>
            Home
          </v-btn>
          <v-btn to="/search" value="recent">
            <v-icon>mdi-magnify</v-icon>
            Search
          </v-btn>
          <v-btn to="/my" value="favorites">
            <v-icon>mdi-heart</v-icon>
            My
          </v-btn>
  </v-bottom-navigation>
  </v-card>

</template>
<script>
import { useTheme } from 'vuetify'
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        console.log(theme.global.current.value)
      }
    };
  },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>