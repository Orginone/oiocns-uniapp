<template>
	<view class="baseLayout">
		<headbar right :left="'more'" :url="'/pages/work/work'" last basic="办事">
		</headbar>
		<view class="main">
			<view class="topArea">
				<switchBar @change="change"></switchBar>
			</view>
			<view class="select1" v-show="selectIndex==0">
				<!-- 基本信息 -->
				<view class="basicForm">
					<basicForm :formData="formData1"></basicForm>
				</view>
				<!-- 子表信息 -->
				<view class="subForm">
					<view class="head">
						<view class="title">子表信息</view>
						<view class="ico">
							<img src="@/static/base/dotPlus.png" alt="">
						</view>
					</view>
					
					<view class="table">
						<view class="tr">
							<view class="th" v-for="item,index in tableName" :key="index">{{item}}</view>
						</view>
						<view class="tr" v-for="item,index in tableInfo" :key="index">
							<view class="td" v-for="it,ind in Object.keys(item)" :key="ind">{{item[it]}}</view>
						</view>
					</view>
				</view>
				<!-- 意见填写 -->
				<view class="comment">
					<view class="text">
						<view class="title">意见填写</view>
						<view class="sub">常用意见</view>
					</view>
					<view class="content">
						<textarea></textarea>
					</view>
				</view>
				<!-- 提交表单 -->
				<view class="submit">
					<view class="confirm">验证</view>
					<view class="save">存证</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 0, //切换栏标识
				tableName: ['资产名称', '资产分类', '数量', '金额', '来源'],
				tableInfo: [{
						name: '办公用房',
						type: '房产',
						count: 3,
						amount: 100,
						from: 100
					},
					{
						name: '办公用房',
						type: '房产',
						count: 3,
						amount: 100,
						from: 100
					},
					{
						name: '办公用ssssssssss房',
						type: '房产',
						count: 3,
						amount: 100,
						from: 100
					},
					{
						name: '办公用房',
						type: '房产',
						count: 3,
						amount: 100,
						from: 100
					}

				],
				formTitle: [{
						name: '账号',
						value: 'account'
					},
					{
						name: '昵称',
						value: 'username'
					},
					{
						name: '姓名',
						value: 'name'
					},
					{
						name: '手机号',
						value: 'phone'
					},
					{
						name: '签名',
						value: 'sign'
					},
				],
				formList: [{
						account: 'abc',
						username: 'winnie',
						name: '张三',
						phone: '13312358856',
						sign: '一个人哭，真爱无敌'
					},
					{
						account: 'abssssssssc',
						username: 'winnssssssssie',
						name: '张三',
						phone: '133ssssssssss12358856',
						sign: '真爱无敌'
					}
				],
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
		},
		methods: {
			change(e) {
				this.selectIndex = e
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout {
		width: 100%;
		background-color: #f2f4f9;
	}

	.main {
		.topArea {

			padding: 0 22upx;
			padding-top: 20upx;

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

	.select1 {
		.basicForm {
			padding: 0 22upx;
		}

		.subForm {
			background-color: #fff;
			padding-bottom: 40upx;
			overflow-x: auto;
			.head{
				display: flex;
				justify-content: space-between;
				padding: 18upx ;
				.ico{
					margin-right: 20upx;
					img{
						width: 10upx;
						height: 42upx;
					}
				}
			}
			.title {
				width: 100%;
				display: flex;
				font-weight: 700;
				font-size: 30upx;
				background-color: #fff;
			}

			.table {
				width: 100%;
				border-spacing: 0upx;
				.tr{
					width: 100%;
					display: flex;
				}
				.th,.td {
					
					width: 20%;
					color: #9A9A9A;
					font-size: 28upx;
					padding: 12upx 18upx;
					background-color: #fff;
					text-align: center;
					border-right: 2upx solid #D4D4D4;
				}

				.th {
					font-weight: 28upx;
					color: #606266;
				}
				.td,.th{
					&:last-child{
						border-right:none;
					}
				}

				.tr {
					width: 100%;
					margin: 0 auto;
					&:nth-child(2n) {
						.th,.td {
							background-color: #f5f6fc;
						}
					}
				}
			}
		}

		.comment {
			margin-top: 20upx;
			width: 100%;
			height: 310upx;
			background-color: #fff;

			.text {
				padding-top: 22upx;
				padding-left: 26upx;
				padding-bottom: 25upx;
				font-size: 28upx;
				color: #000;
				display: flex;

				.title {
					margin-right: 34upx;
				}
			}

			.content {
				padding: 0 44upx;

				textarea {
					padding: 10upx 16upx;
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

		.submit {
			display: flex;
			padding: 40upx 70upx;
			justify-content: space-around;
			font-size: 30upx;
			color: #fff;

			.confirm,
			.save {
				background: #FB8F11;
				border-radius: 69upx;
				height: 61upx;
				width: 171upx;
				display: flex;
				justify-content: center;
				align-items: center;

			}

			.save {
				background-color: #3D5ED1;
			}
		}

	}
</style>