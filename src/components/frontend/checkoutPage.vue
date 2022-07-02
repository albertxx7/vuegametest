<template>
    <Navbar></Navbar>
    <Login></Login>
    <div class="container">
        <div class="row mh-wrapper">
            <div class="col-12 py-3">
                <div class="row justify-content-center bg-light my-3">
                    <div class="col-md-8">
                        <div class="d-flex py-3 align-items-center justify-content-center">
                            <div class="pt-5">
                                <p class="h3">歡迎結帳</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 p-3">
                        <h3 class="py-1">購物清單</h3>
                        <div class="line-info mb-3"></div>
                        <div class="row py-3 align-items-center" v-for="item in this.$store.state.cart" key="index">
                            <div class="col-4 col-md-2 mb-3">
                                <img :src="item.images" alt="" width="120">
                            </div>
                            <div class="col-8 col-md-5 d-flex flex-column justify-content-between">
                                <p class="h5">{{ item.productName }}</p>
                                <div class="input-number-group input-group w-75">
                                    <button type="button" class="btn btn-sm minus border border-dark btn-outline-dark "
                                        @click="handleSub(item)">
                                        -
                                    </button>
                                    <input type="number" v-model.number="item.productQuantity"
                                        oninput="if(value>5)value=5;if(value.length>2)value=value.slice(0,2);if(value<0)value=0"
                                        class="text-center form-control input-number rounded-0 border-dark ">

                                    <button type="button" class="btn btn-sm add border border-dark btn-outline-dark"
                                        @click="handlePlus(item)">
                                        +
                                    </button>
                                </div>
                            </div>
                            <div class="col-8 col-md-3">
                                <p class="h5 my-1">
                                    <span class="d-md-none d-inline-block">價格:</span>
                                    {{ currency(item.productPrice * item.productQuantity) }} <span class="fst-italic">NTD$</span>
                                </p>
                            </div>
                            <div class="col-4 col-md-2">
                                <span @click="$store.commit('removeFromCart', item)" class="crusor">X</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12 text-end">
                                <p class="h4 py-2">
                                    <span class="me-3">總計:</span>{{ currency(this.$store.getters.totalPrice) }} <span class="fst-italic">NTD$</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <form class="row g-3 fw-bold">
            <div class="col-md-6">
                <label for="name" class="form-label">姓名</label>
                <input type="text" class="form-control" id="name" v-model="profile.name">
            </div>
            <div class="col-md-6">
                <label for="number" class="form-label">電話</label>
                <input type="text" class="form-control" id="number" v-model="profile.phone">
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">地址</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="請輸入地址" v-model="profile.address">
            </div>
        </form>
            <div class="col-12">
                <button class="btn btn-primary" @click="order()">結帳</button>
            </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Login from "@/components/Login.vue";
import MiniCart from "@/components/frontend/Minicart.vue";
import { currency } from "@/methods/filter.js";

export default {
    name: "checkout-page",
    components: {
        Navbar,
        Login,
        MiniCart,
    },
    data() {
        return {
            profile: {
                name: '',
                phone: '',
                address: ''
            }
        }
    },
    methods: {
        currency,
        handlePlus(item) {
            item.productQuantity++;
        },
        handleSub(item) {
            if (item.productQuantity > 1) {
                item.productQuantity--;
            }
        },
        reset(){
        this.profile.name='',
        this.profile.phone='',
        this.profile.address=''
        },
        order() {
            if (this.profile.name && this.profile.phone && this.profile.address) {
                this.$router.replace('/admin/profiles');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '訂單送出成功',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: '請輸入資料',
                    showConfirmButton: false,
                    timer: 5000
                });
            }
        }
    },
};
</script>

<style scoped lang="scss">

.crusor{
    cursor: pointer;
}
</style>
