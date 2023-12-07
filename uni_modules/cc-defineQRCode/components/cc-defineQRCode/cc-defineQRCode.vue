<template>
	<view class="content">

		<view class="canvas">
			<!-- 二维码插件 width height设置宽高 -->
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
		</view>

		<text class="list-text">{{ '预约号码:' + ' ' + myFormatData.yyh}}
		</text>

		<text class="list-text"> {{ '预约窗口:' + '  ' + myFormatData.bsdmc}}
		</text>

		<text class="list-text"> {{ '业务类型:' + '  ' + myFormatData.Yylxmc}}
		</text>

		<text class="list-text"> {{ '预约日期:' + '  ' + myFormatData.yyrq}}
		</text>


	</view>
</template>

<script>
	import Vue from 'vue';
	import uQRCode from './common/uqrcode.js'



	export default {
		data() {
			return {
				// 二维码标识串
				qrcodeText: 'eoruw20230528',
				// 二维码尺寸
				qrcodeSize: 136,

				// 最终生成的二维码图片
				qrcodeSrc: '',


				myFormatData: {
					'yyh': 'eoruw20230528',
					'bsdmc': '窗口1',
					'Yylxmc': '租金缴纳',
					'yyrq': '预约日期'
				},
			}
		},
		onLoad(e) {

			this.make();
		},
		methods: {

			make() {
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})

				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
						this.qrcodeSrc = res
						console.log('qrcodeSrc = ' + this.qrcodeSrc);
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},


		}
	}
</script>

<style lang="scss" >
	page {
		background-color: #FFFFFF;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: var(--status-bar-height);
	}


	.text {
		display: flex;
		justify-content: center;
		margin-top: 46rpx;
		margin-bottom: 6rpx;
		font-size: 36rpx;
		height: 44rpx;
		color: #333333;
	}

	.canvas {
		margin-top: 50rpx;
		margin-bottom: 36rpx;
		text-align: center;
	}


	.list-text {
		display: flex;
		justify-content: center;
		width: 100%;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #666666;
	}

	.button {
		width: 88%;
		margin-top: 52rpx;

	}
</style>