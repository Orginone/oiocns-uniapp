<template>
	<view class="BaseLayout">
        <headbar :localList="'群组'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' :icon="['dotPlus','right']"  :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	import * as config from "../config/menuOperate";

	export default {
		data() {
			return {
				listInfo:[],
			};
		},
		async onLoad(option) {			
			let res =  await config.loadSettingMenu();
			let list = this.searchObjectByKey(res,'key',option.data.replace(/^"|"$/g, '')+"组织集群")
			let arr =[];
			list.children.forEach((element,index) => {
				let obj = {
					label:element.label,
					url:"/pages/setting/group/detail?key="+element.key
				}
				arr.push(obj)
			});
			this.listInfo = arr;
		},
		watch:{
			
		},
		methods: {
			searchObjectByKey(obj, key, value) {
				let that = this;
				if (obj.hasOwnProperty(key) && obj[key] === value) {
					return obj;
				}
				// 遍历所有属性
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
					// 对于值为对象的属性，递归调用 searchObjectByKey 函数
						var result = that.searchObjectByKey(obj[prop], key, value);
						if (result) {
							return result;
						}
					}
				}
				return null; // 如果整个对象都被遍历完了，仍然没有找到相应的属性，则返回 null
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>