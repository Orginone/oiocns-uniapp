<template>
	<view class="baseLayout">
		<view class="title">应用</view>
         <view class="box">
              <view class="item" v-for="(item,index) in appList" :key="index">
                 <view class="item_icon">
                    <img :src="item.icon.shareLink" alt="" srcset="">
                 </view>
                 <view class="item_name">{{item.name}}</view>
              </view>
              <!-- <view class="item" @click="getMore()">
                     <view class="item_icon">
                    <view class="add">+</view>
                 </view>
                 <view class="item_name">更多应用</view>
              </view> -->
         </view>
	</view>
</template>

<script>
export default {
    name: "userApp",
    props:{
        appList:{
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
        };
    },
    methods: {
        getMore(){
            uni.navigateTo({ url: '/pages/shop/appList/appList' })
        }
    },
}
</script>

<style lang="scss" scoped>
	.title {
		padding-left: 8upx;
		font-size: 28upx;
		color: #000;
		margin-bottom: 4upx;
	}
    .box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 20%;
            margin-top: 26rpx;
            .item_icon{
                width: 108upx;
                height: 108upx;
                border-radius: 50%;
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                border: 1px solid #DCE1F2;
                img{
                    width: 78upx;
                    height: 78upx;
                }
                .add{
                    color: #DCE1F2;
                    font-size: 90upx;
                    line-height: 108upx;
                }
                
            }
            .item_name{
                font-size: 24upx;
                color: #606266;
                width: 100%;
                text-align: center;
                margin-top: 10upx;
            }
        }
    }
</style>