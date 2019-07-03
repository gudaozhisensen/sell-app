<template>
    <div class="shopCart">
        <div class="shop-content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="shop-logo">
                        <span class="icon-shopping_cart"></span>
                    </div>
                </div>
                <div class="shop-price">￥45元</div>
                <div class="shop-desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="shop-pay">￥{{minPrice}}元起送</div>
                </div> 
       </div>
    </div>
</template>

<script>
export default {
    props: {
    deliveryPrice: {
      type: Number
    },
    minPrice:{
        type:Number
    }
  }
}
</script>

<style>
    .shopCart{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        background: #000;
    }
    .shop-content{
        display: flex;
        background: #141d17;
         color: rgba(255, 255, 255, 0.4);
    }
    .content-left{
        flex: 1;
    }
    .logo-wrapper{
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        height: 56px;
        width: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d17;
    }
    .shop-logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
    }
    .icon-shopping_cart{
       font-size: 24px;
       line-height: 44px;
       color: #80858a;
       
    }
    .shop-price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
         
    }
    .shop-desc{
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
         
        font-size: 10px; 
    }
    .content-right{
        flex: 0 0 105px;
        width: 105px;
    }
    .shop-pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700px;
        background: #2b333b;
    }
</style>