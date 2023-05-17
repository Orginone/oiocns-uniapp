<template>
	<view>
		<headbar :localList="localList" color left="more" url="/pages/warehouse/warehouse"></headbar>
		<personList :listInfo="listInfo1"  :url="'/pages/warehouse/page3/page3'" icon="dotPlus right" :localList="localList"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList: '仓库', //当前页
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
			let data = (JSON.parse(options.data))
			this.localList = (data.localList)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>