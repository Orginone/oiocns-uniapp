<template>
	<view class="BaseLayout">
        <headbar :localList="'设置'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' :icon="['dotPlus','right']" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	import * as config from "../config/menuOperate";
	export default {
		data() {
			return {
				key:'',
				listInfo:[
					{
						label:'权限标准',
						key:"",
						url:"/pages/setting/tree/index",
					},
					{
						label:'数据标准',
						key:"",
						url:"/pages/setting/tree/index",
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
		async onLoad(option) {
			let res = await config.loadSettingMenu();
			let index = this.$getIndex(res.children,option.data);
			this.listInfo.forEach((element,indes) => {
				this.listInfo[indes].index = index
				this.listInfo[indes].key = res.children[index].children[indes].key
			});
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>

</style>