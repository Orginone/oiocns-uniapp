# m-tree
#### 本组件为 leo-tree 增强版
#### 本插件基于 作者： leo9012 发行的leo-tree  v1.0.1
#### email:121959858@qq.com
#### props
#### data 数据源
#### defaultProps 配置选项，return { id: 'id', label: 'label', children: 'children' }
#### emit 
#### 参数：
    :data       tree数据原{id:1,
                    label:'',
                    children:[]} 每个节点必须有children,无子节点设置为[];
    :divider    开启节点间分割线, true or false;  不设置为false;
    :edit       开启编辑功能,数据true or false;   不设置为false;
    :unfold     控制默认展开状态, true 为默认展开状态 or false为默认收缩状态; 不设置为false;
                开启后在节点右边增加 + - ↑ ↓按钮，可以绑定up-item down-item add-item，delete-item，long-press事件;

#### 方法：
    @node-click  监听节点点击事件 返回节点数据 {id: id, label: label, pid: pid,* 节点所有数据};
    @up-item     监听节点up上移事件 返回节点数据{item: this.item, items: this.items, index: this.index};
    @down-item   监听节点down下移事件 返回节点数据 {item: this.item, items: this.items, index: this.index};
    @add-item    监听节点新增事件 返回节点数据 {id: id, label: label, pid: pid,* 节点所有数据}; id:0时根节点新增，id:x, 为对应x节点建立子节点;
    @edit-item   监听节点编辑事件 返回节点ID {id: id, label: label, pid: pid,* 节点所有数据};
    @delete-item 监听节点删除事件 返回节点ID {id: id};
    @finger-action  监听节点滑动事件 返回节点数据 {item:选择节点数据, items: 选择节点同级列表,action:number}; action:1上滑, 2下滑，3左滑，4右滑
    @long-press  监听节点长按事件 返回节点数据 {id: id, label: label, pid: pid,* 节点所有数据};

### 使用
#### 本组件符合easycom规范，HBuilderX 2.5.5起，只需将本组件导入项目，在页面template中即可直接使用，无需在页面中import和注册components。
    <template>
        <view class="content">
            <view class="user-box">
            <m-tree
                class="u-p-l-40"
                ref="mtree"
                :defaultProps="defaultProps"
                :data="tree"
                :divider="divider"
                :edit="edit"
                :unfold="true"
                @node-click="nodeClick" 
                @up-item="upNode" 
                @down-item="downNode" 
                @add-item="addNode" 
                @edit-item="editNode" 
                @delete-item="deleteNode"
                @finger-action="fingerAction"
                @long-press="longpressNode"></m-tree>
            </view>
        </view>
    </template>

    <script>
        export default {
            data() {
                return {
                    /* 
                    tree 数据
                    */
                    defaultProps: {
                        id: 'id',             // 此项为id项的key
                        children: 'children', // 此项为修改子集数据的key
                        label: 'label' // 此项为修改显示数据的key
                    },
                    divider: false,
                    edit: true,
                    tree: [
                        {
                            checked: false,
                            children: [{
                                    children: [{
                                        children: [],
                                        id: 111,
                                        label:"芙蓉区",
                                        name: "芙蓉区",
                                        pid: "11"
                                    }],
                                    id: 11,
                                    label:"长沙市",
                                    name: "长沙市",
                                    pid: "1"
                                }
                            ],
                            id: 1,
                            label:"湖南省",
                            name: "湖南省",
                            pid: "0"
                        }
                    ]
                }
            },
            methods: {
                //遍历id节点并删除
                removeNodeData(datas, id){ //遍历树  获取id数组
                  for(var i in datas){
                    if(id===datas[i].id) {
                        // datas.push(datas[i]);
                        console.log('要删除项目：', datas[i].id);
                        datas.splice(i,1);
                        break;
                    } else {
                        if(datas[i].children){  //存在子节点就递归
                          this.removeNodeData(datas[i].children, id);
                        }
                    }
                  }
                },
                //遍历id节点添加子项
                addNodeData(datas, id, nodedata){ //遍历树  获取id数组
                    var addflag = false;
                    if(id===0) {
                        datas.unshift(nodedata);
                        addflag=true;
                    } else {
                        for(var i in datas){
                            console.log(JSON.stringify(datas[i]));
                            if(id===datas[i].id) {
                                // datas.push(datas[i]);
                                console.log('要增加项目：', datas[i].id, nodedata);
                                datas[i].children.unshift(nodedata);
                                addflag=true;
                                break;
                            } else {
                                if(datas[i].children){  //存在子节点就递归
                                  this.addNodeData(datas[i].children, id, nodedata);
                                }
                            }
                        }
                    }
                    return addflag;
                },
                //节点点击事件
                nodeClick(e) {
                    console.log('点击的项目', JSON.stringify(e));
                },
                //节点up按钮点击事件
                upNode(e) {
                    const that = this;
                    console.log('upNode');
                    if(e.index!=0){
                        // 根据自身需求，自行修改数据处理方法；

                        // up上移操作，排序并更新tree中对应元素sort属性
                        var data = {
                            pnode: {}, 
                            itemA: {id: e.items[e.index-1].id, sort: e.items[e.index].sort}, 
                            itemB: {id: e.items[e.index].id, sort: e.items[e.index-1].sort},
                        }
                        that.$refs.mtree.treeSort(that.tree, e.item.pid, data); // 调用组件方法 排序sort 从小到大排序
                        
                    }
                },
                //节点down按钮点击事件
                downNode(e) { 
                    const that = this;
                    console.log('downNode');
                    if(e.index != e.items.length-1){
                        // 根据自身需求，自行修改数据处理方法；

                        // down下移操作，排序并更新tree中对应元素sort属性
                        var data = {
                            pnode: {}, 
                            itemA: {id: e.items[e.index+1].id, sort: e.items[e.index].sort}, 
                            itemB: {id: e.items[e.index].id, sort: e.items[e.index+1].sort},
                        }
                        that.$refs.mtree.treeSort(that.tree, e.item.pid, data); // 调用组件方法 排序sort 从小到大排序
                    }
                },
                //节点新增按钮点击事件
                addNode(e) {
                    //e.pNodeData, e.addContent
                    console.log('点击的项目add', JSON.stringify(e));
                    // 根据自身需求，自行修改数据新增方法；
                    // 可以配合异步请求 执行服务器删除操作
                    let data={};
                    if(e.id===0) {
                        data={id: this.tree.length + 1, pid: e.id, label:'新增节点', name:'新增节点',children:[]}
                    } else {
                        data={id: e.pNodeData.id + e.pNodeData.children.length + 100, pid: e.pNodeData.id, label: e.addContent, name: e.addContent,children:[]}
                    }
                    if(data) {
                        this.addNodeData(this.tree, e.pNodeData.id, data);
                    }
                },
                //节点更新按钮点击事件
                editNode(e) {
                    //e.pNodeData, e.editContent
                    console.log('点击的项目add', JSON.stringify(e));
                    if(e.editContent.length >= 2 && e.editContent.length <= 16) {
                        e.pNodeData.label = e.editContent;
                        e.pNodeData.name = e.editContent;
                    }
                    // 节点已更新
                    
                    /* const that = this;
                    var updateData = {
                        data: {id: e.pNodeData.id, name: e.editContent},
                        params: {id: e.pNodeData.id}
                    }; 
                    new AreaService().update(updateData).then(result => {
                        if(result.code === 0) {
                            if(result.data.id) {
                                that.getList();
                            } else {
                                that.getList();
                            }
                            CommonUtil.toast(`更新巡更区域成功`, 2000);
                        } else {
                            CommonUtil.toast(`更新失败:` + result.message, 2000);
                        }
                    })
                    CommonUtil.toast(e.editContent + `更新成功`, 2000); */
                },
                //节点删除按钮点击事件
                deleteNode(e) {
                    console.log('点击的项目delete', JSON.stringify(e));
                    // 根据自身需求，自行修改数据删除方法；
                    if(this.removeNodeData(this.tree, e.id)) {
                        // 可以配合异步请求 执行服务器删除操作
                        console.log('删除ID:', e,id, '数据');
                    }
                },
                //节点滑动
                fingerAction(e) {
                    console.log('节点滑动fingerAction', JSON.stringify(e));
                },
                //节点选线长按事件
                longpressNode(e) {
                    console.log('长按的项目longpress', JSON.stringify(e));
                }
            }
        }
    </script>

    <style lang="scss">
    page{
        background-color: #ededed;
    }
    .user-box{
        background-color: #fff;
    }
    </style>
