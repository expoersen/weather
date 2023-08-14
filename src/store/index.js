import { createStore } from "vuex";
import axios from "axios";
export default createStore({
    state() {
        return {
            theme: "dark",
            weatherData: [],
            lastSearch:[],
            search: "",
            apiKey: "http://api.weatherapi.com/v1/current.json?key=25ec152aed1d4772a71104242231008&",
            favoriteCity: []
        };
    },
    mutations: {
        SET_WEATHER(state, data) {
            state.weatherData = data;
            state.lastSearch.push(state.weatherData);
        },
        REMOVE_FROM_FAVORITES(state, product) {
            state.cart = state.cart.filter((item) => item.id !== product.id);
          },
        updateStoreValue(state, newValue) {
            state.search = newValue; // Store değerini güncelle
        },
        addFavorite(state) {
            state.favoriteCity.push(state.weatherData);
            state.favoriteCity = state.favoriteCity.reverse();
        },
        removeFavorite(state) {
            state.favoriteCity = []
        },
        firstFavWeather(state) {
            if (state.favdata.length > 0) {
              return state.favdata[0];
            }
        }
    },
    actions: {
        async fetchWeathers({ commit, state }) {
            // Ürünleri API'den çekmek için gerekli Axios veya diğer istemciyi burada kullanabilirsiniz.
            // Örneğin, Axios ile ürünleri API'den almak:
            try {

                const response = await axios.get(state.apiKey, {

                    params: {
                        q: state.search,
                        lang: "tr",
                    }
                });
                commit("SET_WEATHER", response.data);
            } catch (error) {
                console.error("Weather getirilirken bir hata oluştu:", error);
            }
        },
        removeFromFavorites({ commit }, product) {
            commit("REMOVE_FROM_FAVORITES", product);
          },
    },
});
