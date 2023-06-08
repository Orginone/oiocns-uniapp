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
		onLoad() {
			let parse = this.getParam();
			let list = this.$store.setting.children[parse.index].children[2];
			console.log('list',list)
			let arr =[];
			list.children.forEach((element,index) => {
				let obj = {
					label:element.label,
					url:"/pages/setting/baseForm/group?index="+index
				}
				arr.push(obj)
			});
			this.listInfo = arr;
		},
		watch:{
			
		},
		methods: {
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