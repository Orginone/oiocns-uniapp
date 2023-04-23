<template>
	<view>
		<headbar :first="'仓库'" :color="false" :left="'more'" :url="url"></headbar>
		<personList :listInfo='listInfo' :title="'个人'" :chat="false"></personList>
		<personList :listInfo='listInfo2' :title="'组织'" :chat="false"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'back',
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
