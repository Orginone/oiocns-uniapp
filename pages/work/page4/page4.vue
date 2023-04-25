<template>
	<view class="baseLayout">
		<headbar :localList="localList" right :left="'more'" :url="'/pages/work/work'" style="width: 100%;">
		</headbar>
		<view class="topArea">
			<view class="objName">
				资产处置
			</view>
			<view class="switchBar">
				<view :class="selectIndex==0?'active':'item'" @click="selectIndex = 0">基本信息</view>
				<view :class="selectIndex==1?'active':'item'" @click="selectIndex = 1">历史痕迹</view>
			</view>
		</view>

		<view class="select1" v-show="selectIndex==0">
			<!-- 基本信息 -->
			<view class="basicForm">
				<basicForm :formData="formData1"></basicForm>
			</view>
			<!-- 子表信息 -->
			<view class="subForm">
				<subForm></subForm>
			</view>
			<!-- 意见填写 -->
			<view class="comment">
				<view class="text">
					<view class="title">意见填写</view>
					<view class="sub">常用意见</view>
				</view>
				<view class="content">
					<textarea ></textarea>
				</view>
			</view>
			<view class="submit">
				<view class="confirm">验证</view>
				<view class="save">存证</view>
			</view>

		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList: '办事,已完结,详情',
				selectIndex: 0, //切换栏标识
				formData1: [{
						name: '单据编号',
						value: '12345679'
					},
					{
						name: '处置方式',
						value: '错账更正'
					},
					{
						name: '数量',
						value: '23'
					},
					{
						name: '资产总值',
						value: '300.00'
					},
					{
						name: '申请原因',
						value: '无'
					}
				],
			};
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout {
		padding-bottom: 40upx;
		background-color: #f2f4f9;

		.topArea {
			padding: 0 22upx;

		}

	}

	.objName {
		background-color: #fff;
		display: flex;
		justify-content: center;
		height: 80upx;
		align-items: center;
		margin-top: 10upx;
		border-top: 2upx solid #e7e7e7;
		border-bottom: 2upx solid #e7e7e7;

	}

	.switchBar {
		padding: 14upx 0upx;
		font-size: 32upx;
		display: flex;
		margin-bottom: 20upx;
		padding-left: 10upx;

		.item {
			margin-right: 40upx;
			line-height: 1.6;
			color: #6F6F6F;
			border-bottom: 4upx solid transparent;
		}

		.active {
			margin-right: 40upx;
			line-height: 1.6;
			color: #2F3033;
			border-bottom: 4upx solid #3d5ed1;
		}
	}

	.select1{
		.basicForm{
			padding: 0 22upx;
		}
		
		.comment{
			margin-top: 20upx;
			width: 100%;
			height: 310upx;
			background-color: #fff;
			.text{
				padding-top: 22upx;
				padding-left: 26upx;
				padding-bottom: 25upx;
				font-size: 28upx;
				color: #000;
				display: flex;
				.title{
					margin-right: 34upx;
				}
			}
			.content{
				padding: 0 44upx;
				textarea{
					padding:10upx 16upx;
					box-sizing: border-box;
					width: 100%;
					height: 190upx;
					background-color: #fbfbfb;
					border-radius: 7rpx 7rpx 7rpx 7rpx;
					opacity: 1;
					border: 1rpx solid #9A9A9A;
				}
			}
		}
		
		.submit{
			margin-top: 40upx;
			display: flex;
			padding: 0 70upx;
			justify-content: space-around;
			font-size: 30upx;
			color: #fff;
			.confirm,.save{
				background: #FB8F11;
				border-radius: 69upx;
				height: 61upx;
				width: 171upx;
				display: flex;
				justify-content: center;
				align-items: center;
				
			}
			.save{
				background-color: #3D5ED1;
			}
		}
	
	}
</style>