<template>
	<view>
		<view class="title" v-if="title">
			{{title}}
		</view>
		<view class="BasicForm">
			<view class="formItem" v-for="item,index in formData" :key="index">
				<view class="name">
					{{item.name}}
				</view>
				<view class="value">
					{{item.value}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "basicForm",
		props: {
			formData: {
				default: () => {
					return []
				}
			},
			title: ''
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		padding-left: 8upx;
		font-size: 32upx;
		color: #2F3033;
		margin-bottom: 16upx;
	}
	.BasicForm {
		width: 100%;
		padding: 33upx 22upx;
		background-color: #D9E3F5;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin: 20upx 0;
		border-radius: 16upx;

	

		.formItem {
			display: flex;
			height: 70upx;
			font-size: 20upx;
			color: #666666;
			border-bottom: 2upx solid #ebeef5;

			.name {
				height: 100%;
				padding-left: 22upx;
				display: flex;
				align-items: center;
				width: 210upx;
				background-color: #f5f6fc;
				border-right: 2upx solid #d9e3f5;
			}

			.value {
				height: 100%;
				padding-left: 22upx;
				flex: 1;
				background-color: #fff;
				display: flex;
				width: 100%;
				align-items: center;
			}
		}
	}
</style>