<template>
	<view class="BaseLayout">
    <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
    <personList :listInfo='listInfo' icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
          
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