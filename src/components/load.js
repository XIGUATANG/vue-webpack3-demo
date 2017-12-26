import Vue from 'vue'
import Loading from './Loading.vue'

let Instance
Loading.newInstance = () => {
  Instance = new Vue({
    render (h) {
      return h(Loading)
    },
    methods: {
      destroy () {
        this.$destroy()
        document.body.removeChild(this.$el)
      },
      remove () {
        setTimeout(() => {
          this.destroy()
        }, 300)
      }
    }
  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const model = Instance.$children[0]
}
export default {
  show: () => {
    Loading.newInstance()
  },
  hide: () => {
    if (!Instance) return false
    Instance.remove()
  }
}
