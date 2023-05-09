<template>
	<view class="baseLayout">
		<!-- 用户卡片 -->
		<view class="userCard">
			<!-- 上方区域 -->
			<view class="top">
				<!-- 头像 -->
				<view class="img">
					<img src="@/static/basePlus/user.png" alt="">
				</view>
				<!-- 昵称 -->
				<view class="name">黑暗皇子</view>
				<!-- 更多 -->
				<view class="more">
					<img src="@/static/basePlus/more.png" alt="">
				</view>
			</view>
			<!-- 下方区域 -->
			<view class="bottom">
				<view class="balance">
					账户余额：￥{{'125.30'}}
				</view>
				<view class="add">
					<img src="@/static/basePlus/add.png" alt="">
				</view>
			</view>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<view class="create">创建</view>
			<view class="add">添加</view>
		</view>
		<!-- 列表区 -->
		<view class="listArea">
			<view class="listItem" v-for="item,index in lists" :key="index">
				<view class="ico"></view>
				<view class="name">{{item.name}}</view>
				<view class="sub">（{{item.sub}}）</view>
				<view class="count">￥{{'125.30'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{
						name: 'AS',
						sub: '资产链'
					},
					{
						name: 'ETH',
						sub: '以太坊'
					},
					{
						name: 'BTC',
						sub: '比特币'
					},
					{
						name: 'ETH',
						sub: '以太坊'
					}, {
						name: 'BTC',
						sub: '比特币'
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout {
		padding: 20upx;
		height: 100%;
		width: 100%;
		background-color: #f0f2f7;

		.userCard {
			width: 100%;
			height: 250upx;
			padding: 28upx;
			border-radius: 12upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: radial-gradient(102.24% 453.37% at 4.96% 0%, #2A55EA 0%, #1D40BD 35.24%, #112F98 100%);

			.top {
				display: flex;
				align-items: center;

				.img {
					width: 100upx;
					height: 100upx;

					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						object-fit: cover;
					}
				}

				.name {
					margin-left: 30upx;
					font-size: 32upx;
					color: #fff;
				}

				.more {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					padding-right: 10upx;

					img {
						width: 50upx;
						height: 10upx;
					}
				}
			}

			.bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-right: 10upx;

				.balance {
					color: #88A3FF;
					font-size: 28upx;
				}

				.add {
					width: 52upx;
					height: 52upx;

					img {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}
				}
			}
		}

		.btnArea {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-top: 40upx;

			.create,
			.add {
				width: 48%;
				height: 100upx;
				background: #FB8F11;
				border: 2upx solid #C07113;
				border-radius: 51px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32upx;
				color: #fff;
			}

			.add {
				background: #3D5ED1;
				border: 2upx solid #2945c0;
			}
		}

		.listArea {
			margin-top: 40upx;
			.listItem{
				width: 100%;
				height: 150upx;
				background: #FFFFFF;
				box-shadow: 0px 4upx 4upx rgba(138, 138, 138, 0.12);
				border-radius: 8upx;
				margin-bottom: 24upx;
				box-sizing: border-box;
				padding: 30upx;
				display: flex;
				align-items: center;
				.ico{
					width: 80upx;
					height: 80upx;
					background-color: #d9d9d9;
					border-radius: 50%;
				}
				.name{
					margin-left: 24upx;
					font-size: 36upx;
					color: $main-font;
				}
				.sub{
					color: #808080;
				}
				.count{
					flex:1;
					display: flex;
					justify-content: flex-end;
					font-size: 32upx;
					color: $main-font;
				}
			}
			
		}
	}
</style>