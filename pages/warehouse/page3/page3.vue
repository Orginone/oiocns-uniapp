<template>
	<view class="baseLayout">
		<headbar :localList="localList" color last></headbar>
		<view class="main">
			<view class="objName">
				物品名称
			</view>
			<switchBar @change="change"></switchBar>
			<view class="select1" v-show="selectIndex==0">
				<basicForm :formData="formData1"></basicForm>
				<basicForm :formData="formData2" :title="'财务信息'"></basicForm>
			</view>
			<view class="select2" v-show="selectIndex==1">
				<historyList :listForm="listForm"></historyList>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList: '', //路由信息
				selectIndex: 0, //当前切换栏下标
				formData1: [{
						name: '名称',
						value: '关系管理'
					},
					{
						name: '规格',
						value: '奥集能平台'
					},
					{
						name: '型号',
						value: '123456789'
					},
					{
						name: '创建人',
						value: '张三'
					},
					{
						name: '创建时间',
						value: '2022.11.11'
					},
					{
						name: '备注',
						value: '111'
					}
				],
				formData2: [{
						name: '账面原值',
						value: '关系管理'
					},
					{
						name: '累计折旧',
						value: '奥集能平台'
					},
					{
						name: '资金来源',
						value: '123456789'
					},
					{
						name: '创建人',
						value: '张三'
					},
					{
						name: '创建时间',
						value: '2022.11.11'
					},
					{
						name: '备注',
						value: '111'
					}
				],
				listForm:['1','2','3']
			}
		},
		onLoad(options) {
			let data = JSON.parse(options.data);
			this.localList = data.localList
		},
		methods: {
			change(e){
				this.selectIndex = e
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main{
		padding: 0 22upx;
		padding-bottom: 40upx;
	}
	
	.objName {
		display: flex;
		justify-content: center;
		padding: 15upx 0;
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
</style>