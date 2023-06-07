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
                console.log('param',param)
                 if(param.type =='权限'){
                    let obj = this.findObjectByKey(this.$store.setting.children,param.data);
                    console.log(obj.item);
                    this.title = obj.typeName;
                    let showObj = {
                        '名称':obj.item.name,
                        '代码':obj.item.code,
                        '归属':'奥集能',
                        '创建人':'奥集能',
                        '创建时间':obj.item.createTime,
                        '描述':obj.item.remark
                    }
                    this.formData = showObj;
                }else{
                    let obj = this.findAuthByKey(this.$store.setting.children,param.data);
                    console.log(obj);
                    // this.title = '标准';
                    // let showObj = {
                    //     '名称':obj.item.name,
                    //     '代码':obj.item.code,
                    //     '归属':'奥集能',
                    //     '创建人':'奥集能',
                    //     '创建时间':obj.item.createTime,
                    //     '描述':obj.item.remark
                    // }
                    // this.formData = showObj;
                }
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
            findAuthByKey(tree, key) {
                // let that = this;
                // // 遍历树形结构
                // for (var i = 0; i < tree.length; i++) {
                //     var node = tree[i];
                //     // 如果节点的key等于要查找的key，并且有_metadata属性，则返回该节点对象
                //     if (node.key === key && node._metadata) {
                //         return node;
                //     }
                //     // 如果节点有子节点，则递归查找子节点
                //     if (JSON.stringify(node) !="{}") {
                //         var childResult = that.findAuthByKey(node.children, key);
                //         if (childResult) {
                //             // 如果找到了相同key的子节点，判断是否有_metadata属性，有则返回该子节点对象，否则继续递归查找
                //             if(childResult._metadata){
                //                 return childResult;
                //             }else{
                //                 continue;
                //             }
                //         }
                //     }
                // }
                // // 如果都没找到，则返回null
                // return null;
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