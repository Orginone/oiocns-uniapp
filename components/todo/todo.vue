<template>
	<view class="baseLayout">
		<view class="box">
            <view class="item" v-for="(item,index) in todoList" :key="index" @click="goto(index)" :class="index==active?'activeItem':''">
                <view class="name">
                    {{item.name}}
                    <view class="line"></view>
                </view>
                <view class="number">
                    {{item.number}}
                </view>
            </view>
        </view>
        <view class="more">
            <view class="point"></view>
            <view class="point"></view>
            <view class="point"></view>
        </view>
	</view>
</template>

<script>
export default {
    name: "todo",
    props:{
        todoList:{
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            active:0
        };
    },
    methods: {
        goto(index){
            this.active = index
        }  
    },
}
</script>

<style lang="scss" scope>
.baseLayout{
    display: flex;
    padding: 20upx 0;
    box-sizing: border-box;
    background: #fff;
    border-radius:22upx ;
    .box{
        width: 100%;
        display: flex;
    }
    .activeItem{
        .name{
            color:#707175 !important;

        }
        .number{
            color: #3D5ED1 !important;
        }
        .line{
            width: 18px;
height: 4upx;
background: #707175;
margin: 0 auto;
        }
    }
    .item{
        width: 24%;
        .name{
            font-size: 14px;
            color: #9A9A9A;
            text-align: center;
        }
        .number{
          font-size: 88upx;
          font-weight: bold;
          color: #ccc;
          text-align: center;
        }
    }
    .more{
        padding-right: 40upx;
        .point{
            width: 4upx;
            height: 4upx;
            background: #A6A6A9;
            border-radius: 50%;
            margin-bottom: 6upx;
        }
    }
}
    
</style>