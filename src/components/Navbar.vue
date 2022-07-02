<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand bg-size" href="#">
        <img src="@/assets/svg/logo.svg" width="150" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between my-2" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link fs-4 text-dark text-center" aria-current="page" href="#">首頁
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="productpage" class="nav-link fs-4 text-dark text-center">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="about" class="nav-link fs-4 text-dark text-center" href="#">品牌故事</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-4 text-dark text-center profile" @click="gomenber()">會員中心</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <form class="form-inline text-center ">
            <!-- 點選後彈出login視窗(Modal) -->
            <a class="btn btn-outline-success fs-5 mx-1" type="submit" @click="newmodal" data-bs-target="#login"
              data-bs-toggle="modal" v-show="isLogin == 'no'">登入/註冊</a>
            <a class="btn btn-outline-success fs-5" @click="logout()" v-show="isLogin == 'yes'">會員登出</a>          
            <a class="btn btn-outline-success fs-5" data-bs-target="#miniCartModal" data-bs-toggle="modal"><i
                class="fa-solid fa-cart-shopping"></i></a>
          </form>     
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { Modal } from 'bootstrap'
export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  data() {
    return {
      isLogin: "no",
    };
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          let timerInterval;
          Swal.fire({
            title: "登出成功!",
            html: "即將關閉 <b></b> ",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
          this.$router.replace("/");
        })
        .catch((error) => {
          // An error happened.
        })
    },
    gomenber() {
      //登入後才可到會員中心
      this.isLoading = true;
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        this.$router.replace('admin');
      } else {
        //未登入提醒
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '請先註冊或登入!',
          showConfirmButton: false,
          timer: 2000
        });
        this.isLoading = false;
      }
    },

  },
  created() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.isLogin = "yes";
    } else {
      // No user is signed in.
    }
  },
};
</script>

<style scoped lang="scss">
.container-fluid {
  background-color: white;
}

.nav-link:hover,
.nav-link:focus {
  transform: translateY(-2px);
  transition: transform 0.2s ease, color 0.2s ease;
}

.navbar {
  padding: 0;
}

.profile {
  cursor: pointer;
}
</style>
