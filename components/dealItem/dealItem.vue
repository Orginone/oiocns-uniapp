<template>
	<view class="BaseLayout">
		<view class="dealCard">
			<view class="left">
				<view class="top">
					<view class="title">{{itemInfo.title}}
						<view class="tag">{{itemInfo.type}}</view>
					</view>
					<view class="sub">{{itemInfo.sub}}</view>
				</view>
				<view class="remain">
					剩余时间：{{'14小时23分钟'}}
				</view>
			</view>
			<view class="right" v-if="btn">
				<view class="pass">通过</view>
				<view class="reject">退回</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "dealItem",
		props: {
			itemInfo: {
				default: () => {
					return {
						title: '这是一张审批单',
						sub: '资金审批，望通过',
						type: '单位审批',
					}
				}
			},
			btn:{
				default:true
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.BaseLayout {
		width: 694upx;
		margin-bottom: 40upx;

		.dealCard {
			width: 100%;
			height: 210upx;
			padding: 30upx 40upx;
			background-color: #ffffff;
			display: flex;
			justify-content: space-between;
			box-shadow: 0rpx 4rpx 8rpx 2rpx rgba(127, 127, 127, 0.16);
			border-radius: 14rpx 14rpx 14rpx 14rpx;
			border: 0rpx solid #B1B1B1;

			.top {
				display: flex;
				flex-direction: column;
			}

			.left {
				width: 70%;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					display: flex;
					font-size: 32upx;
					color: #303133;
					display: flex;
					align-items: center;

					.tag {
						font-size: 18upx;
						padding: 1upx 10upx 4upx 8upx;
						box-sizing: border-box;
						border-radius: 99upx;
						margin-left: 16upx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #3D5ED1;
						border: 1upx solid #3D5ED1;
						transform: translateY(2upx);
					}
				}

				.sub {
					margin-top: 10upx;
					color: #9A9A9A;
					font-size: 24upx;
				}

				.remain {
					color: #9A9A9A;
					font-size: 20upx;
				}
			}

			.right {
				width: 30%;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: space-between;

				.pass {
					width: 125upx;
					height: 56upx;
					border-radius: 28upx;
					background-color: #EDEFFC;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 25rpx;
					color: #3D5ED1;
				}

				.reject {
					width: 125upx;
					height: 56upx;
					border-radius: 28upx;
					background-color: #FFE0E1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 25rpx;
					color: #ED464B;
				}
			}
		}
	}
</style>