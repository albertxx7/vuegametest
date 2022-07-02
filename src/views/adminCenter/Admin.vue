<template>
  <div class="admin">
    <div class="page-wrapper chiller-theme toggled">
      <a
        id="show-sidebar"
        @click="closeMenu"
        class="btn btn-sm btn-dark"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="/">8Bit Game Shop</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="/img/user.png"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name"
                >
                <strong>{{name}}</strong>
              </span>
              <span class="user-role">{{email}}</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu ">
            <ul>
              <li class="header-menu">
                <span>主頁</span>
              </li>

              <li>
                <router-link to="/admin/overview">
                  <i class="fa fa-chart-line"></i>
                  <span>中心</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>訂單</span>
                </router-link>
              </li>

              <li>
                <router-link to="/admin/profiles">
                  <i class="fa fa-user"></i>
                  <span>會員資料</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>登出</span>
                </a>
              </li>
                 <li>
                <router-link to="/admin/products">
                  <i class="fab fa-amazon"></i>
                  <span>商品後台(僅管理員使用)</span>
                </router-link>
              </li>
            </ul>
            
         
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "admin",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      email:null,
    };
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          let timerInterval;
          Swal.fire({
            title: "登出成功!",
            html: "將在 <b></b>後關閉",
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
        });
    },
  },
  created() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
       this.email = user.email;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
  },
};
</script>

<style scoped lang="scss"></style>
