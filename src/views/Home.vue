<template>
  <v-container>
    <v-col cols="12">
      <div class="text-h5 mb-2">{{this.title}}</div>
      <v-card color="primary" class="mx-auto mb-3" v-if="!this.favdata.length==0">
        <Card
        :id="firstFavWeather.location.lat"
        :name="firstFavWeather.location.name"
        :region="firstFavWeather.location.region"
        :country="firstFavWeather.location.country"
        :tz="firstFavWeather.location.tz_id"
        :tempc="firstFavWeather.current.temp_c"
        :condition_text="firstFavWeather.current.condition.text"
        :condition_icon="firstFavWeather.current.condition.icon"
        :wind_kph="firstFavWeather.current.wind_kph"
        />
      </v-card>

      <v-card color="primary" class="mx-auto mb-3" v-else>
        <v-card-title class="text-h5"> Merhaba ! </v-card-title>
        <v-card-subtitle
          >Başlamak için favorilere bir şehir eklemelisin.</v-card-subtitle
        >
        <v-card-actions>
          <v-btn to="/search" variant="outlined" prepend-icon="$plus" class="ms-2"> Hemen ekle </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="mx-auto mb-3" color="light">
        <v-card-title class="text-h5"> Unlimited music now </v-card-title>
        <v-card-subtitle
          >Listen to your favorite artists and albums whenever and wherever,
          online and offline.</v-card-subtitle
        >

        <v-card-actions>
          <v-btn variant="text"> Listen Now </v-btn>
        </v-card-actions>
      </v-card>
      <v-card color="primary" class="mx-auto mb-3">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5"> Supermodel </v-card-title>

            <v-card-subtitle>Foster the People</v-card-subtitle>

            <v-card-actions>
              <v-btn class="ms-2" variant="outlined" size="small">
                START RADIO
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" size="125" rounded="0">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
            ></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { computed } from "vue";
import { mapMutations, useStore } from "vuex";
import Card from '../components/Card.vue';
export default {
  components: {
    Card,
  },
  setup() {
    const store = useStore();
    const apidata = computed(() => store.state.weatherData);
    const favdata = computed(() => store.state.favoriteCity);
    const firstFavWeather = () => {
      store.dispatch("firstFavWeather");
    };
    return {
      apidata,
      favdata,
      firstFavWeather,
    };
  },
  computed: {
    firstFavWeather() {
      if (this.favdata.length > 0) {
        return this.favdata[0];
      }
    },
  },
  methods:{
    ...mapMutations(["removeFavorite"]),
  removeFav() {
    this.removeFavorite();
    this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
      }, 2000);
  },
  },
  
  data: () => ({
    title:"Home",
    expand: false,
  }),
};
</script>
