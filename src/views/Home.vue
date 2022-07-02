<template>
  <div class="home">
    <Loading v-model:active="isLoading"/>
    <Navbar></Navbar>
    <Login></Login>
    <Banner></Banner>
    <Content></Content>
    <Footer></Footer>
    <Gototop></Gototop>
    <MiniCart></MiniCart>
  </div>>
</template>

<script>
import Content from "@/components/Content.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";
import MiniCart from "@/components/frontend/Minicart.vue";
import Gototop from "@/components/Gototop.vue";

export default {
  name: "Home",
  components: {
    Content,
    Banner,
    Footer,
    Navbar,
    Login,
    Gototop,
    MiniCart
  },
  data() {
    return {
      isLoading:false,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
