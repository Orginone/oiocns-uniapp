<template>
	<view class="BaseLayout">
		<!-- 标题 -->
		<view class="title">{{title}}</view>
		<!-- 表单区域 -->
		<view class="formArea">
			<view class="item" v-for="(item,index) in datalist" :key="index">
				<view class="name">{{item.name}}</view>
				<view class="value">{{item.value}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"sideForm",
		props:{
			datalist:{
				default:()=>{
					return []
				}
			},
			title:{
				default:''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.BaseLayout{
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		.title{
			width: 100%;
			height: 70upx;
			display: flex;
			font-size: 28upx;
			align-items: center;
			color: #000000;
			padding: 0 8upx;
			box-sizing: border-box;
		}
		.formArea{
			width: 100%;
			display: flex;
			flex-direction: column;
			padding-bottom: 30upx;
			box-sizing: border-box;
			.item{
				width: 100%;
				height: 70upx;
				padding: 0 10upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 25upx;
				border-bottom: 1.5upx solid #D4D4D4;
				.right{
					color: #9A9A9A;
				}
				
			}
		}
	}
</style>