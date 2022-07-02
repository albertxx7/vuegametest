<template>
  <div class="Products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6 fw-bolder display-5">
            <p>後台管理系統</p>
            <h3>歡迎來到8 Bit Game後台</h3>
          </div>
          <div class="col-md-6">
            <img
              src="@/assets/caroulselpic/pic2.jpg"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between my-5">
      <h3 class="fw-bolder display-6">商品列表</h3>
      <button
        class="btn btn-primary"
        @click="addNew()"
        data-bs-toggle="modal"
        data-bs-target="#product"
        data-bs-dismiss="modal"
      >
        新增商品
      </button>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>品名</th>
            <th>金額</th>
            <th>標籤</th>
            <th>描述</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.data().name }}</td>
            <td>{{ product.data().price }}</td>
            <td>{{ product.data().tags }}</td>
            <td>{{ product.data().description }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="editProduct(product)"
                data-bs-toggle="modal"
                data-bs-target="#product"
              >
                編輯
              </button>
              <button class="btn btn-danger" @click="deleteProduct(product.id)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增、修改商品視窗(Modal) -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- 點擊Add Products按鈕=>出現Add Product -->
            <h5
              class="modal-title fs-3 fw-bolder"
              id="editLabel"
              v-if="modal == 'new'"
            >
              新增商品
            </h5>
            <!-- 點擊Edit按鈕=>出現Edit Product -->
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">
              編輯商品
            </h5>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-8">
                <!-- 商品價格 product name -->
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="商品名稱"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>

                <!-- 商品描述 product description -->
                <div class="form-group">
                  <label for="message-text" class="col-form-label fs-3"
                    >商品描述</label
                  >
                  <textarea
                    class="form-control"
                    id="message-text"
                    v-model="product.description"
                  ></textarea>
                </div>
              </div>

              <div class="col-md-4">
                <h4 class="display-6">商品細節</h4>
                <hr />

                <!-- 商品價格 product price -->
                <div class="form-group p-3">
                  <input
                    type="text"
                    placeholder="商品金額"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>

                <!-- 商品標籤 product tag -->
                <div class="form-group p-3">
                  <!-- ,的keycode=188 #的keycode=51-->
                  <input
                    type="text"
                    @keyup.enter="addTag()"
                    placeholder="Product tags ex:sale#"
                    v-model="tag"
                    class="form-control"
                  />
                  <!-- 標籤顯示區 -->
                  <div class="d-flex flex-wrap">
                    <div class="mt-3 mr-2" v-for="(tag, index) in product.tags">
                      <div class="tag-wrap">
                        <span class="p-1 border">{{ tag }}</span>
                        <span class="delete-tag" @click="deleteTag(tag, index)"
                          >X</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 商品圖 product image -->
                <div class="form-group p-3">
                  <label for="product_image" class="fs-5">商品圖</label>
                  <input
                    type="file"
                    @change="uploadImage"
                    class="form-control"
                  />
                </div>
                <!-- 圖片顯示區 -->
                <div class="form-group d-flex flex-wrap">
                  <div class="p-1" v-for="(image, index) in product.images">
                    <div class="img-wrap">
                      <!-- :src，綁定src=image內容(圖片路徑) -->
                      <img :src="image" alt="" width="100" class="p-3" />
                      <span
                        class="delete-img"
                        @click="deleteImage(image,index)"
                        >X</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
            <!-- 新增商品時出現Save changes -->
            <button
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
              @click="addProduct()"
              data-bs-dismiss="modal"
            >
              新增商品
            </button>
            <!-- 修改商品時出現Apply changes -->
            <button
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
              @click="updateProduct()"
              data-bs-dismiss="modal"
            >
              提交修改
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

export default {
  name: "products",
  props: {
    msg: String,
  },
  components: {
    VueEditor,
  },

  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        description: null,
        tags: [],
        images: [],
        id:null
      },
      modal: null,
      activeItem: null,
      tag: null,
    };
  },

  methods: {
    addNew() {
      this.modal = "new";
      this.reset();
    },
    watcher() {
      const q = query(collection(db, "products"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          this.products.push(doc);
          console.log(doc);
        });
      });
    },
    async updateProduct(id) {
      const washingtonRef = doc(db, "products", this.activeItem);
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, this.product, {});
      this.watcher();
      console.log("Document successfully updated!");
    },
    editProduct(product) {
      this.modal = "edit";
      this.product = product.data();
      this.activeItem = product.id;
    },
    async readData() {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        this.products.push(doc);
        console.log(doc.id, " => ", doc.data());
        console.log(doc.id);
        console.log(doc.data());
      });
    },
    async deleteProduct(id) {
      await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDoc(doc(db, "products", id));
          console.log("Document successfully deleted!");
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    async addProduct() {
      const product = this.product;
      try {
        const docRef = await addDoc(collection(db, "products"), {
          name: product.name,
          price: product.price,
          images: product.images,
          description: product.description,
        });
        console.log("Document written with ID: ", docRef.id);
        Object.assign(this.$data, this.$options.data.apply(this));
        this.readData();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
      };
    },
    addTag() {
      //console.log('pressing comma');
      //按下,會得到該筆tag資料存到product資料中的tags
      this.product.tags.push(this.tag);
      //清空已回傳的tag
      this.tag = null;
    },
    deleteTag(tag, index) {
      // 從tags陣列中依索引編號移除一項資料(這一指令可放後面=>因執行時間短放前面)
      this.product.tags.splice(index, 1);
      // 刪除tag
      tag
        .delete()
        .then(function () {
          console.log("tag deleted");
        })
        .catch(function (error) {
          console.log("an error occurred");
        });
    },
    // 解决后端返回的数据带标签
    uploadImage(e) {
      let file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `products/${file.name}`);
      // 'file' comes from the Blob or File API
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.product.images.push(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    deleteImage(image,index) {
      // image 就是上面v-for的item
      const storage = getStorage();
      this.product.images.splice(index,1)
      const storageRef = ref(storage,image);
      console.log(storageRef);
      deleteObject(storageRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
  created() {
    this.readData();
    this.watcher();
  },
};
</script>
<style scoped lang="scss">
.img-wrap {
  position: relative;
}

.img-wrap span.delete-img {
  position: absolute;
  top: 0px;
  left: -10px;
}

.img-wrap span.delete-img:hover {
  cursor: pointer;
}

.tag-wrap {
  position: relative;
}

.tag-wrap span.delete-tag {
  position: absolute;
  top: -15px;
  left: -3px;
}

.tag-wrap span.delete-tag:hover {
  cursor: pointer;
}
</style>
