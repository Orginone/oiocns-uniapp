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
				key:'',
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
						key:"",
						url:"/pages/setting/group/index",
					}					
				],
			};
		},
		watch:{
			
		},
		onLoad() {
			this.key = this.$store.setting.children[0].children[2].key
			this.listInfo[2].key = this.key
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>

</style>