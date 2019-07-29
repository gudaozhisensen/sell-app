<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img height="64" width="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="descreption">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-if="detailShow" class="ditail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="3.6"></star>
            </div>
            <!-- 优惠信息 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!-- 优惠信息详情 -->
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <!--商家公告 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!-- 商家公告详情 -->
            <div class="bulletin">
              <p class="bulletin-content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import star from '../star/star';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};

</script>
<style type="text/css" lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
@import "../../common/stylus/icon.styl";
@import "../../common/stylus/base.styl";


.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7, 17, 27, .5);
}

.content-wrapper {
  padding: 24px 12px 18px 24px;
  font-size: 0;
  position: relative;
}

.avatar {
  vertical-align: top;


  img {
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
}

.avatar,
.content {
  display: inline-block;
}

.content {
  margin-left: 16px;
}

.title {
  margin: 2px 0 8px 0;
}

.brand {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  bg-image('brand');
  background-size: 30px 18px;
  background-repeat: no-repeat;
}

.name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}

.descreption {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 100;
  line-height: 12px;
}

.support {
  margin-bottom: 2px;
  .icon {
    height: 12px;
    width: 12px;
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .decrease {
    bg-image('decrease_1');
  }
  .discount {
    bg-image('discount_1');
  }

  .guarantee {
    bg-image('guarantee_1');
  }

  .invoice {
    bg-image('invoice_1');
  }

  .special {
    bg-image('special_1');
  }
}

.text {
  line-height: 12px;
  font-size: 10px;
}

.support-count {
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0, 0, 0, .2);
  text-align: center;

  .count {
    font-size: 10px;
  }
  .icon-keyboard_arrow_right {
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
}

.bulletin-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: rgba(7, 17, 27, .2);

  .bulletin-title {
    display: inline-block;
    vertical-align: top;
    width: 22px;
    height: 12px;
    margin-top: 8px;
    bg-image('bulletin');
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
    font-weight: 200;
  }
  .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}

.ditail {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  background: rgba(7, 17, 27,0.8);
  //只有在ios上生效  
  backdrop-filter:blur(10px);
  //背景色要设置在这才会正常生效效果
   
}
// 设置渐变
.fade-enter-to, .fade-leave-active{
  transition:opacity 0.5s;
    
}
.fade-enter, .fade-leave-to{
  opacity:0;

}
.detail-wrapper {
  min-height: 100%; //最小高度要有视口那么高
  width: 100%;
  .detail-main {
    margin-top: 64px;
    padding-bottom: 64px; //很重要，不加，xx就会把内容覆盖住
    .name {
      line-height: 16px;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
  }
}

.star-wrapper {
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
}

.detail-main>.title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;
  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }
  .text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
}

.detail-main>.supports {
  width: 80%;
  margin: 0 auto;

  .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
    font-weight: 200;
    line-height: 12px;
    color: rgb(255, 255, 255);
    &:last-child {
      margin-bottom: 0;
    }
    .icon {
      display: inline-block;
      height: 16px;
      width: 16px;
      vertical-align: top;
      margin-right: 6px;
      background-size: 16px 16px;
      background-repeat: no-repeat;
      &.decrease {
        bg-image('decrease_2');
      }
      &.discount {
        bg-image('discount_2');
      }

      &.guarantee {
        bg-image('guarantee_2');
      }

      &.invoice {
        bg-image('invoice_2');
      }

      &.special {
        bg-image('special_2');
      }
    }
    .text {
      line-height: 16px;
      font-size: 12px;
    }
  }
}

.bulletin {
  width: 80%;
  margin: 0 auto;
  .bulletin-content {
    padding: 0 12px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
  }
}

.detail-close {
  position: absolute;
  height: 32px;
  width: 32px;
  left: 0;
  right: 0;
  color: rgba(255, 255, 255, .5);
  font-size: 32px;
  margin: -64px auto 0 auto;
  clear: both;
}

</style>
