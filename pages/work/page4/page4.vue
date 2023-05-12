<template>
	<view class="baseLayout">
		<headbar :localList="localList" right :left="'more'" :url="'/pages/work/work'" style="width: 100%;">
		</headbar>
		<view class="topArea">
			<view class="objName">
				资产处置
			</view>
			<switchBar @change="change"></switchBar>
		</view>

		<view class="select1" v-show="selectIndex==0">
			<!-- 基本信息 -->
			<view class="basicForm">
				<basicForm :formData="formData1"></basicForm>
			</view>
			<!-- 子表信息 -->
			<view class="subForm">
				<uni-table>
					<uni-tr>
						<uni-th v-for="item,index in formTitle" :key="index">{{item.name}}</uni-th>
					</uni-tr>
					<uni-tr v-for="item,index in formList" :key="index">
						<uni-td v-for="it,ind in Object.values(item)" :key="ind">{{it}}</uni-td>
					</uni-tr>
				</uni-table>
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
		methods:{
			change(e){
				this.selectIndex = e
			}
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