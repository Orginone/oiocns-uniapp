<template>
	<view class="BaseLayout">
    
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
    onload(options){
      console.log(options,'options')
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