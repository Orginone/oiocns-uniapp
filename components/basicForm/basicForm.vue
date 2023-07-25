<template>
	<view>
		<!-- <view class="title" v-if="title">
			{{title}}
		</view> -->
		<view class="BasicForm">
			<view class="formItem" v-for="item,key in formData" :key="key">
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
			padding: 10upx 0;
			display: flex;
			font-size: 26upx;
			color: #666666;
			border-bottom: 2upx solid #ebeef5;

			.name {
				height: 100%;
				padding-left: 22upx;
				display: flex;
				height: 100%;
				align-items: center;
				width: 210upx;
				
				border-right: 2upx solid #d9e3f5;
			}

			.value {
				height: 100%;
				padding-left: 22upx;
				flex: 1;
				display: flex;
				width: 100%;
				align-items: center;
			}
		}
	}
</style>