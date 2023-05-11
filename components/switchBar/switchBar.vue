<template>
	<view>
		<view :class="mode =='scale'?'switchBar scale':'switchBar'">
			<view :class="selectIndex==index?'active item':'item'" @click="selectIndex = index" v-for="item,index in menuList" :key="index">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"switchBar",
		props:{
			menuList:{
				default:()=> ['基本信息','历史痕迹']
			},
			mode:{
				default:''
			}
		},
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
			color: #2F3033;
			border-bottom: 4upx solid #3d5ed1;
		}
	}
	
	.scale{
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-left: 0;
		.item{
			width: 33.3%;
			display: flex;
			line-height: 2;
			margin-right: 0;
			justify-content: center;
			padding-bottom: 10upx;
		}
		.active {
			color: #2F3033;
			border-bottom: 4upx solid #3d5ed1;
			color:  #3d5ed1;
		}
	}
</style>