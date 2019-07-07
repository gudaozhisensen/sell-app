<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
          <span class="text border-1px">
          <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
           {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul >
        <li v-for="(item,index) in goods" class="food-list food-list-hook" ref="foodListHook">
          <!-- ref 和 class 的方法都可以取得dom元素 -->
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="food-icon">
                <img height="57px" width="57px" :src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="name"> {{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好频率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">￥{{food.price}}</span><span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                  <div class="cartControl-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div> 
                </div>
                              
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script type="text/javascript">
import BScroll from "better-scroll";
import shopcart from "@/components/shopCart/shopCart";
import cartcontrol from "@/components/cartControl/cartControl"
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY:0
    };
  },
  computed: {
    //实时计算，发生变化
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++) {
         let heightPre  = this.listHeight[i];
         let heightNext = this.listHeight[i + 1];
            // console.log(this.scrollY);
          if (!heightNext || (this.scrollY >= heightPre && this.scrollY < heightNext)) {
              return i;       
          }
      }
       return 0;
    },
    selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) =>{
            if (food.count) {
              foods.push(food);
             
            }
          });
        });
        return foods;
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(()=>{
            this._initScroll();
            this._calculatorHeight();
        });
        // console.log(this.goods);
      }
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components:{
    shopcart,
    cartcontrol
  },
  methods: {
    
    _initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click:true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        probeType: 3,//实时监控scroll位置
        click:true
       
      });
     
      //获取实时监控滚动的y值，取整
      this.foodsScroll.on('scroll',(pos)=>{
      this.scrollY = Math.abs(Math.round(pos.y));
      })
      
    },
    _calculatorHeight(){
        //获得每个分类的高度,存到listHeight数组中，两个方法都可以，神坑！·
        // let foodList = this.$refs.foodListHook;
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
       
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
          
        }
    },
    selectMenu(index){
      console.log(index);
        // if (!event._constructed) {
        //   return;
        // }

        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el);
    }
  
  }
};

</script>
<style type="text/css" lang="stylus">
@import"../../common/stylus/mixin.styl";
@import "../../common/stylus/icon.styl";
.goods {
  position: absolute;
  display: flex;
  width: 100%;
  top: 174px;
  bottom: 46px;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    /*兼容问题不写的话在安卓浏览器上会有问题*/
    background: #f2f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;
      border-1px(rgba(7, 17, 27, .1));
    }
    .current{
      z-index : 10;
      margin-top : -1px;
      background : #fff;
      font-weight : 700;
      position: relative; 
      
      .text{
        border:none;
      }
    }
    .icon {
      display: inline-block;
      height: 12px;
      width: 12px;
      vertical-align: top;
      margin-right: 2px;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      &.decrease {
        bg-image('decrease_3');
      }
      &.discount {
        bg-image('discount_3');
      }

      &.guarantee {
        bg-image('guarantee_3');
      }

      &.invoice {
        bg-image('invoice_3');
      }
 
      &.special {
        bg-image('special_3');
      }
    }
    .text {
      display: table-cell;
      vertical-align: middle;
      line-height: 15px;
      // border-1px(rgba(7,17,27,0.1))
      width: 56px;
      font-size: 12px;
    }
    
  }
  .foods-wrapper {
    flex: 1;
    }
    .title {
      display: block;
      height: 26px;
      padding-left: 14px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
      line-height: 26px;
      margin-top: 0;
      margin-bottom: 18px;
    }
    
    .food-item {
      display: flex;
      margin: 18px;
      } 

      .food-icon {
        padding-right:10px
        flex: 0 0 57px;
      }
      .food-content {
        flex: 1;
        margin-top: 2px;
      }
        // .name,.desc{
        // 	padding-bottom: 8px;
        // }
        .name{
        	margin: 2px 0 8px 0;
        	height: 14px;
        	line-height: 14px;
        	font-size: 14px;
        	color: rgb(7,17,27);
        }
        .desc{
        	margin-bottom: 8px;
        }
        .desc,.extra{
        	font-size: 10px;
        	color: rgb(147,153,159);
        	line-height: 12px;
        }
        .extra :first-child{
			    margin-right: 10px;
        }
        
        
        .price{
        	font-weight: normal;
        	line-height: 24px;
          position relative;
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
       


        .cartControl-wrapper{
          position absolute;
          right:0;
          bottom: -10px;
          }
      
    
  
}

</style>
