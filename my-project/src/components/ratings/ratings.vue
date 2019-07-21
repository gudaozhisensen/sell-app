<template>
	<div class="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
				<h1 class="score">{{seller.score}}</h1>
				<div class="score-title">综合评分</div>
				<div class="score-rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="right-title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="right-score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="right-title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="right-score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="right-title">送达时间</span>
						<span class="delivery-time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
		 		<ratingselect :select-type="selectType" :only-content="onlyContent" ></ratingselect>
		</div>
	</div>
</template>
<script type="text/javascript">
import star from '../star/star';
import split from "@/components/split/split";
import ratingselect from "@/components/ratingSelect/ratingSelect";

 const POSTIVE  = 0;
 const NEGATIVE = 1;
 const ALL = 2;

	export default {
		props:{
			seller: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true
			}
		},
		components:{
			star,
			ratingselect,
			split
		},
		created() {
			this.$http.get('/api/ratings').then((response )=>{
				response  = response.body;
			});
		},
	}
	
</script>
<style type="text/css">
.ratings{
	position: absolute;
	top: 174px;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.overview{
	display: flex;
	padding: 18px 0;
}
.overview-left{
	padding: 6px 0;
	flex:0 0 147px;
	text-align: center;
	border-right: 1px solid rgba(7, 17, 27, 0.2);
}
/* 适应iphone5做出的调整 only表示只在支持媒体查询的浏览器中表示 */
@media (max-width:320px){
	.overview-left{
		flex: 0 0 120px;
		width: 120px;
	}
}
.score{
	margin-bottom: 6px;
	line-height: 28px;
	font-size: 24px;
	color: rgb(255, 153, 0);
}
.score-title{
	margin-bottom: 8px;
	color: rgb(7, 17, 27);
	line-height: 12px;
	font-size: 12px;
}
.score-rank{
	line-height: 10px;
	font-size: 10px;
	color: rgb(147, 153, 159);
}
.overview-right{
	flex: 1;
	padding:6px 0 6px 24px;
}
/* 适应iphone5做出的调整 only表示只在支持媒体查询的浏览器中表示 */
@media (max-width:320px){
	.overview-right{
		padding:0 0 0 6px;
	}
}

.score-wrapper{
	margin-bottom: 8px;
	font-size: 0;
}
.right-title{
	line-height: 18px;
	display: inline-block;
	font-size: 12px;
	color: rgb(7, 17, 27);
}
.star{
	display: inline-block;
	margin: 0 12px;
	vertical-align: top;
}

.right-score{
	line-height: 18px;
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
	color: rgb(255, 153, 159);
}
.delivery-wrapper{
	font-size: 0;
}
.delivery-time{
	margin-left: 12px;
	font-size: 12px;
	color: rgb(147, 153, 159);
	
}
</style>