<template>
	<view class="baseLayout">
		<view class="text">
			<view class="main">
				{{mode[index].main}}
			</view>
			<view class="sub">
				{{mode[index].sub}}
			</view>
		</view>
		<view class="imgArea">
			<view class="ico">
				<img :src="mode[index].url" alt="">
			</view>
			<view class="iconText">{{mode[index].iconText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:2,//当前模式下标
				mode:[
					{
						main:'物以类聚 人以群分',
						sub:'Orginone',
						url:require('static/basePlus/logo1.png'),
						iconText:'资产共享云'
						
					},
					{
						main:'有机仓储 无限公益',
						sub:'Gongyicang',
						url:require('static/basePlus/logo2.png'),
						iconText:'公益仓'
						
					},
					{
						main:'守正创新 激发活力',
						sub:'Data governance experimental platform',
						url:require('static/basePlus/logo2.png'),
						iconText:'数据治理实验平台'
						
					},
					{
						main:'共建共享 物尽其用',
						sub:'Assetcloud',
						url:require('static/basePlus/logo2.png'),
						iconText:'资产共享云'
						
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout{
		width: 100%;
		height: 100%;
		position: relative;
		.text{
			width: 100%;
			position: absolute;
			top: 25%;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			color: $main-blue;
			.main,.sub{
				font-size: 72upx;
				width: 100%;
				display: flex;
				justify-content: center;
			}
			.sub{
				margin-top: 20upx;
				font-size: 28upx;
			}
		}
		.imgArea{
			width: 100%;
			position: absolute;
			bottom: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			.ico{
				width: 54upx;
				height: 54upx;
				img{
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
			.iconText{
				margin-left: 20upx;
				font-size: 32upx;
				color: $main-font;
				letter-spacing: 2upx;
			}
		}
	}
</style>
