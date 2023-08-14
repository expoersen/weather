<template>
  <v-container>
    <v-col cols="12">
      <div class="text-h5 mb-2">{{title}}</div>
      <v-card color="primary" class="mx-auto">
        <v-card-text>
          <v-text-field
            v-model="inputValue"
            @input="updateValue"
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search templates"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-card
        class="mx-auto mt-2"
        color="primary"
        v-if="apidata.location"
      >
        <Card
          :id="apidata.location.lat"
          :name="apidata.location.name"
          :region="apidata.location.region"
          :country="apidata.location.country"
          :tz="apidata.location.tz_id"
          :tempc="apidata.current.temp_c"
          :condition_text="apidata.current.condition.text"
          :condition_icon="apidata.current.condition.icon"
          :wind_kph="apidata.current.wind_kph"
        />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { computed } from "vue";
import { mapMutations, mapActions, useStore } from "vuex";
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
  },
  data: () => ({
    title: "Search",
    loaded: false,
    loading: false,
    inputValue: "",
  }),
  setup() {
    const store = useStore();
    const apidata = computed(() => store.state.weatherData);

    return {
      apidata,
    };
  },
  methods: {
    ...mapMutations(["updateStoreValue"]), // Vuex store'daki değeri güncellemek için mutation'ı bileşene ekle
    updateValue() {
      this.updateStoreValue(this.inputValue); // Vuex store'daki değeri güncelle
    },
    ...mapActions(["fetchWeathers"]),
    onClick() {
      if (this.inputValue !== "") {
        this.loading = true;
        this.fetchWeathers();
        setTimeout(() => {
          this.loading = false;
          this.loaded = true;
        }, 2000);
      } else {
        this.$toast.error('Lütfen alanı doldurunuz!');
      }
    },
  },
};
</script>
