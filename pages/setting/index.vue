<template>
	<view class="BaseLayout">
        <headbar :localList="'关系,浙江省财政厅'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	import * as config from './config/menuOperate';
	export default {
		data() {
			return {
				listInfo:[
					{
						name:'姜杨',
            url:"/pages/setting/person/index"
					},
					{
						name:'浙江省财政厅',
						url:"/pages/setting/company/index"
					},				
				],
			};
		},
		watch:{
			
		},
	 	onLoad() {
			this.getMenu();
		},
		methods: {
			async getMenu(){
				let res = await config.loadSettingMenu();
				console.log('aaab',res)
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>