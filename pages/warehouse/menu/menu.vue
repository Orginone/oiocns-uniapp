<template>
	<view>
		<headbar :localList="'仓库'" :color="false" :left="'more'" :url="'back'"></headbar>
		<personList :listInfo='listInfo' :title="'个人'" :chat="false"  :localList="'仓库'"  :url="'/pages/warehouse/page2/page2'"></personList>
		<personList :listInfo='listInfo2' :title="'组织'" :chat="false" :localList="'仓库'"   :url="'/pages/warehouse/page2/page2'"></personList>
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
						name:'文件'
					},
					{
						name:'数据'
					}					
				],
				listInfo2:[
					{
						name:'杭州电子科技大学'
					},
					{
						name:'浙江省财政厅'
					},
					{
						name:'浙江省教育局'
					},
					{
						name:'浙江省资源局'
					}					
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
