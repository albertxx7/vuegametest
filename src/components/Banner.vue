<template>
  <div class="banner">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :navigation="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <div
          class="img-bg bg-size posisiton-relative"
          style="
            background-image: url('https://upload.cc/i1/2022/06/11/FAHYdu.jpg');
          "
        >
          <div class="content w-100">
            <p class="fs-1 animate__animated animate__fadeInDown">找回童年記憶</p>
            <p class="fs-3 animate__animated animate__fadeInDown">就是現在</p>
            <button @click="goproducts" class="btn btn-dark">開始探索</button>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div
          class="img-bg bg-size posisiton-relative"
          style="
            background-image: url('https://upload.cc/i1/2022/06/12/XdYQEz.jpg');
          "
        >
          <div class="content w-100">
            <p class="fs-1 ">2022新品上市</p>
            <p class="fs-3 ">原裝日本進口</p>
            <button @click="goproducts" class="btn btn-dark">開始探索</button>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div
          class="img-bg bg-size posisiton-relative"
          style="
            background-image: url('https://upload.cc/i1/2022/06/12/LRkJvq.jpeg');
          "
        >
          <div class="content w-100">
            <p class="fs-1 ">精選主機卡帶</p>
            <p class="fs-3 ">值得擁有</p>
            <button @click="goproducts" class="btn btn-dark">開始探索</button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, Autoplay],
    };
  },
  methods: {
    goabout() {
      this.$router.replace("about");
    },
    goproducts() {
      this.$router.replace("productpage");
    },
  },
};
</script>

<style scoped>
.banner {
  margin-top: 60px;
}

.img-bg {
  background-size: cover;
  background-position: center center;
  min-height: 500px;
}

.bg-size {
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

@media (max-width: 768px) {
  .img-bg {
    min-height: 400px;
  }
}
.content {
  color: #fff;
  position: relative;
  top: 150px;
  left: 230px;
}
.content p {
  letter-spacing: 3px;
}
@media (max-width: 768px) {
  .content {
    top: 200px;
    left: 50px;
  }
}
</style>
