<template>
<transition name="move">
    <div class="food" v-show="showFlag" ref="foodScroll">
        <div class="contents">
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
                    <span class="food-rating">好评率{{food.rating}}</span>
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
                 <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :rating="food.ratings" @ratingtype-select="ratingtypeSelect" @content-toggle="contentToggle"></ratingselect>
                 <div class="rating-wrapper">
                     <ul v-show="food.ratings && food.ratings.length">
                         <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.ratingType,rating.text)">
                             <div class="user">
                                 <span class="user_name">{{rating.username}}</span>
                                  <img class="user_avatar" width="12" height="12" :src="rating.avatar">
                             </div>
                            <div class="user_time">{{rating.rateTime | formarDate}}</div>
                            
                            <p class="user_text">
                            <!-- 自定义绑定class评价icon根据ratingType来 -->
                            <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                        </p>
                         </li>
                        
                     </ul>
                     <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                         暂无评价
                     </div>
                     
                 </div>
             </div>
        </div>
    </div>
</transition>
    
</template>

<script>
import {formarDate} from '@/common/js/date.js'; //export 的是function
import Bscroll from 'better-scroll';
import cartcontrol from "@/components/cartControl/cartControl";
import split from "@/components/split/split";
import ratingselect from "@/components/ratingSelect/ratingSelect";
import Vue from 'vue';

 const POSTIVE  = 0;
 const NEGATIVE = 1;
 const ALL = 2;

export default {
  props: {
      food:{
          type: Object
      },

  },
  data() {
      return {
          showFlag: false,
          selectType: ALL,
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
           this.onlyContent = false;
          this.$nextTick(() =>{
              if (!this.scroll) {
                  this.scroll = new Bscroll(this.$refs.foodScroll,{
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
      },
      needShow(type,text){
          if(this.onlyContent && !text){
              return false;
          }
          if(this.selectType === ALL){
              return true;
              
          }else{
              console.log(this.selectType);
              return type === this.selectType; 
               
          }
         
      },
    //   父子间通信。通过$emit(子组件) 和  @(父组件)
      ratingtypeSelect(type){
          this.selectType = type;
           this.$nextTick(()=>{
              this.scroll.refresh();
          });
        //   return this.selectType;
      },
      contentToggle(onlyContent){
          this.onlyContent = !this.onlyContent;
          this.$nextTick(()=>{
              this.scroll.refresh();
          });
           
      }
      
  },
  filters:{
          formarDate(time){
              let date = new Date(time);
              return formarDate(date,'yyyy-MM-dd hh:mm');
          }
      }
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
        transform: translate3d(100%,0,0);
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
    .foods-content{
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
        bottom: 18px;
        right: 12px;
    }
    .newPrice{
        font-size: 14px;
        color: rgb(240,20,20);
            
        	}
    .oldPrice{
        text-decoration: line-through;
        padding-left: 8px;
        font-size: 10px;
        color: rgb(147,153,159);
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
    .rating-wrapper{
        padding: 0 18px;
    }
    .rating-item{
        position: relative;
        padding: 16px 0;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .rating-item>.user{
        position: absolute;
        right: 0;
        margin-right: 6px;
        top: 16px;
        line-height: 12px;
        font-size: 0;
        
    }
    .user>.user_name{
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .user>.user_avatar{
        border-radius: 50%;
    }
    .user_time{
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .user_text{
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
    }
    .icon-thumb_up,.icon-thumb_down{
        margin-right: 4px;
        line-height: 16px;
        font-size: 12px
    }
    .icon-thumb_up{
        color: rgb(0, 160, 220);
    }
    .icon-thumb_down{
        color: rgb(147, 153, 159);
    }
    .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
</style>
