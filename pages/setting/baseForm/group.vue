<template>
	<view class="BaseLayout">
		<headbar :localList="'设置'" :left="'none'"></headbar>
		<sideForm :datalist="datalist" :title="'当前单位'"></sideForm>
		<switchBar @change="change"></switchBar>
		<view class="formArea">
			<view class="item" v-if="switchIndex == 0">
				<uni-table>
					<uni-tr>
						<uni-th v-for="item,index in formTitle" :key="index" style="color: #333;font-weight: normal;">{{item.name}}</uni-th>
					</uni-tr>
					<uni-tr v-for="item,index in formList" :key="index" >
						<uni-td v-for="it,ind in Object.values(item)" :key="ind" style="color: #9A9A9A;">{{it}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
			<view class="item" v-if="switchIndex == 1">
				<!-- <subForm :formTitle="formTitle" :formList="formList"></subForm> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchIndex: 0,
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
				datalist: [{
						name: '单位名称',
						value: '浙江省财政厅'
					},
					{
						name: '社会统一信用码',
						value: '123456789'
					},
					{
						name: '团队检查',
						value: '浙江省财政厅'
					},
					{
						name: '团队代号',
						value: '浙江省财政厅'
					},
					{
						name: '单位简介',
						value: '未公示'
					}
				]
			};
		},
		methods: {
			change(e) {
				this.switchIndex = e
			},
		}
	}
</script>

<style lang="scss" scoped>
	.BaseLayout {
		padding: 0 14upx;
		box-sizing: border-box;
	}
</style>