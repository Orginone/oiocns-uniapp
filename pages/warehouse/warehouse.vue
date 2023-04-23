<template>
	<view>
		<view class="router" v-show="0">
			<view class="items" v-for="(item,index) in itemList" :key="index" @tap="turnPage(item)">
				跳转页面{{item}}
			</view>
		</view>
		<headbar :localList="localList" :first="'仓库'" :color="false" :left="'more'" :url="url"></headbar>
		<view class="topArea">
			<view class="item" v-for="item,index in topList" :key="index">
				<view class="img">
					<img src="../../static/base/topIcon.png" alt="">
				</view>
				<view class="text">{{item}}</view>
			</view>
			<view class="bottomLine"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[1,2,3,4,5],
				localList:['最近打开'],
				topList:['商业监管','资产处置','通用报表','公物仓','公益仓'],
				url:'/pages/warehouse/menu/menu'
			};
		},
		methods:{
			turnPage(item){
				
				let url = '/pages/warehouse/page'+item+'/page'+item
				console.log(url);
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.items{
		margin: 10upx auto;
		width: 100rpx;
		height: 100rpx;
		border: 2rpx solid #000;
	}
	.topArea{
		display: flex;
		justify-content: space-around;
		padding-top: 20upx;
		position: relative;
		.item{
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			margin-bottom: 30upx;
			.img{
				height: 80upx;
				width: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background-color: #edeffc;
				img{
					width: 70%;
					height: 70%;
				}
			}
		
			.text{
				margin-top: 10upx;
			}
		}
		
		.bottomLine{
			position: absolute;
			bottom: 0;
			width: 93%;
			background-color: #edeffc;
			height: 4upx;
		}
		
	
	}
</style>
