<template>
	<view>
		<view class="switchBar">
			<view :class="selectIndex==0?'active':'item'" @click="selectIndex = 0">基本信息</view>
			<view :class="selectIndex==1?'active':'item'" @click="selectIndex = 1">历史痕迹</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"switchBar",
		data() {
			return {
				selectIndex:0
			};
		},
		watch:{
			selectIndex(){
				this.$emit('change',this.selectIndex)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.switchBar {
		padding: 14upx 0upx;
		font-size: 32upx;
		display: flex;
		margin-bottom: 20upx;
		padding-left: 10upx;
	
		.item {
			margin-right: 40upx;
			line-height: 1.6;
			color: #6F6F6F;
			border-bottom: 4upx solid transparent;
		}
	
		.active {
			margin-right: 40upx;
			line-height: 1.6;
			color: #2F3033;
			border-bottom: 4upx solid #3d5ed1;
		}
	}
</style>