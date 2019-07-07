<template>
    <div class="shopCart">
        <div class="shop-content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="shop-logo" :class="{'highLight':totalCount > 0}">
                        <i class="icon-shopping_cart" :class="{'highLight':totalCount > 0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="shop-price" :class="{'highLight':totalPrice > 0}">￥{{totalPrice}}元</div>
                <div class="shop-desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="shop-pay" :class="payClass">{{payDesc}}</div>
            </div>        
       </div>

        <div class="shopCart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="shopCart-title">购物车</h1>
                    <div> <span class="shopCart-empty">清空</span></div>
                </div>
                <div class="list-content">
                    <ul>
                        <li class="shopCart-food" v-for="food in selectFoods">                 
                                    <span class="shopCart-name">{{food.name}}</span>
                                    <div class="shopCart-price">
                                        <span>￥{{food.price}}</span>
                                    </div>
                                    <div class="shopCartControl-wrapper">
                                        <cartcontrol :food="food"></cartcontrol>
                                    </div>
                        </li>
                    </ul>
                </div>
            </div> 
    </div>
    
</template>

<script>
import cartcontrol from "@/components/cartControl/cartControl";
export default {
    //从父组件转递的数据,接受整个foods json数组     
    props: {
        selectFoods:{
            type: Array,
            default(){
                return [ 
                    
                ];
            }
        },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
        type:Number
    }
  },
  data() {
      return {
          fold: true
      }
  },
  components: {
      cartcontrol
  },
  methods: {
      toggleList() {
          if (!this.totalCount) {
              return;
          }
          this.fold = !this.fold;
      }
  },
  computed: {
      totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
              total += food.price * food.count;
          });
          return total;
      },
      totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
              count += food.count;
          });
          return count;
      },
      payDesc() {
          if (this.totalPrice === 0) {
              //ES6中字符串的扩展``,把变量用${}的方式传入" `` "中,没有变量时用普通'' 传递,因为ES6-lint会
              return `￥${this.minPrice}元起送`;
          }else if (this.totalPrice < this.minPrice) {
              let diff = this.minPrice - this.totalPrice;
              return `还差￥${diff}起送`;
              
          }else{
              return '去结算';
          }
      },
      payClass() {
          if (this.totalPrice < this.minPrice) {
              return 'not-enough';
          }else{
              return 'enough';
          }
      },
      listShow() {
          if (!this.totalCount) {
              this.fold = true;
              return false;
          }
          let show = !this.fold;
          return show;
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
        position: relative;
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
    .num{
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700px;
        color: #fff;
        background: rgba(240,20,20);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
    .shop-logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
    }
    .logo-wrapper>.highLight{
        background: rgb(0, 160, 200);
        color:rgb(255, 255, 255);
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
    .highLight{
        color: #fff;
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
        font-weight: 700;
        background: #2b333b;
    }
    .not-enough{
        background: #2b333b;
    }
    .enough{
        background: #00b43c;
        color: #fff;
        font-size: 15px;
    }

    .shopCart-list{
        position: absolute;
        bottom: 48px;
        left: 0;
        z-index: -1;
        width: 100%;
    }
    .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }

    .shopCart-title{
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .shopCart-wrapper{
         position: relative;
    }
    
    .shopCart-empty{
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
    }
    .list-content{
        padding: 0  18px;
        max-height: 148px;
        overflow: hidden;
        background: #fff;
        
    }
    .shopCart-food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
    }
    .shopCart-name{
        line-height: 24px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .shopCart-price{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-weight: 700px;
        color:rgb(240, 20, 20);
        font-size: 14px;
    }
    .shopCartControl-wrapper{
        position: absolute;
        right: 0;
        bottom: 11px;
    }
</style>