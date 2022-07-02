<template>
  <Navbar></Navbar>
  <Login></Login>
  <div class="products bg-white" id="products">
    <Loading v-model:active="isLoading" />
    <div class="container ">
      <h1 class="text-center pt-5 fw-bolder">熱銷商品</h1>
      <h2 class="text-center text-secondary fw-bold">品項太多，歡迎到店選購</h2>
      <div class="row">
        <div class="col-md-3 pt-3" v-for="product in products">
          <div class="card product-item h-100 ">
            <swiper :pagination="true" :modules="modules" class="mySwiper">
              <swiper-slide v-for="image in product.data().images">
                <img :src="image" class="card-img-top h-100 " alt="...">
              </swiper-slide>
            </swiper>
            <div class="card-body">
              <div class="d-flex flex-column justify-content-between text-center">
                <h5 class="card-title">{{ product.data().name }}</h5>
                <h5 class="card-priceS">{{ currency(product.data().price) }}$</h5>
                <p class="fs-6"> {{ product.data().description }}</p>
              </div>
              <add-to-cart class="text-center" :name="product.data().name" :price="product.data().price"
                :product-id="product.id" :imagebig="getImage(product.data().images)">
              </add-to-cart>
            </div>
          </div>
        </div>
      </div>
      <!-- cart -->
      <MiniCart></MiniCart>
    </div>
  </div>
    <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";
import MiniCart from "@/components/frontend/Minicart.vue";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Modal } from 'bootstrap'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { currency } from "../methods/filter";
// 千分號引入



export default {
  name: "produtspage",
  components: {
    Navbar,
    Login,
    Swiper,
    SwiperSlide,
    MiniCart,
    Footer
  },
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  setup() {
    return {
      modules: [Pagination],
      modal: ''
    };
  },
  methods: {
    currency,
    async readData() {
      this.isLoading = true;
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        this.products.push(doc);
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        this.isLoading = false;
      });
    },
    getImage(images) {

      return images[0]
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('miniCartModal'));
    // 監聽modal 從dom用id取得modal 
  },
  created() {
    this.readData();
  },
};
</script>

<style scoped lang="scss">
.products {
  margin-top: 2rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
