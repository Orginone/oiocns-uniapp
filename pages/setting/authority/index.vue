<template>
	<view class="BaseLayout">
        <headbar :localList="'关系,浙江省财政厅'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' :title="'开放市场'"  icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
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
			};
		},
		watch:{
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>