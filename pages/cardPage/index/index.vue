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
					<img src="@/static/basePlus/add.png" alt="" @click="showpop=true">
				</view>
			</view>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<view class="create" @click="turnCreate">创建</view>
			<view class="add" @click="turnSearch">添加</view>
		</view>
		<!-- 列表区 -->
		<view class="listArea">
			<view class="listItem" v-for="item,index in lists" :key="index" @click="turnDetail(item)">
				<view class="ico"></view>
				<view class="name">{{item.name}}</view>
				<view class="sub">（{{item.sub}}）</view>
				<view class="count">￥{{'125.30'}}</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup v-model="showpop" mode="bottom" border-radius="34">
			<view class="popArea">
				<view class="text">收款</view>
				<view class="code">
					<img src="@/static/basePlus/code.png" alt="">
				</view>
				<view class="sub">
					扫描地址以接收付款
				</view>
				<view class="copyArea">
					<view class="copyText">
						{{randomCode}}
					</view>
					<view class="copyIco" @click="copy">复制</view>
				</view>
				<view class="btn">
					请求付款
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showpop: false,
				randomCode: '1s32d1a5d1asd5asd13a5sd',
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
		},
		methods: {
			// 跳转详情页
			turnDetail(item) {
				uni.navigateTo({
					url: '/pages/cardPage/itemDetail/itemDetail?data=' + JSON.stringify(item)
				})
			},
			// 跳转搜索页
			turnSearch() {
				uni.navigateTo({
					url: '/pages/cardPage/search/search'
				})
			},
			// 跳转搜索页
			turnCreate() {
				uni.navigateTo({
					url: '/pages/cardPage/create/create'
				})
			},
			//复制
			copy() {
				uni.setClipboardData({
					data: String(this.randomCode), // 必须字符串
					success: function() {
						console.log('success');
					}
				});
			}
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

			.listItem {
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

				.ico {
					width: 80upx;
					height: 80upx;
					background-color: #d9d9d9;
					border-radius: 50%;
				}

				.name {
					margin-left: 24upx;
					font-size: 36upx;
					color: $main-font;
				}

				.sub {
					color: #808080;
				}

				.count {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					font-size: 32upx;
					color: $main-font;
				}
			}

		}

		.popArea {
			padding: 40upx 70upx;
			border-radius: 10upx;
			height: 55%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.text {
				color: $main-font;
				font-size: 28upx;
			}

			.code {
				margin-top: 30upx;

				img {
					width: 300upx;
					height: 300upx;
				}
			}

			.sub {
				margin-top: 20upx;
				font-size: 24upx;
				color: #808080;
			}

			.copyArea {
				margin-top: 40upx;
				height: 70upx;
				padding: 0 30upx;
				border-radius: 35upx;
				align-items: center;
				background-color: #f6f7ff;
				font-size: 24upx;
				color: #808080;
				display: flex;

				.copyIco {
					margin-left: 20upx;
					display: flex;
					align-items: center;
					height: 40upx;
					border-radius: 20upx;
					padding: 4upx 10upx;
					border: 2upx solid $main-blue;
					color: $main-blue;

				}
			}

			.btn {
				margin-top: 80upx;
				width: 470upx;
				height: 90upx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
				background: $main-blue;
				border-radius: 50upx;
				margin-bottom: 50upx;
			}
		}
	}
</style>