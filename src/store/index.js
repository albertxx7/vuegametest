import { createStore } from "vuex";

let cart = window.localStorage.getItem("cart");

export default createStore({
  state: {
    cart: cart ? JSON.parse(cart) : [],
  },
  getters: {
    totalPrice: (state) => {
      let total = 0;
      state.cart.filter((item) => {
        total += item.productPrice * item.productQuantity;
      });
      return total;
    },
  },
  mutations: {
    addToCart(state, item) {
      let found = state.cart.find(
        (product) => product.product_id == item.product_id
      );
      if (found) {
        found.productQuantity++;
      } else {
        state.cart.push(item);
      }
      this.commit("savaData");
    },
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
      this.commit("saveData");
    },
    
    savaData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
