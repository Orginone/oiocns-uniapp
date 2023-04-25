<template>
	<view class="baseLayout">
		<headbar :localList="'商店,开放市场,应用'"  :left="'none'" :url="'back'"></headbar>
		<view class="applist">
			<view class="listItem" v-for="item,index in listInfo" :key="index">
				<view class="img">
					<img src="../../../static/base/appIco.png" alt="">
					<view class="version">V.1.03</view>
				</view>
				<view class="subscribe">
					<view class="name">
						应用A
					</view>
					<view class="detail">
						应用描述应用描述应用描述应用描述应应用描述应用描述应用描述应用描述应用描述
					</view>
				</view>
				<view class="getArea">
					<view class="get" @tap="turnPage()" >
						获取
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[1,1,1,1,1,1]
			};
		},
		methods:{
			turnPage(){
				uni.navigateTo({
					url:'/pages/shop/appDetail/appDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout{
		background-color: #f2f4f9;
		.applist{
			padding: 20upx 24upx;
			.listItem{
				padding: 33upx;
				padding-bottom: 40upx;
				display: flex;
				background-color: #fff;
				margin-bottom: 17upx;
				border-radius: 14upx;
				.img{
					position: relative;
					img{
						height: 90upx;
						width: 90upx;
					}
					.version{
						position: absolute;
						bottom: -20%;
						left: 50%;
						transform: translateX(-50%);
						font-size: 17upx;
						color: #C0C4CC;
					}
				}
				.subscribe{
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					.name{
						font-size: 20upx;
						color: #303133;
					}
					.detail{
						margin-top: 6upx;
						font-size: 20upx;
						color: #606266;
						width: 440upx;
						line-height: 1.5;
					}
					
				}
				.getArea{
					flex: 1;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
				.get{
					font-size: 20upx;
					width: 66upx;
					height: 30upx;
					border-radius: 33upx;
					border: 1upx solid #154AD8;
					color: #154AD8;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				
			}
		}
	}

</style>
