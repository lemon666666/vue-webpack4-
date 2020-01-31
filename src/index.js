import Vue from 'vue'
import App from './App.vue'

import './assets/styles/index.scss'
import './assets/images/bg.jpg'

const root = document.createElement('div')
document.body.appendChild(root)


new Vue({
    render: (h) => h(App)
}).$mount(root)
  