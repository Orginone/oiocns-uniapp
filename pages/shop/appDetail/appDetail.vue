<template>
	<view class="baseLayout">
		<headbar :localList="'商店,开放市场,应用A'" :left="'none'" :url="'back'"></headbar>
		<view class="basicInfo">
			<view class="img">
				<img src="../../../static/base/appIco.png" alt="">
			</view>
			<view class="subscribe">
				<view class="title">应用A</view>
				<view class="detail">应用描述应用描述应用描述应用描述应应用描述</view>
			</view>
		</view>
		<view class="subArea">
			<view class="sub">评价</view>
			<view class="sub">介绍</view>
			<view class="sub">版本</view>
		</view>
		<view class="bottom">
			<view class="store">商店</view>
			<view class="like">收藏</view>
			<view class="service">客服</view>
			<view class="func">
				<view class="add">
					加入购物车
				</view>
				<view class="get">
					获取
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scope>
	.baseLayout {
		padding-top: 40upx;

		.basicInfo {
			width: 100%;
			padding: 20upx 60upx;
			height: 140upx;
			display: flex;
			align-items: center;
			.img {
				img{
					width: 140upx;
					height: 140upx;
				}
			}
			
			.subscribe{
				height: 100%;
				padding: 8upx 0;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 45upx;
				.title{
					font-size: 28upx;
					color: #303133;
				}
				.detail{
					width: 340upx;
					font-size: 28upx;
					color: #606266;
				}
			}
		}
		
		.subArea{
			margin-top: 80upx;
			width: 100%;
			height: 60vh;
			display: flex;
			justify-content: space-between;
			padding: 0 90upx;
			box-sizing: border-box;
			font-size: 28upx;
			color: #606266;
		}
		
		.bottom{
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			padding: 38upx 45upx;
			padding-right: 10upx;
			box-sizing: border-box;
			align-items: center;
			.store,.like,.service{
				height: 68upx;
				width: 68upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #D8EAFF;
				border-radius: 50%;
				font-size: 20upx;
				color: #000000;
				margin-right: 18upx;
			}
			.func{
				flex:1;
				display: flex;
				justify-content: flex-end;
				color: #fff;
				font-size: 25rpx;
				.add{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 208rpx;
					height: 79rpx;
					background: #FB8F11;
					border-radius: 69rpx 0rpx 0rpx 69rpx;
					opacity: 1;
				}
				.get{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 208rpx;
					height: 79rpx;
					background: #3D5ED1;
					border-radius:  0rpx 69rpx 69rpx 0rpx;
					opacity: 1;
				}
			}
		}
	
	}
</style>