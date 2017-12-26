<template>
  <div class="loading-mask">
    <div class="loader">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  mounted () {
    document.body.style.overflow = 'hidden'
  },
  destroyed () {
    document.body.style.overflow = ''
  }
}
</script>

<style lang="scss">
.loading-mask {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  z-index: 1000;
  align-items: center;
}
.circular {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: #2d8cf0;
}
.loader {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto;
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  to {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

</style>
