<template>
<div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="footer__text">
          <div class="footer__logo ">
            <a href="#"><img src="@/assets/svg/logo.svg" alt="" width="200"/></a>
          </div>
          <div class="footer__social">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-envelope-o"></i></a>
          </div>
          <h5 class="fw-bolder my-3">專業 可靠 迅速</h5>
      
           <small class="fw-bolder fs-6 ">
            Albert Hsu © - 學習製作使用 無商業用途
          </small>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
  methods: {
    gostores() {
      this.$router.replace("stores");
    },
  },
};
</script>

<style scoped lang="scss">
.footer__text {
  text-align: center;
  background-color: rgb(255, 255, 255);
}

.footer__text .footer__logo {
  margin-bottom: 10px;
}

.footer__text .footer__logo a {
  display: inline-block;
}

.footer__text .footer__social a {
  display: inline-block;
  font-size: 16px;
  color: #111111;
  height: 46px;
  width: 46px;
  background: #e7e7e7;
  border-radius: 50%;
  line-height: 46px;
  text-align: center;
  -webkit-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
  margin-right: 6px;
}
.footer__social{
  margin: 10px 0;
}

.footer__text .footer__social a:last-child {
  margin-right: 0;
}

.footer__text .footer__social a:hover {
  background: #f4952f;
  color: #ffffff;
}

.footer__copyright {
  color: #444444;
  text-align: center;
  border-top: 1px solid #e1e1e1;
}
</style>
