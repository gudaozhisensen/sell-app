<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          <span class="text border-1px"> {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="food-icon">
                <img height="57px" width="57px" :src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="name"> {{food.name}}</h2>
                <!-- <p class="desc">{{food.description}}</p> -->
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好频率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        console.log(this.goods);
      }
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
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
      // display: table-cell;
      vertical-align: middle;
      width: 56px;
      font-size: 12px;
    }
  }
  .foods-wrapper {
    flex: 1;
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
	 // padding-bottom:18px; 

      .food-icon {
        padding-right:10px
        flex: 0 0 57px;
      }
      .food-content {
        flex: 1;
        margin-top: 2px;
        
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
        	line-height: 10px;
        }
        .extra :first-child{
			margin-right: 12px;
        }
        .price :first-child{
        	padding-right: 8px;
        }
        .price{
        	font-weight: normal;
        	line-height: 24px;
        	.newPrice{
        		margin-right: 18px;
        		font-size: 14px;
        		color: rgb(240,20,20);
        	}
        	.oldPrice{
        		text-decoration: line-through;
        		font-size: 10px;
        		color: rgb(147,153,159);
        	}
        }
      }
    }
  }
}

</style>
