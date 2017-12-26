<template>
  <button @click="showLoading">test</button>
</template>
<script>
export default {
  methods: {
    showLoading () {
      this.$Loading.show()
      setTimeout(() => {
        this.$Loading.hide()
      }, 3000)
    }
  }
}
</script>
