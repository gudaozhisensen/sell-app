<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
       <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/javascript">
const ERR_OK = 0;
import header from './components/header/header'
import {urlParse} from '@/common/js/util.js'
export default {
  data() {
    return {
      seller: {
        id:(() => {
          let queryParam = urlParse();
          console.log(queryParam.id);
          return queryParam.id;
        })()
      }
    }
  },
  created() {
    {
      // GET /someUrl 对象初始化的添加数据,数据传递的阶段
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
        // get body data
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          // console.log(this.seller);

          // 提供的assign方法来进行数据复制
          this.seller = Object.assign({}, this.seller);
        }
      }, response => {
        // error callback
      });
    }
  },

  components: {
    'v-header': header
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;

}

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-1px(rgba(7, 17, 27, 0.1));
}

.tab-item {
  flex: 1;
  text-align: center;
}

&>a {
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
}

&.active {
  color: rgb(240, 20, 20);
}

</style>

