## 1.0.8（2022-02-25）
增加上移下移功能按钮
## 1.0.7（2022-02-17）
修正小程序显示问题
## 1.0.6（2022-02-17）
修正小程序显示问题
## 1.0.5（2022-01-30）
修改实例代码报错问题
## 1.0.3（2022-01-29）
更新编辑功能。
    增加事件 @finger-action  返回参数为编辑项 item对象数据包括children，action 滑动动作action:1上滑, 2下滑，3左滑，4右滑
    增加事件 @edit-item  返回参数为编辑项 item对象数据包括children
    增加展开参数 :unfold="true", 不设置默认未false ,不展开。
        <m-tree
            :defaultProps="defaultProps"
            :data="tree"
            :divider="divider"
            :edit="edit"
            :unfold="true"
            @node-click="nodeClick" 
            @add-item="addNode" 
            @edit-item="editNode" 
            @delete-item="deleteNode"
            @finger-action="fingerAction"
            @long-press="longpressNode">
        </m-tree>
## 1.0.1（2021-09-24）
修正说明实例文件中标签名称 m-tree

## 1.0.0（2021-09-24）
基于leo-tree插件 更新编辑功能，多参数控制，更多功能持续更新。感谢原作者leo9012
