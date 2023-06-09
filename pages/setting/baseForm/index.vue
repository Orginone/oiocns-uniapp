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
            this.getDetail(param)

		},
		methods: {
            getDetail(param){
                let obj = JSON.parse(param.data)
                console.log(obj);
                this.title = '标准';
                let showObj = {
                    '名称':obj.item._metadata.name,
                    '代码':obj.item._metadata.code,
                    '归属':'资产共享云',
                    '创建人':'资产共享云',
                    '创建时间':obj.item._metadata.createTime,
                    '描述':obj.item._metadata.remark
                }
                this.formData = showObj;
            },
            findObjectByKey(tree, key) {
                let that = this;
                // 遍历树形结构
                for (var i = 0; i < tree.length; i++) {
                    var node = tree[i];
                    // 如果节点的key等于要查找的key，则返回该节点对象
                    if (node.key === key) {
                    return node;
                    }
                    // 如果节点有子节点，则递归查找子节点
                    if (node.children && node.children.length > 0) {
                    var childResult = that.findObjectByKey(node.children, key);
                    if (childResult) {
                        // 如果找到了相同key的子节点，则返回该子节点对象
                        return childResult;
                    }
                    }
                }
                // 如果都没找到，则返回null
                return null;
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