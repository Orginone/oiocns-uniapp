<template>
	<view class="BaseLayout">
        <headbar :localList="'设置'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' :icon="['dotPlus','right']" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
					{
						name:'权限标准',
						url:"/pages/setting/authority/index",
						a: listInfo
					},
					{
						name:'数据标准',
						url:""
					},
					{
						name:'个人群组',
						url:""
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