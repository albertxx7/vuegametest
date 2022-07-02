<template>
    <div class="add-to-cart">
        <button class="btn btn-success fs-6" @click="addToCart" data-bs-target="#miniCartModal"><i class="fa-solid fa-cart-plus mx-1"></i>加到購物車</button>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
    name: "add-to-cart",
    props: {
        name: String,
        price: String,
        productId: String,
        imagebig: String
    },
    data() {
        return {
            item: {
                productName: this.name,
                productPrice: this.price,
                product_id: this.productId,
                images: this.imagebig,
                productQuantity: 1,
            }

        }
    },
    methods: {
        addToCart() {
           let myModal = new Modal(document.getElementById('miniCartModal'));
           myModal.show();
           this.$store.commit('addToCart', this.item)
        }
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
