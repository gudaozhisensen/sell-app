<template>
<transition name="move">
    <div class="food" v-show="showFlag" ref="food">
        <div class="contents">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide()">
                    <i class="icon-arrow_lift"></i>
                </div>
                
            </div>

            <div class="food-content">
                <h1 class="food-title">{{food.name}}</h1>
                <div class="food-detail">
                    <span class="food-sellCount">月售{{food.sellCount}}份</span>
                    <span class="food-rating">haopingl{{food.rating}}</span>
                </div>
                <div class="food-price">
                   <span class="newPrice">￥{{food.price}}</span><span class="oldPrice" v-show="food.oldPrice" >￥{{food.oldPrice}}</span>
                </div>

            <div class="cartControl-wrapper">
                <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="fade">
                <div class="buy" @click.stop.prevent="addFirst()" v-show="!food.count || food.count===0">加入购物车</div>
            </transition>
            </div>
            <split v-show="food.info"></split>
            
            <div class="info">
                <h1 class="info-title">商品信息</h1>
                <p class="info-text" v-show="food.info">{{food.info}}</p>
            </div>

             <split></split>
             <div class="rating">
                 <h1 class="rating-title">商品评价</h1>
                 <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
             </div>
        </div>
    </div>
</transition>
    
</template>

<script>
import Bscroll from 'better-scroll';
import cartcontrol from '@/compenents/cartcontrol/cartcontrol';
import cartcontrol from '@/compenents/split/split';
import ratingselect from '@/compenents/ratingSelect/ratingSelect';
import Vue from 'vue';

 const POSTIVE  = 0;
 const NEGATIVE = 1;
 const ALL = 2;

export default {
  props: {
      food:{
          type: Object
      }
  },
  data() {
      return {
          showFlag: false,
          selectType:ALL,
          onlyContent: true,
          desc:{
              all: '全部',
              positive: '推荐',
              negative: '吐槽'
          }

      }
  },
  components: {
      cartcontrol,
      split,
      ratingselect
  },
  methods: {
      show() {
          this.showFlag = true;
          this.selectType = ALL;
          this.onlyContent = true;
          this.$nextTick(() =>{
              if (!this.scroll) {
                  this.scroll = new Bscroll(this.refs.food,{
                      click :true
                  });
              }else{
                  this.scroll.refresh();
              }
          });
      },
      hide() {
          this.showFlag = false;
      },
      addFirst() {
          Vue.set(this.food, 'count', 1);
      }
  },
};
</script>
   
<style>
     .food {
         position: fixed;
         left: 0;
         top: 0;
         bottom: 48px;
         z-index: 30;
        width: 100%;
        background: #fff;
     }

    .move-transition{
        transition: all 0.2s linear;
        transform: translate3d(0,0,0);
    }

    .move-enter,.move-leave{
        transform: translate3d(100,0,0);
    }
    .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        /* 设置padding为100%,就是为宽高相等的容器?说实话不是很懂 */
    
    }
    .image-header img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

    }
    .back{
        position: absolute;
        top: 10px;
        left: 0;
    }
    .icon-arrow_lift{
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    .food-content{
        position: relative;
        padding: 18px;
    }
    .food-title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700px;
        color: rgb(7, 17, 27);
    }
    .food-detail{
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        height: 10px;
    }
    .food-sellCount, .food-rating{
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .food-sellCount{
        margin-right: 12px;
    }
    .cartControl-wrapper{
        position: absolute;
        bottom: 0;
        right: 12px;
    }
    .buy{
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        line-height: 24px;
        height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 10px;
        font-size: 10px;
        color: #fff;
        background: rgb(0,160,220);
    }
    .fade-transition{
        transition: all 0.2s;
        opacity: 1;
    }
    .fade-enter,.fade-leave{
        opacity: 0;
    }
    .info{
         padding: 18px;
    }
    .info-title{
       line-height: 14px;
       margin-bottom: 6px;
       font-size: 14px;
       color: rgb(7, 17, 27);
    }
    .info-text{
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
    }
    .rating{
       padding-top: 18px; 
    }
    .rating-title{
       line-height: 14px;
       margin-left: 18px;
       font-size: 14px;
       color: rgb(7, 17, 27);
    }
</style>