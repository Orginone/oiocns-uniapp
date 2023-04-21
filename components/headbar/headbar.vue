<template>
	<view>
		<view class="header">
			<!-- 返回 -->
			<view class="back" @tap="back()">
				<img src="../../static/base/back.png" alt="">
			</view>
			<!-- 文字内容 -->
			<view class="content">
				<view class="sub">
					{{first}}
				</view>
				<view class="append" v-for="item,index in localList" :key="index">
					<view class="dot">
						.
					</view>
					<view class="main">
						{{item}}
					</view>
				</view>
			</view>
			<!-- 右侧标签 -->
			<view class="right">
				<view class="search">
					<img src="../../static/base/search2.png" alt="">
				</view>
				<view class="add" v-if="localList.length>1">
					<img src="../../static/base/add.png" alt="">
				</view>
				<view class="dotPlus" v-if="localList.length>1">
					<img src="../../static/base/dotPlus.png" alt="">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'headbar',
		props: {
			first: {
				default: '协作'
			},
			localList: {
				default: []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		display: flex;
		padding: 20upx 10upx;
		box-sizing: border-box;
		align-items: center;

		.back {
			padding-left: 10upx;

			img {
				height: 40upx;
				width: 24upx;
			}

			transform: translateY(5upx);

		}

		.content {
			display: flex;
			margin-left: 20upx;
			color: #9A9A9A;
			font-size: 26upx;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			.dot {
				margin: 0 10upx;
				transform: translateY(-20upx) scale(2);

			}
			.append{
				display: flex;
				&:last-child{
					.main{
						color: #3d5ed1;
					}
				}
			}
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			padding-right: 20upx;

			img {
				height: 40upx;
				width: 40upx;
				margin: 0 15upx;
			}
			.search{
				transform: translateY(2upx);
			}

		}
	}
</style>