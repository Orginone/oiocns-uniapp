<template>
	<view class="baseLayout">
		<view class="title">常用</view>
        <scroll-view class="box" scroll-x="true"  >
		    <view class="item" v-for="(item,index) in linkList" :key="index">
                <view class="item_btn">+</view>
                <view class="item_name">{{item.name}}</view>
            </view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "linkBox",
		data() {
			return {
              linkList:[{name:'定标准'},{name:'加好友'},{name:'建群组'},{name:'加群组'},{name:'建单位'},{name:'加单位'},{name:'建应用'},{name:'逛商店'},]
			};
		}
	}
</script>

<style lang="scss" scope>
	.title {
		padding-left: 8upx;
		font-size: 28upx;
		color: #000;
		margin-bottom: 16upx;
	}
    .box{
        width: 100%;
        height: 100%;
        white-space: nowrap;
        .item{
            display: inline-block;
            width: 116upx;
            height: 136upx;
            border-radius: 16upx;
            background: #ddd;
            margin-right:20rpx ;
            .item_btn{
                font-size: 70upx;
                color: #000;
                text-align: center;
                margin-top: 0rpx;
                margin-bottom: 0rpx
            }
            .item_name{
                font-size: 22upx; 
                text-align: center;
                color: #000;
            }
        }
    }

</style>