<template>
	<view>
		<headbar  right :left="'more'" :url="'/pages/work/work'" basic="办事"></headbar>
		<personList :listInfo="listInfo1"  :url="'/pages/work/page3/page3'" icon="dotPlus add" :localList="localList"></personList>
		<personList :listInfo="listInfo2"  :url="'/pages/work/page3/page3'" icon="dotPlus " :localList="localList" style="transform: translateY(-18upx);"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo1: [{
						name: '资产报废',
					},
					{
						name: '资产报损'
					},
					{
						name: '资产出售'
					}
					
				],
				listInfo2: [
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
			this.localList = (data.localList)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>