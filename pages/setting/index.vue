<template>
	<view class="BaseLayout">
        <headbar :localList="'关系,浙江省财政厅'" :left="'none'"></headbar>
        <personList :listInfo='menu' icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	import * as config from './config/menuOperate';
	export default {
		data() {
			return {
				menu:[],
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
				let arr = []
				console.log('res',res.children)
				res.children.forEach((element,index) => {
					let obj = {
						name:element.label,
						url:index ==0?'/pages/setting/person/index':'/pages/setting/company/index'
					}
					arr.push(obj)
				});
				this.menu = arr;
				
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>