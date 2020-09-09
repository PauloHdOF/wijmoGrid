import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://curso-vue-cf0b3.firebaseio.com/'
axios.defaults.he

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})