<template>
	<view>
		<headbar :localList="localList"></headbar>
		<personList :listInfo="listInfo1" :title="''" :url="'/pages/warehouse/page3/page3'" icon="dotPlus"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList: [], //当前页
				listInfo1: [{
						name: '本证维度',
					},
					{
						name: '文物维度'
					},
					{
						name: '财会维度'
					},
					{
						name: '使用维度'
					}
				]

			};
		},
		onLoad(options) {
			let data = JSON.parse(options.data)
			this.localList = uni.getStorageSync('localList').slice(0,2)
			this.localList[1]=(data.name)
			uni.setStorageSync('localList',this.localList)
			console.log(this.localList);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>