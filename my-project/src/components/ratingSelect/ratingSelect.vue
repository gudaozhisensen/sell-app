<template>
    <div class="ratingSelect">
        <div class="ratingType">
            <span>{{desc.all}}</span>
            <span>{{desc.positive}}</span>
            <span>{{desc.negative}}</span>
            <div class="switch">
                <span class="icon-check_circle"></span>
                <span class="rating-text">只看有内容的评价</span>
            </div>
        </div>
    </div>
</template>

<script>
//  const POSTIVE  = 0;
//  const NEGATIVE = 1;
 const ALL = 2;

export default {
  props: {
      rating: {
          type: Array,
          default() {
              return {};
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

  }
}

</script>