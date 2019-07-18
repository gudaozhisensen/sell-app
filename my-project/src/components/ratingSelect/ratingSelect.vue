<template>
    <div class="ratingSelect">
        <div class="ratingType border-1px">
            <span @click="select(2)" class="block positive" :class="{'active_p':selectType===2}" >{{desc.all}}<span class="count"></span>{{rating.length}}</span>
            <span  @click="select(0)" class="block positive" :class="{'active_p':selectType===0}">{{desc.positive}}<span class="count"></span>{{positives.length}}</span>
            <span  @click="select(1)" class="block negative" :class="{'active_n':selectType===1}" >{{desc.negative}}<span class="count"></span>{{negatives.length}}</span>
            <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
                <span class="icon-check_circle"></span>
                <span class="rating-text">只看有内容的评价</span>
            </div>
        </div>
    </div>
</template>

<script>
 const POSTIVE  = 0;
 const NEGATIVE = 1;
 const ALL = 2;

export default {
  props: {
      rating: {
          type: Array,
          default() {
              return [];
          }
      },

     selectType: {
        type: Number,
        default: ALL
        },

     onlyContent: {
        type: Boolean,
        default: false
      },

     desc: {
        type: Object,
        default() {
            return {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            }   
        }
    }
 
  },
  computed: {
    //   过滤器
        positives(){
            return this.rating.filter((rating) =>{
                return rating.rateType === POSTIVE;
            });
        },
        negatives(){
            return this.rating.filter((rating) =>{
                return rating.rateType === NEGATIVE;
            });
        }    
  },
    methods: {
        // 父子间通信，传递数据
        select(type) {
            this.selectType = type;
            this.$emit('ratingtype.select',type);
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$emit('content.toggle',this.onlyContent);
        }
    }
}

</script>

<style>

  
    .ratingType{
        padding: 18px 0;
        margin: 0 18px;
    }
    .block{
        display: inline-block;
        padding:8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: #fff;
        font-size: 12px;
        color: rgb(77,85,93);
    }
    .count{
        margin-left: 2px;
        font-size: 8px;
        line-height: 16px;
    }
    .positive{
       background: rgba(0,160,220,0.2);
       
    }
    .active_p{
        background: rgb(0,160,220);
        color:#fff;
    }
    
    .negative{
        background: rgba(77,85,93,0.2);
       
    }
     .active_n{
        background: rgb(77,85,93);
        color:#fff;
    }
    
    .switch{
        padding: 12px 18px 12px 0;
        line-height: 24px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        color: rgb(147,153,159);
        font-size: 0;
    }
    .on > .icon-check_circle{
        color: #00c850;
    }
    .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size:24px;
    }
    .rating-text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
    }

</style>