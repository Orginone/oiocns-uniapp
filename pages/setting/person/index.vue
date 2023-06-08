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
						label:'权限标准',
						url:"/pages/setting/tree/index?type=authority",
					},
					{
						label:'数据标准',
						url:"/pages/setting/tree/index?type=standard",
					},
					{
						label:'个人群组',
						url:"/pages/setting/group/index?index=0",
					}					
				],
			};
		},
		watch:{
			
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>

</style>