<template>
	<view class="baseLayout">
		<view class="title">快捷入口</view>
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
              linkList:[{name:'加好友'},{name:'创单位'},{name:'邀成员'},{name:'建应用'},{name:'逛商店'},]
			};
		}
	}
</script>

<style lang="scss" scope>
	.title {
		padding-left: 8upx;
		font-size: 32upx;
		color: #2F3033;
		margin-bottom: 16upx;
	}
    .box{
        width: 100%;
        height: 100%;
        white-space: nowrap;
        .item{
            display: inline-block;
            width: 136upx;
            height: 136upx;
            border-radius: 16upx;
            background: #fff;
            margin-right:20rpx ;
            .item_btn{
                font-size: 70upx;
                color: #3D5ED1;
                text-align: center;
                margin-top: 0rpx;
                margin-bottom: 0rpx
            }
            .item_name{
                font-size: 22upx; 
                text-align: center;
                color: #3D5ED1;
            }
        }
    }

</style>