<template>
	<view class="baseLayout">
		<view class="title">20款大家都在用</view>
         <view class="applist">
			<view class="listItem" v-for="item,index in appList" :key="index">
				<view class="img">
					<img src="@/static/base/appIco.png" alt="">
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
		name: "userApp",
		data() {
			return {
              appList:[{name:'资产监管平台'},{name:'资产监管平台'},{name:'资产监管平台'},{name:'资产监管平台'},{name:'资产监管平台'},{name:'资产监管平台'},]
			};
		}
	}
</script>

<style lang="scss" scope>
	.title {
		padding-left: 8upx;
		font-size: 32upx;
		color: #2F3033;
		margin-bottom: 4upx;
	}
    .applist{
            box-sizing: border-box;
			padding: 20upx 24upx;
			.listItem{
				padding: 33upx;
				padding-bottom: 40upx;
				display: flex;
				background-color: #fff;
				margin-bottom: 17upx;
				border-radius: 14upx;
                justify-content: space-between;
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
                    width: 70%;
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
						width: 100%;
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
</style>