<template>
  <div class="goTotop d-none">
    <a href="#" @click.prevent="top"><i class="fa-solid fa-gamepad"></i></a>
  </div>
</template>

<script>
export default {
  name: 'Gototop',
  methods: {
    top () {
      document.documentElement.scrollTop = 0
    }
  },
  mounted () {
    window.onscroll = function (event) {
      if (event.target.scrollingElement.scrollTop > 250) {
        const el = document.querySelector('.goTotop')
        if (el !== null) {
          el.className = 'goTotop d-block'
        }
      } else {
        const el = document.querySelector('.goTotop')
        if (el !== null) {
          el.className = 'goTotop d-none'
        }
      }
    }
  }
}
</script>

<style scoped>
.goTotop{
  position: fixed;
  right: 15px;
  bottom: 10px;
  z-index: 99;
}
.goTotop a {
  color: black;
  font-size: 40px;
}
@media (max-width: 768px) {
  .goTotop{
    right: 0px;
    bottom: 0px;
  }
  .goTotop a{
    font-size: 35px;
  }
}
</style>