<template>
	<view class="BaseLayout">
        <headbar :localList="'关系,浙江省财政厅'" :left="'none'"></headbar>
        <basicForm :formData="formData" :title="title"></basicForm>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{}
			};
		},
		watch:{
			
		},
        onLoad() {
            let param = this.getParam();
            console.log('param',param)
            this.getDetail(param)
		},
		methods: {
            getDetail(param){
                let obj = this.searchObjectByKey(this.$store.setting,'key',param.data)
                console.log(this.$store.setting,obj);
                let showObj = [
                    {
                        name:'名称',
                        value:obj._metadata.name,
                    },
                    {
                        name:'代码',
                        value:obj._metadata.code,
                    },
                    {
                        name:'归属',
                        value:"资产共享云",
                    },
                    {
                        name:'创建人',
                        value:'资产共享云',
                    },
                    {
                        name:'创建时间',
                        value:obj._metadata.createTime,
                    },
                    {
                        name:'描述',
                        value:obj._metadata.remark,
                    }
                ]
                this.formData = showObj;
            },
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