// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
    breakpoint: {
        thresholds: {
           xs: 0,
           sm: 476,
           md: 668,
           lg: 1000,
           xl: 1200
        }
    },
    theme: {
        themes: {
            light: {
                primary: "#7F74B4",
                secondary: "#DEDAF4",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107",
                delete: "#F44336",
                skyBlue: "#83A8C1",
                grey: "#EEEEEE",
                white: "#FFFFFF",
            },
        },
    },
}

export default new Vuetify(opts)