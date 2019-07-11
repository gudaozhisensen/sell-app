<template>
<transition name="move">
    <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide()">
                    <i class="icon-arrow_lift"></i>
                </div>
                
            </div>

            <div class="foods-content">
                <h1 class="food-title">{{food.name}}</h1>
                <div class="food-detail">
                    <span class="food-sellCount">月售{{food.sellCount}}份</span>
                    <span class="food-rating">haopingl{{food.rating}}</span>
                </div>
                <div class="food-price">
                   <span class="newPrice">￥{{food.price}}</span><span class="oldPrice" v-show="food.oldPrice" >￥{{food.oldPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</transition>
    
</template>

<script>
import Bscroll from 'better-scroll';
export default {
  props: {
      food:{
          type: Object
      }
  },
  data() {
      return {
          showFlag: false
      }
  },
  methods: {
      show() {
          this.showFlag = true;
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
    .content{
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

</style>