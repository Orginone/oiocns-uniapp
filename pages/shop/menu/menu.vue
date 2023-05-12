<template>
	<view>
		<headbar :localList="'仓库'" :color="false" :left="'more'" :url="'back'"></headbar>
		<personList :listInfo='listInfo' :title="'开放市场'"  icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
		<personList :listInfo='listInfo2' :title="'创建的'"  icon="dotPlus" :localList="'仓库'"  :url="'/pages/shop/page2/page2'"></personList>
		<personList :listInfo='listInfo3' :title="'加入的'"  icon="dotPlus" :localList="'仓库'"  :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
					{
						name:'应用市场'
					},
					{
						name:'公益仓'
					},
					{
						name:'数据市场'
					}					
				],
				listInfo2:[
					{
						name:'个人'
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
				],
				listInfo3:[
					{
						name:'杭州电子科技大学'
					},
					{
						name:'浙江省财政厅'
					}			
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
