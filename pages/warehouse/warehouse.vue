<template>
	<view>
		<view class="router">
			<view class="item" v-for="(item,index) in itemList" :key="index" @tap="turnPage(item)">
				跳转页面{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[1,2,3,4,5]
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
	.item{
		margin: 10upx auto;
		width: 100rpx;
		height: 100rpx;
		border: 2rpx solid #000;
	}
</style>
