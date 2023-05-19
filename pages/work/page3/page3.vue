<template>
	<view class="baseLayout">
		<headbar  right :left="'more'" :url="'/pages/work/work'" last basic="办事"></headbar>
		<view class="main">
			<selectBar @change="change" style="width: 100%;"></selectBar>
			<view class="dealList" v-for="item,index in dealList" :key="index" @click="turnpage()">
				<dealItem :itemInfo="item" :btn="false" ></dealItem>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dealList: [{
						title: '这是一张审批单',
						sub: '资金审批，望通过',
						type: '单位审批',
					},
					{
						title: '“张三”想加入单位',
						sub: '你好，我是市场部新员工张三',
						type: '好友申请',
					},
					{
						title: '“张三”想加入单位',
						sub: '你好，我是市场部新员工张三',
						type: '好友申请',
					},
					{
						title: '“张三”想加入单位',
						sub: '你好，我是市场部新员工张三',
						type: '好友申请',
					},
				]
			};
		},
		onLoad(options) {

		},
		methods: {
			//跳转
			turnpage() {
				uni.navigateTo({
					url: '/pages/work/page4/page4?data='+JSON.stringify({name:'资产处置'})
				})
			},
			//获取选择菜单参数
			change(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		.dealList {
			margin-top: 20upx;
		}
	}
</style>