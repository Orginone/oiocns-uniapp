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
						url:"/pages/setting/tree/index",
					},
					{
						label:'数据标准',
						url:"/pages/setting/tree/index",
					},
					{
						label:'个人群组',
						url:"/pages/setting/tree/index",
					}					
				],
			};
		},
		watch:{
			
		},
		onLoad() {
			this.getMenu();
		},
		methods: {
			getMenu(){
				console.log('this.$store.setting;',JSON.parse(JSON.stringify(this.$store.setting)))
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>