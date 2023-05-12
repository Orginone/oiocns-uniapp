<template>
	<view class="baseLayout">
		<!-- 卡片区域 -->
		<view class="itemCard">
			<view class="top">
				<!-- 基本信息 -->
				<view class="baseInfo">
					<view class="leftSide">
						<view class="ico"></view>
					</view>
					<view class="rightSide">
						<view class="name">
							{{baseInfo.name}}
							<view class="sub">（{{baseInfo.sub}}）</view>
						</view>
						<view class="account">
							<view class="textName">账户余额：</view>
							<view class="value">￥{{baseInfo.account||'125.30'}}</view>

						</view>
					</view>
				</view>
				<!-- 二维码 -->
				<view class="codeArea">
					<view class="img">
						<img src="@/static/basePlus/code.png" alt="">
					</view>
				</view>
			</view>
			<!-- 复制 -->
			<view class="bottom">
				<view class="text">{{randomCode}}</view>
				<view class="copy" @click="copy">复制</view>
			</view>
		</view>
		<!-- 按钮区 -->
		<view class="btnArea">
			<view class="trans" @click="turnTransfer()">转账</view>
			<view class="collect ">收款</view>
		</view>
		<!-- 交易记录 -->
		<view class="dealArea">
			<!-- 标题 -->
			<view class="title">
				<view class="blue"></view>
				<view class="text">交易记录</view>
			</view>
			<!-- 切换栏 -->
			<switchBar :menuList="['全部','收款','转账']" @change="change" mode="scale"></switchBar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseInfo: null,
				randomCode: '27bdhdah89239rbdhsda8hs'
			};
		},
		onLoad(option) {
			let data = JSON.parse(option.data)
			this.baseInfo = data
			console.log(data);
		},
		methods: {
			//跳转转账页面
			turnTransfer(){
				uni.navigateTo({
					url:'/pages/cardPage/transfer/transfer'
				})
			},
			// 切换菜单反馈
			change(e) {
				console.log(e);
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
		width: 100%;
		height: 100%;
		background-color: #f0f2f7;
		padding-top: 30upx;
		display: flex;
		flex-direction: column;

		.itemCard {
			margin: 0 auto;
			width: 92%;
			height: 250upx;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 30upx 40upx 20upx 40upx;
			border-radius: 10upx;

			.top {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.baseInfo {
					display: flex;
					align-items: center;
					transform: translateY(-10upx);

					.leftSide {
						.ico {
							width: 100upx;
							height: 100upx;
							background-color: #d9d9d9;
							border-radius: 50%;
						}
					}

					.rightSide {
						margin-left: 20upx;
						display: flex;
						height: 100upx;
						flex-direction: column;
						justify-content: space-around;

						.name {
							display: flex;
							font-size: 32upx;
							color: $main-font;
							font-weight: 700;

							.sub {
								font-size: 28upx;
								color: #808080;
								font-weight: 500;

							}
						}

					}

					.account {
						display: flex;
						align-items: center;
						font-size: 24upx;
						color: $main-blue;

						.value {
							letter-spacing: -0upx;
						}
					}
				}

				.codeArea {
					.img {
						width: 120upx;
						height: 120upx;

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
				}
			}

			.bottom {
				padding-left: 6upx;
				margin-top: 20upx;
				display: flex;
				color: #808080;
				font-size: 28upx;
				align-items: center;

				.copy {
					margin-left: 30upx;
					color: $main-blue;
					font-size: 24upx;
					width: 80upx;
					display: flex;
					justify-content: center;
					border-radius: 40upx;
					border: 2upx solid $main-blue;
				}
			}
		}

		.btnArea {
			margin: 0 auto;
			width: 92%;
			display: flex;
			justify-content: space-between;
			margin-top: 40upx;

			.trans,
			.collect {
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

			.collect {
				background: #3D5ED1;
				border: 2upx solid #2945c0;
			}
		}

		.dealArea {
			flex: 1;
			background-color: #fff;
			margin-top: 40upx;

			.title {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				font-size: 32upx;
				font-weight: 700;
				padding-left: 40upx;
				padding-top: 30upx;
				margin-bottom: 10upx;

				.blue {
					height: 40upx;
					width: 6upx;
					background-color: $main-blue;
					border-radius: 4upx;
				}

				.text {
					margin-left: 20upx;
				}

			}
		}
	}
</style>