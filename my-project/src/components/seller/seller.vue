<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="seller-overview">
				<h1 class="seller-title">{{seller.name}}</h1>
				<div class="seller-desc">
					<star :size="36" :score="seller.score"></star>
					<span class="seller-text">{{seller.ratingCount}}</span>
					<span class="seller-text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="remark-content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="remark-content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="remark-content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			
			<split></split>

			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>

				<ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
			<div class="favorite">
				<span class="icon-favorite" :class="active"></span>
				<span class="text">{{favoriteText}}</span>
			</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">

	import star from '../star/star';
	import split from "@/components/split/split";
	import Bscroll from 'better-scroll';
	
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: false,
			}
		},
		computed: {
			
		},
		components: {
			star,
			split
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		mounted() {
			this.$nextTick(() =>{
              if (!this.scroll) {
                  this.scroll = new Bscroll(this.$refs.ratings,{
                      click :true
                  });
              }else{
                  this.scroll.refresh();
              }
          });
		}
		
	}
</script>
<style type="text/css" lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/icon.styl";


	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.seller-overview{
		padding: 18px;	
	}
	.seller-title{
		margin-bottom: 8px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	.seller-desc{
		padding-bottom: 18px;
		
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	.seller-desc > .star{
		display: inline-block;
		margin-right: 8px;	
		vertical-align: top;
	}
	.seller-text{
		display: inline-block;
		margin-right: 12px;
		line-height: 18px;
		vertical-align: top;
		font-size: 10px;
		color: rgb(77, 85, 93);
	}
	.remark{
		display: flex;
		padding-top: 18px
	}
	.block{
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
	}
	.block :last-child{
		border: 0;
	}
	.remark>h2{
		margin-bottom: 10px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.remark-content{
		line-height: 24px;
		font-size: 10px;
		color: rgb(7, 17, 27);
	}
	.stress{
		font-size: 24px;
	}

	.bulletin{
		padding: 18px 18px 0 18px;
	}
	.bulletin>.title{
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	.bulletin>.content-wrapper{
		padding: 0 12px 16px 12px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.bulletin>.content{
		line-height: 24px;
		font-size: 24px;
		color: rgb(240,20,20);
	}
	.bulletin>.support>.support-item{
		padding: 16px 12px;
		font-size: 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}

	.supports>.icon{
		height: 12px;
		width: 12px;
		display: inline-block;
		vertical-align: top;
		margin-right: 4px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.decrease {
		bg-image('decrease_4');
	}
	.discount {
		bg-image('discount_4');
	}

	.guarantee {
		bg-image('guarantee_4');
	}

	.invoice {
		bg-image('invoice_4');
	}

	.special {
		bg-image('special_4');
	}
	.supports>.text{
		line-height: 24px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}

</style>