<template>
	<div class="ratings" ref="ratings">
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
		 		<ratingselect :select-type="selectType" :only-content="onlyContent" :rating="ratings" @ratingtype-select="ratingtypeSelect" @content-toggle="contentToggle"></ratingselect>
				<div class="ratings-wrapper">
					<ul>
						<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.ratingType,rating.text)">
							<div class="ratings-avatar">
								<img :src="rating.avatar" alt="" width="28" height="28">
							</div>
							<div class="rating-content">
								<h1 class="rating-name">{{rating.username}}</h1>
								<div class="ratingStar-wrapper">
									<star :size="24" :score="rating.score"></star>
									<span class="delivery" >{{rating.deliveryTime}}</span>
								</div>
								<p class="rating-text">{{rating.text}}</p>
								<div class="recommend" v-show="rating.recommend && rating.recommend.length">
									<span class="icon-thumb_up"></span>
									<span class="item" v-for="item in rating.recommend">{{item}}</span>
								</div>
								<div class="rating-time">
									{{rating.rateTime | formarDate}}
								</div>
							</div>
							
						</li>
					</ul>
				</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {formarDate} from '@/common/js/date.js'; 
import star from '../star/star';
import Bscroll from 'better-scroll';
import split from "@/components/split/split";
import ratingselect from "@/components/ratingSelect/ratingSelect";

 
 const ALL = 2;
 const ERRO_OK = 0;

	export default { 
		props:{
			seller: {
				type: Object
			}
		},
		data() {
			return {
				selectType: ALL,
				onlyContent: true,
				ratings:[]
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
				if(response.errno === ERRO_OK ){
					this.ratings = response.data;
				}
			});
			this.$nextTick(() =>{
              if (!this.scroll) {
                  this.scroll = new Bscroll(this.$refs.ratings,{
                      click :true
                  });
              }else{
                  this.scroll.refresh();
              }
          });
		},
		methods: {
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
.ratings-wrapper{
	padding: 0 18px;
	

}
.rating-item{
	display: flex;
	padding: 18px 0;
	border-bottom: 1px solid rgba(7, 17, 27,0.1);
}
.ratings-avatar{
	flex:0 0 28px;
	width: 28px;
	margin-right:12px;
	
}
.ratings-avatar img{
	border-radius: 50%; 
}
.rating-content{
	flex: 1;
	position: relative;
}
.rating-name{
	margin-bottom: 4px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(7, 17, 27);
}
.ratingStar-wrapper{
	margin-bottom: 6px;
	font-size: 0px;
}
.delivery{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147, 153, 159);
}
.rating-text{
	margin-bottom: 8px;
	line-height: 18px;
	color: rgb(7, 17, 27);
	font-size: 12px;
}
.recommend{
	line-height: 16px;
	font-size: 0;
}
.recommend .icon-thumb_up, .item{
	display: inline-block;
	margin: 0 8px 4px 0; 
	font-size: 9px;
	
}
.recommend .icon-thumb_up{
	 color: rgb(0, 160, 220);
}
.item{
	padding: 0 6px;
	border: 1px solid rgba(7, 17, 27,0.1);
	border-radius: 1px;
	color: rgb(147, 153, 159);
	background: #fff;
}
.rating-time{
	position: absolute;
	top: 0;
	right: 0;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147, 153, 159);
}
</style>