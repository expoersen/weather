<template>
  <v-card-item>
    <template v-slot:subtitle>
      <v-icon
        icon="mdi-weather-hurricane"
        size="18"
        color="error"
        class="me-1 pb-1"
      >
      </v-icon>
      {{name}} {{ region }} - {{ country }} |
      {{ tz }}
    </template>
  </v-card-item>

  <v-card-text class="py-0">
    <v-row align="center" no-gutters>
      <v-col class="text-h3" cols="6">
        {{ tempc }}&deg;C
      </v-col>

      <v-col cols="6" class="text-right">
        <v-card-text class="d-flex justify-end align-center px-0"
          >{{ condition_text }}
          <img :src="condition_icon" alt="image"
        /></v-card-text>
      </v-col>
    </v-row>
  </v-card-text>

  <div class="d-flex py-3 justify-space-between">
    <v-list-item density="compact" prepend-icon="mdi-weather-windy">
      <v-list-item-subtitle
        >{{ wind_kph }} km/h</v-list-item-subtitle
      >
    </v-list-item>
  </div>

  <!-- <v-expand-transition>
    <div v-if="expand">
      <v-list class="bg-transparent">
        <v-list-item
          v-for="item in forecast"
          :key="item.day"
          :title="item.day"
          :append-icon="item.icon"
          :subtitle="item.temp"
        >
        </v-list-item>
      </v-list>
    </div>
  </v-expand-transition> -->

  <v-divider></v-divider>

  <v-card-actions>
    <!-- <v-btn @click="expand = !expand">
      {{ !expand ? "Full Report" : "Hide Report" }}
    </v-btn> -->
      <v-btn @click="addFavoritew(apidata)" v-if="isNotFavorite(id)">
      Favorilere Ekle
    </v-btn>
    <v-btn v-else @click="yokSuan">
      Favorilerden Kaldır
    </v-btn>
  </v-card-actions>
</template>

<script>
import { computed } from "vue";
import { mapMutations, useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const apidata = computed(() => store.state.weatherData);
    const favdata = computed(() => store.state.favoriteCity);
    const removeFromFavorites = (fCity) => {
      store.dispatch("removeFromFavorites", fCity);
    };
    return {
      apidata,
      favdata,
      removeFromFavorites,
    };
  },
  props: {
    id: String,
    name: String,
    region: String,
    country: String,
    tz: String,
    tempc: String,
    condition_text: String,
    condition_icon: String,
    wind_kph: String,
  },
  
  methods: {
    ...mapMutations(["addFavorite"]),
    addFavoritew(favorite) {

      const isFavorite = this.favdata.some(
        (fav) => fav.location.lat === favorite.location.lat
      );
      if (!isFavorite) {
        this.$toast.success('Başarılı bir işlem gerçekleşti!');
        this.addFavorite();
      }
    },
    isNotFavorite(favorite) {
      return !this.favdata.some((fav) => fav.location.lat === favorite);
    },
  },
};
</script>
