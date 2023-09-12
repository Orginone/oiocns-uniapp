<template>
  <view class="BaseLayout">
    <view class="head head-check">基本信息</view>
    <view class="content">
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </view>
    <view class="foot">
      <view class="nocheck">退回</view>
      <view class="passcheck">通过</view>
    </view>
  </view>
</template>

<script>
import { kernel } from "../../../ts/base";

export default {
  data() {
    return {
      menu: [],
      listType: "store",
      showType: "0",
      data:[{"defineId":"468838485734854656","contentType":"Text","applyId":"448524755247697920","createUser":"445876715764453376","_id":"64c325874b4b3d33cf6ddc20","id":"472709501498298368","title":"资产录入","updateUser":"445876715764453376","version":"1","tasks":[{"shareId":"448524755247697920","content":"test","createUser":"445876715764453376","_id":"64c325874b4b3d33cf6ddc1f","count":1,"updateTime":"2023-07-28 10:18:47.677","nodeId":"472709182311763969","belongId":"448524755247697920","applyId":"448524755247697920","version":"1","createTime":"2023-07-28 10:18:47.677","approveType":"审批","defineId":"468838485734854656","taskType":"事项","identityId":"448524755272863744","instanceId":"472709501498298368","status":1,"updateUser":"445876715764453376","id":"472709501506686976","title":"资产录入[管理员]"}],"content":"test","data":"{\"data\":{\"458933450653700096\":[{\"before\":[],\"after\":[{\"Id\":\"27697326351795200\",\"Name\":\"\",\"Creater\":\"445876715764453376\",\"CreateTime\":\"2023-07-28 10:18:29.609\",\"ModifiedTime\":\"2023-07-28 10:18:29.609\",\"Status\":\"正常\",\"461536058488786944\":\"200\",\"461579110049779712\":\"300\"}],\"nodeId\":\"472709182311763968\",\"creator\":\"445876715764453376\",\"createTime\":\"2023-07-28 10:18:01.59\"}],\"458926393082908672\":[{\"before\":[],\"after\":[{\"Id\":\"27697325886800896\",\"Name\":\"\",\"Creater\":\"445876715764453376\",\"CreateTime\":\"2023-07-28 10:18:01.228\",\"ModifiedTime\":\"2023-07-28 10:18:01.228\",\"Status\":\"正常\",\"458932600250175488\":\"100\",\"472705122879803392\":\"200\"}],\"nodeId\":\"472709182311763968\",\"creator\":\"445876715764453376\",\"createTime\":\"2023-07-28 10:18:03.537\"}]},\"fields\":{\"458926393082908672\":[{\"id\":\"458932600250175488\",\"rule\":\"{}\",\"name\":\"面积\",\"code\":\"T458932551709495296\",\"remark\":\"面积大小\",\"lookups\":[],\"valueType\":\"描述型\"},{\"id\":\"472705122879803392\",\"rule\":\"{}\",\"name\":\"面积\",\"code\":\"T461566095971717120\",\"remark\":\"面积\",\"lookups\":[],\"valueType\":\"描述型\"},{\"id\":\"458927033527963648\",\"rule\":\"{}\",\"name\":\"金额\",\"code\":\"T458926996194463744\",\"remark\":\"资产金额\",\"lookups\":[],\"valueType\":\"选择型\"}],\"458933450653700096\":[{\"id\":\"461536058488786944\",\"rule\":\"{}\",\"name\":\"面积\",\"code\":\"T458932551709495296\",\"remark\":\"面积大小\",\"lookups\":[],\"valueType\":\"描述型\"},{\"id\":\"461579110049779712\",\"rule\":\"{}\",\"name\":\"面积\",\"code\":\"T461566095971717120\",\"remark\":\"面积\",\"lookups\":[],\"valueType\":\"描述型\"},{\"id\":\"461581121914802176\",\"rule\":\"{}\",\"name\":\"金额\",\"code\":\"T458926996194463744\",\"remark\":\"资产金额\",\"lookups\":[],\"valueType\":\"选择型\"},{\"id\":\"461581116206354432\",\"rule\":\"{}\",\"name\":\"金额\",\"code\":\"T458926996194463744\",\"remark\":\"资产金额\",\"lookups\":[],\"valueType\":\"选择型\"}]},\"primary\":{\"458932600250175488\":\"100\",\"472705122879803392\":\"200\"},\"node\":{\"id\":\"472709182311763968\",\"code\":\"node_8c8eb775-e795-4720-b2fe-cfb5206cb354\",\"type\":\"起始\",\"name\":\"发起角色\",\"children\":{\"id\":\"472709182311763969\",\"code\":\"node_dabd36ff-74cb-4b93-9a62-52a20de2154b\",\"type\":\"审批\",\"name\":\"审批对象\",\"num\":1,\"destType\":\"身份\",\"destId\":\"448524755272863744\",\"destName\":\"管理员\"},\"num\":1,\"destType\":\"角色\",\"destName\":\"全员\",\"forms\":[{\"id\":\"458926393082908672\",\"typeName\":\"主表\",\"directoryId\":\"458925687944908800\",\"belongId\":\"448524755247697920\",\"name\":\"资产实体\",\"code\":\"zcst\",\"remark\":\"资产实体\",\"status\":1,\"createUser\":\"445876715764453376\",\"updateUser\":\"445876715764453376\",\"version\":\"1\",\"createTime\":\"2023-06-20 09:29:38.552\",\"updateTime\":\"2023-06-20 09:29:38.552\"},{\"id\":\"458933450653700096\",\"typeName\":\"子表\",\"directoryId\":\"458925687944908800\",\"belongId\":\"448524755247697920\",\"name\":\"资产录入事项\",\"code\":\"zclrsx\",\"remark\":\"资产录入事项\",\"status\":1,\"createUser\":\"445876715764453376\",\"updateUser\":\"445876715764453376\",\"version\":\"1\",\"createTime\":\"2023-06-20 09:57:41.207\",\"updateTime\":\"2023-06-20 09:57:41.207\"}]},\"allowAdd\":true,\"allowEdit\":true,\"allowSelect\":true}","shareId":"448524755247697920","belongId":"448524755247697920","createTime":"2023-07-28 10:18:47.675","status":1,"updateTime":"2023-07-28 10:18:47.675"}]
    };
  },
  watch: {},
  async onLoad(options) {
    console.log(options);
    this.belongId = options.belongId;
    this.instanceId = options.instanceId;
    // let res = await this.getInfo();
    console.log("data",JSON.parse( this.data[0].data));
  },

  onShow() {},
  methods: {
    async getInfo() {
      return await kernel.collectionAggregate(this.belongId, "work-instances", {
        match: { id: this.instanceId },
        limit: 1,
        lookup: {
          from: "work-tasks",
          localField: "id",
          foreignField: "instanceId",
          as: "tasks",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  height: 100rpx;
  line-height: 100rpx;
  font-size: 32rpx;
}
.head-check {
}
.foot {
  position: fixed;
  bottom: 0;
  height: 150rpx;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9;

  .nocheck {
    background: rgb(246, 57, 57);
    margin-right: 80rpx;
  }
  .passcheck {
    background: #154ad8;
  }
  .nocheck,
  .passcheck {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 32rpx;
    border-radius: 8rpx;
    text-align: center;
  }
}
</style>
