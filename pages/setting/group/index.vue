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
			console.log('option',option);
			let res = await config.loadSettingMenu();
			let list = this.searchObjectByKey(res.children,'key',option.data)
			let arr =[];
			list.children.forEach((element,index) => {
				let obj = {
					label:element.label,
					url:"/pages/setting/group/detail?key="+element.key,
					itemType:element.item.target.metadata.typeName,
					icon:element?.item?.share?.avatar?.thumbnail
				}
				arr.push(obj)
			});
			this.listInfo = arr;
		},
		watch:{
			
		},
		methods: {
			 searchObjectByKey(obj, key, value) {
				if (key === 'icon') {
					obj[key] = '';
				}

				let queue = [obj];

				while (queue.length > 0) {
					let currentObj = queue.shift();

					if (currentObj.hasOwnProperty(key) && currentObj[key] === value) {
					return currentObj;
					}

					for (let prop in currentObj) {
					if (currentObj.hasOwnProperty(prop) && typeof currentObj[prop] === 'object') {
						queue.push(currentObj[prop]);
					}
					}
				}
				return null;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>