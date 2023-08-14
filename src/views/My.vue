<template>
  <v-container>
    <v-col cols="12">
      <div class="text-h5 mb-2">{{ title }}</div>
      <v-card
        color="primary"
        class="mx-auto mb-2"
        v-if="!this.favdata.length == 0"
        v-for="favweather in favdata"
        :key="favweather.id"
      >
        <Card
          :id="favweather.location.lat"
          :name="favweather.location.name"
          :region="favweather.location.region"
          :country="favweather.location.country"
          :tz="favweather.location.tz_id"
          :tempc="favweather.current.temp_c"
          :condition_text="favweather.current.condition.text"
          :condition_icon="favweather.current.condition.icon"
          :wind_kph="favweather.current.wind_kph"
        />
      </v-card>
      <v-card v-else title="Favori listen boş!"></v-card>
    </v-col>
  </v-container>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text> Favorilerimden silindi. </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
  },
  setup() {
    const store = useStore();
    const favdata = computed(() => store.state.favoriteCity);
    return {
      favdata,
    };
  },
  mounted() {
    console.log(this.favdata.length);
  },

  data: () => ({
    title: "My Favorite",
    expand: false,
  }),
};
</script>
