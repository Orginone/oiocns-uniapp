<template>
	<view>
		<headbar :localList="'商店,开放市场'"  :left="'none'" :url="'back'"></headbar>
		<personList :listInfo='listInfo' :title="'开放市场'"  icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/appList/appList'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
					{
						name:'应用'
					},
					{
						name:'数据'
					},
					{
						name:'资产'
					},
					{
						name:'资源'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
