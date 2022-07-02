<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3 class="fw-bolder fs-1">會員資料設定</h3>

            <p class="fw-bolder fs-3">您可以在此更改您的資料</p>
          </div>
          <div class="col-md-5">
            <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid" />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills p-2" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active fs-3 " id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab"
              aria-controls="profile" aria-selected="true">會員資料</a>
          </li>

          <li class="nav-item">
            <a class="nav-link fs-3" id="account-tab" data-bs-toggle="tab" href="#account" role="tab"
              aria-controls="account" aria-selected="false">帳戶設定</a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="container">
              <div class="row">
                <div class="col-md-6 p-2">
                  <div class="form-group">
                    <input type="text" v-model="profile.name" placeholder="全名" class="form-control" />
                  </div>
                </div>

                <div class="col-md-6 p-2">
                  <div class="form-group">
                    <input type="text" v-model="profile.phone" placeholder="電話" class="form-control" />
                  </div>
                </div>

                <div class="col-md-12 p-2">
                  <div class="form-group">
                    <input type="text" v-model="profile.address" placeholder="地址" class="form-control" />
                  </div>
                </div>

                <div class="col-md-8 p-2">
                  <div class="form-group">
                    <input type="text" v-model="profile.postcode" placeholder="郵遞區號" class="form-control" />
                  </div>
                </div>

                <div class="col-md-4 p-2">
                  <div class="form-group">
                    <input type="submit" @click="updateProfile()" value="儲存變更" class="btn btn-primary w-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade  p-3" id="account" role="tabpanel" aria-labelledby="account-tab">
            <div class="container">
              <div class="row">
                <div class="p-3 col-md-">
                  <div class="alert alert-info">
                    您可以輸入信箱後，至您的信箱收取更改密碼驗證信
                  </div>
                </div>
                <div class="col-md-6 p-3">
                  <div class="form-group">
                    <input type="text" v-model="account.email" placeholder="您的Email地址" class="form-control" />
                  </div>
                </div>
                <div class="col-md-4 p-3">
                  <div class="form-group">
                    <input type="button" @click="resetPassword" value="發送密碼重製驗證信"
                      class="btn btn-success w-100" />
                  </div>
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
import { db } from "@/firebase";
import { getAuth, signOut, sendPasswordResetEmail } from "firebase/auth";
import {
  doc, onSnapshot, setDoc,
} from "firebase/firestore";

export default {
  name: "profiles",
  components: {

  },
  props: {
    msg: String,
  },

  data() {
    return {

      profile: {
        name: null,
        phone: null,
        address: null,
        postcode: null,
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
      },
      activeItem: null,

    };
  },
  // mounted監聽實時資料 (當前登入者)
  mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    const unsub = onSnapshot(doc(db, "profiles", user.uid), (doc) => {
      console.log("Current data: ", doc.data())
      this.profile = doc.data()
    });
  },
  methods: {
    async updateProfile() {
      Swal.fire({
        title: '確定嗎?',
        text: "要修改嚕",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '儲存'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '成功!',
            '資料已上傳',
            'success'
          )
          const auth = getAuth();
          const user = auth.currentUser;
          const docRef = doc(db, "profiles", user.uid);
          setDoc(docRef, {
            name: this.profile.name,
            phone: this.profile.phone,
            address: this.profile.address,
            postcode: this.profile.postcode
          }, {
            merge: true
          }).then(() => console.log("Document updated"));
        }
        // 用setDoc 不用updateDoc 皆可
      })

    },
    resetPassword() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.account.email)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "重置密碼郵件已發送，未收到可至垃圾郵件查詢",
            showConfirmButton: false,
            timer: 1500,
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/user-not-found") {
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
    }

  },
  created() {

  },




}
</script>

