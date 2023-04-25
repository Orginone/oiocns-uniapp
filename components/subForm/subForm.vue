<template>
	<view class="subForm">
		<view class="subCard">
			<view class="top">
				<view class="title">子表信息</view>
				<view class="ico">
					<img src="../../static/base/dotPlus.png" alt="">
				</view>
			</view>
			<view class="bottom">
				<view class="lineTitle">
					<view class="line">
						<view class="item">资产名称</view>
						<view class="item">资产分类</view>
						<view class="item">数量</view>
						<view class="item">金额</view>
						<view class="item">来源</view>
					</view>
				</view>
				<view class="lineContent">
					<view class="line" v-for="item,index in subInfo" :key="index">
						<view class="item">{{item.name}}</view>
						<view class="item">{{item.type}}</view>
						<view class="item">{{item.count}}</view>
						<view class="item">{{item.amount}}</view>
						<view class="item">{{item.sourse}}</view>
					</view>
				</view>
			</view>
			<view class="more">更多</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"subForm",
		props:{
			subInfo:{
				default:()=>{
					return[
						{
							name:'办公用房',
							type:'房产',
							count:3,
							amount:100,
							sourse:100
						},
						{
							name:'办公用房',
							type:'房产',
							count:3,
							amount:100,
							sourse:100
						},
						{
							name:'办公用房',
							type:'房产',
							count:3,
							amount:100,
							sourse:100
						}
					]
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.subForm{
		width: 100%;
		.subCard{
			background-color: #fff;
		
			.top{
				display: flex;
				justify-content: space-between;
				padding-top: 23upx;
				padding-bottom: 16upx;
				padding-left: 25upx;
				box-sizing: border-box;
				.title{
					font-size: 28upx;
					color: #2F3033;
				}
				.ico{
					padding-right: 42upx;
					img{
						width: 6upx;
						height: 36upx;
					}
				}
			}
			.bottom{
				overflow-x: auto;
				.lineTitle{
					display: flex;
					background-color: #F5F6FC;
					font-size: 25upx;
					color: #606266;
					.line{
						width: 100%;
						display: flex;
						align-items: center;
						.item{
							width: 20%;
							padding: 13upx 28upx;
							padding-right: 0;
							display: flex;
							white-space: nowrap;
							align-items: center;
							border-right: 1upx solid #D4D4D4;
							&:last-child{
								border-right: 1upx solid transparent;
							}
						}
					}
				}
				.lineContent{
					display: flex;
					font-size: 25upx;
					color: #9A9A9A;
					flex-direction: column;
					
					.line{
						width: 100%;
						display: flex;
						align-items: center;
						.item{
							width: 20%;
							padding: 22upx 32upx;
							padding-right: 0;
							display: flex;
							align-items: center;
							white-space: nowrap;
							border-right: 1upx solid #D4D4D4;
							&:last-child{
								border-right: 1upx solid transparent;
							}
						}
						&:nth-child(2n+1){
							background-color: #fff;
						}
						&:nth-child(2n){
							background-color: #F5F6FC;
						}
						
					}
				}
				
			}
			.more{
				padding-top: 14upx;
				padding-bottom: 26upx;
				background-color: #fff;
				padding-right: 42upx;
				width: 100%;
				font-size: 17upx;
				color: #000000;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>