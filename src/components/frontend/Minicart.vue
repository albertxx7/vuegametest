<template>
    <!-- Modal -->
    <div class="modal fade" id="miniCartModal" tabindex="-1" aria-labelledby="miniCartModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="miniCartModalLabel">您的購物車</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul v-for="item in this.$store.state.cart">
                        <li class="d-flex ">
                            <img :src="item.images" alt="" width="80">
                            <div class="mx-4">
                                <h5 class="">{{ item.productName }} </h5>
                                <h5 class="fs-6">{{ currency(item.productPrice * item.productQuantity) }} $</h5>
                                <h5 class="fs-6">數量 : {{ item.productQuantity }}</h5>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續購物</button>
                    <button class="btn btn-primary" type="button" @click="checkout()" data-bs-target="#miniCartModal" data-bs-toggle="modal">結帳去</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { currency } from "@/methods/filter.js";
// 千分號引入
import { Modal } from 'bootstrap'

export default {
    name: "mini-cart",
    data() {
        return {
            modal: ''
        }
    },

    methods: {
        currency,
        checkout() {
             this.closeModal();

            this.$router.replace('/checkoutPage');
        },
        closeModal(){
             this.modal.hide();
        }
    },
    mounted() {
      this.modal = new Modal(document.getElementById('miniCartModal'));
      // 監聽modal 從dom用id取得modal 
   },

};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .modal-body ul li {

// }
</style>
