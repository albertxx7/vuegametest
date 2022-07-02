<template>
  <div class="login">
    <Loading v-model:active="isLoading"/>
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul
              class="nav nav-fill nav-pills mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link active fs-4"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                  >登入</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link fs-4"
                  id="pills-register-tab"
                  data-bs-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                  >註冊</a
                >
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center fs-4">歡迎登入</h5>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="請輸入您的email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                        <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="請按登入按鈕"
                    autocomplete="off"
                    data-bs-target="#login"
                    @keyup.enter="login"
                  />
                </div>
                <div class="form-group d-flex justify-content-between">
                  <button
                    class="btn btn-primary mt-2"
                    @click="login"
                    data-bs-target="#login"
                    data-bs-toggle="modal"
                    data-bs-dismiss="#login"
                  >
                    登入
                  </button>
                  <button
                    class="btn btn-primary mt-2"
                    @click="reset"
                    data-bs-dismiss="#login"
                     data-bs-target="#login"
                     data-bs-toggle="modal"
                  >
                    忘記密碼
                  </button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center fs-4 fw-bolder">註冊新帳號</h5>
                <div class="form-group">
                  <label for="name" class="fs-6 fw-bolder">您的名稱</label>
                  <input
                    type="text"
                    v-model="name"
                    class="form-control"
                    id="name"
                    placeholder="Your nice name"
                  />
                </div>
                <div class="form-group">
                  <label for="email fs-3" class="fs-6 fw-bolder">Email</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="fs-6 fw-bolder">Password</label>
                  <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    autocomplete="off"
                    @keyup.enter="register"
                    data-bs-target="#login"
                  />
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary mt-2"
                    @click="register"
                    data-bs-dismiss="#login"
                     data-bs-target="#login"
                  >
                    註冊
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { app, analyticsdb,db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { Modal } from 'bootstrap'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      address: null,
      postcode: null,
      modal:'',
      isLoading:false
    };
  },
  methods: {
     login() {
      this.isLoading=true;
      const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.isLoading=false;
           Swal.fire({
            position: "center",
            icon: "success",
            title: "登入成功",
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeModal();
          // 呼叫關閉login Modal
          this.$router.replace("admin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            // 密碼錯誤提醒
            Swal.fire({
              position: "center",
              icon: "error",
              title: "密碼錯誤",
              showConfirmButton: false,
              timer: 2000,
            });
           this.isLoading=false;
          } else {
            // 其他錯誤提醒
            Swal.fire({
              position: "center",
              icon: "error",
              title: "密碼錯誤或信箱尚未註冊",
              showConfirmButton: false,
              timer: 2000,
            });
            this.isLoading=false;
          }
          console.log(error);
        });
    },
    reset() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "重置密碼郵件已發送，未收到可至垃圾郵件查詢",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.replace("admin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/invalid-email") {
            // 密碼強度不足提醒
            Swal.fire({
              position: "center",
              icon: "error",
              title: "沒有這個信箱",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
    },
 async register() {
      const auth = getAuth();
      await  createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
           Swal.fire({
            position: "center",
            icon: "success",
            title: "註冊成功",
            showConfirmButton: false,
            timer: 1500,
          });
          setDoc(doc(db, "profiles", user.uid), {
           name: this.name
          });
          console.log(user.uid);
          // user.uid來自上面創建帳號時const user 從auth得到的
          this.closeModal();
          // 關閉login Modal
          this.$router.replace("admin");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            // 密碼強度不足提醒
            Swal.fire({
              position: "center",
              icon: "error",
              title: "密碼強度不足.",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            // 其他錯誤提醒
            Swal.fire({
              position: "center",
              icon: "error",
              title: errorMessage,
              showConfirmButton: false,
              timer: 100000,
            });
          }
        });
    },
      closeModal() {
         this.modal.hide()
        //  設定modal hide 
      }
  },mounted() {
      this.modal = new Modal(document.getElementById('login'))
      // 監聽modal 從dom用id取得modal 
   },
};
</script>

<style scoped lang="scss"></style>
