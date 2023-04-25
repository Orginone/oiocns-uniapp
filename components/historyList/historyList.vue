<template>
	<view class="BaseLayout">
		<view class="listArea">
			<view class="listItem" v-for="item,index in listForm" :key="index">
				<view class="top">
					<view class="state">{{'已通过'}}</view>
					<view class="name">{{'李虎'}}</view>
					<view class="phoneNumber">{{13675856666}}</view>
					<view class="node">审核节点:{{'科传办审批'}}</view>
				</view>
				<view class="bottom">
					<view class="feedback">审批意见:{{'同意'}}</view>
					<view class="date">{{'2022-09-07 15:01:02'}}</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "historyList",
		props: {
			listForm: {
				default: () => {
					return []
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
	.BaseLayout {
		.listArea {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-end;

			.listItem {
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 580upx;
				height: 140upx;
				background: #FFFFFF;
				padding: 20upx 25upx;
				box-shadow: 6rpx 6rpx 6rpx 0rpx rgba(211, 211, 211, 0.25);
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				opacity: 1;
				border: 1rpx solid #E7E7E7;
				margin-bottom: 38upx;

				.top {
					display: flex;
					font-size: 20upx;

					.state {
						color: #303133;
						margin-right: 20upx;
					}

					.name,
					.phoneNumber {
						color: #606266;
					}

					.node {
						flex: 1;
						display: flex;
						justify-content: flex-end;
						color: #606266;
					}

					&::before {
						position: absolute;
						content: '';
						z-index: 200;
						height: 18upx;
						width: 18upx;
						border-radius: 50%;
						border: 1upx solid #fff;
						background-color: #3D5ED1;
						left: -59upx;
						top: 0upx;
					}
					&::after {
						position: absolute;
						content: '';
						height: 23upx;
						width: 23upx;
						border-radius: 50%;
						border: 1upx solid #3D5ED1;
						background-color: #fff;
						left: -61rpx;
						top: -3rpx;
					}
				}

				.bottom {
					display: flex;
					font-size: 20upx;
					color: #606266;
					justify-content: space-between;
				}

				&::after {
					position: absolute;
					content: '';
					height: 178upx;
					width: 2upx;
					background-color: #154AD8;
					left: -50upx;
					top: 0;
				}
				&:last-child{
					&::after {
						content: '';
						height:0;
					}
				}

			}
		}
	}
</style>