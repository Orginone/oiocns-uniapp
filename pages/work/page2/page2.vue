<template>
	<view>
		<headbar :localList="localList" right :left="'more'" :url="'/pages/work/work'" ></headbar>
		<personList :listInfo="listInfo1"  :url="'/pages/work/page3/page3'" icon="dotPlus" :localList="localList"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList: '仓库', //当前页
				listInfo1: [{
						name: '资产报废',
					},
					{
						name: '资产报损'
					},
					{
						name: '资产出售'
					},
					{
						name: '资产捐赠'
					},
					{
						name: '资产调拨'
					},
					{
						name: '资产交易'
					}
					
				]

			};
		},
		onLoad(options) {
			let data = (JSON.parse(options.data))
			this.localList = (data.localList+',资产处置')
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>