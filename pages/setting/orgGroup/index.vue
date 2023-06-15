<template>
	<view class="BaseLayout">
        <headbar :localList="'群组'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' :icon="['dotPlus','right']"  :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[],
			};
		},
		onLoad(option) {			
			let list = this.searchObjectByKey(this.$store.setting,'key',JSON.parse(option.data)+"组织集群")
			console.log('option',option,list);
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
			getParam(){
                let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
                let curParam = routes[routes.length - 1].options; //获取路由参数
                // 拼接参数
                let param = ''
                for (let key in curParam) {
                    param += '&' + key + '=' + curParam[key]
                }
                // 把参数保存为对像
                let obj = {}
                for (let key in curParam) {
                    obj[key] = curParam[key]
                }
                return obj
            },
		}
	}
</script>

<style lang="scss" scoped>

</style>