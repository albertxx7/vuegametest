<template>
  <Navbar></Navbar>
  <Login></Login>
  <div class="home mt-5">
    <div class="container mt-5 pt-5">
      <section>
        <div class="d-flex justify-content-center mt-3">
          <h1 class="fs-3 fw-bold"> <span class="fw-bolder"> 8Bit Game</span> -關於我們</h1>
        </div>
        <div class="card-group mt-5 ">
          <div class="card border-0">
            <div class="px-5">
              <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="card-img-top " alt="">
            </div>
            <div class="card-body animated">
              <h3 class="card-title text-center fw-bold">老闆的內心話</h3>
              <p class="card-text mt-3 text-center fs-5"> 老闆從小是個熱愛遊戲的骨灰級玩家<br>想要幫大家找回那個年代單純的小美好<br>賺錢不是第一<br>看到客戶找回回憶是我努力的動力!</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-1 animated">
          <a href="/productpage" class="btn btn-success btn-lg rounded-pill">快去看看商品吧</a>
        </div>
      </section>
      
      <section class="mt-5">
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col animated">
            <div class="card border-0">
              <img src="https://images.unsplash.com/photo-1609603078878-1310fb1f7e3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="">
              <div class="card-body animated">
                <h3 class="card-title fw-bold">經典卡帶</h3>
                <p class="card-text mt-3 fs-5">曾經玩過，但是找不到，不見了? 8BitGame幫你找回來</p>
                <div class="d-flex justify-content-start">
                  <a href="/productpage" class="btn btn-success btn-hover rounded-0">查看更多</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col animated">
            <div class="card border-0">
              <img src="https://images.unsplash.com/photo-1588689115724-a624efec3c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="">
              <div class="card-body animated">
                <h3 class="card-title fw-bold">次世代主機?</h3>
                <p class="card-text mt-3 fs-5">想要畫質好點的主機? 我們也有 ! psp全系列供應</p>
                <div class="d-flex justify-content-end">
                  <a href="/productpage" class="btn btn-success btn-hover rounded-0">查看更多</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col mt-md-5 animated">
            <div class="card border-0">
              <img src="https://images.unsplash.com/photo-1533702165324-66678e2069b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="">
              <div class="card-body animated">
                <h3 class="card-title fw-bold">老派的你想要玩更傳奇的主機嗎</h3>
                <p class="card-text mt-3 fs-5">老派電視主機我們也都有，快來淘寶</p>
                <div class="d-flex justify-content-start">
                  <a href="/productpage" class="btn btn-success btn-hover rounded-0">查看更多</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col mt-md-5 animated">
            <div class="card border-0">
              <img src="https://images.unsplash.com/photo-1602029908656-b54d40a76ad8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="card-img-top" alt="">
              <div class="card-body animated">
                <h3 class="card-title fw-bold">找不到配件嗎?</h3>
                <p class="card-text mt-3 fs-5">我們幫你找! 庫存品二手良品經由工程師嚴格測試把關!</p>
                <div class="d-flex justify-content-end">
                  <a href="/productpage" class="btn btn-success btn-hover rounded-0">查看更多</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Login from '@/components/Login.vue';
import Footer from "@/components/Footer.vue";
export default {
  name: "AboutUs",
  components: {
    Navbar, Login, Footer
  }
}
</script>