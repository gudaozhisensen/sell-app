<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart"><transition name="move"></transition><span class="inner icon-remove_circle_outline"></span></div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

    </div>
</template>


<script>
import Vue from 'vue';

export default {
    props: {
        food: {
            type:Object
        }
        
    },
    methods: {
        
        addCart() {
            // console.log("click");
            if (!this.food.count) {
                Vue.set(this.food,'count',1)
                // this.food.count = 1;
            }else{
                this.food.count++;
            }
        },
        decreaseCart(){
            this.food.count--; 
        }
    }
}
</script>

<style>
.cartcontrol{
    font-size: 0;
    }
.cartcontrol,.inner{
    padding: 0px !important;
}
.cart-decrease,.cart-count,.cart-add{
    display: inline-block;
    
}

.cart-decrease,.cart-add{
    padding: 0 5px;
   
}
.move-enter-active,.move-leave-active{
    /* transition: all 0.4s linear; */
    opacity: 0.5;
    /* transition: translate3D(0,0,0); */
}
.move-enter,.move-leave-active{
   opacity: 0;
}

.move-enter, .move-leave-to{
    opacity: 0;
    transform: translate3d(24px,0,0);
}
.cart-count{
    vertical-align: top;
    width: 12px;
    line-height: 24px;
    text-align:center;
    font-weight: 700;
    font-size: 13px;
    color: rgb(147, 153, 159);
}
.cart-add,.inner{
    color: rgb(0, 160, 220);
    font-size: 24px;
    line-height: 24px;
}
</style>
