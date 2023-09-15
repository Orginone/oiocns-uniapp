<template>
  <view class="BaseLayout">
    <view class="head head-check">基本信息</view>
    <view class="content">
      <view class="main-outside">
        <view class="child-title">{{ mainData.name }}</view>
        <view class="row" v-for="(item, index) in mainList" :key="index">
          <view class="row-title">{{ item.label }}</view>
          <view class="row-text">
            {{ item.value }}
          </view>
        </view>
      </view>
      <view class="child-outside">
        <view class="child-title">{{ childData.name }}</view>
        <view class="child-table">
          <view class="row" v-for="(item, index) in childList" :key="index">
            <view class="row-title">{{ item.label }}</view>
          </view>
        </view>
        <view class="child-table">
          <view class="row" v-for="(item, index) in childList" :key="index">
            <view class="row-title">{{ item.value }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="describe">
      <view class="describe-title">备注</view>
      <textarea
        class="describe-text"
        placeholder="请输入备注信息"
        v-model="describe"
      ></textarea>
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
      showType: "0",
      infoData: {},
      mainData: {}, //主表信息
      childData: {}, //子表信息
      mainIdList: [], //主表id
      childIdList: [], //子表id集
      mainList: [], //主表list
      childList:[],//子表list
      describe: "", //审核意见
      data: '{"data":{"490461701871898625":[{"after":[{"Creater":"445876715764453376","CreateTime":"2023-09-15 13:59:05.791","ModifiedTime":"2023-09-15 13:59:05.791","Status":"正常","Id":"27766906515801088","Name":"","490470203390562305":"mate60+","490470468600598529":"79999"},{"Id":"27766907244839936","Name":"","Creater":"445876715764453376","CreateTime":"2023-09-15 13:59:50.288","ModifiedTime":"2023-09-15 13:59:50.288","Status":"正常","490470203390562305":"mate 5x","490470468600598529":"12999"}],"before":[],"createTime":"2023-09-15 01:58:30.986","creator":"445876715764453376","nodeId":"490470993278668800"}]},"fields":{"490461701871898625":[{"id":"490470203390562305","rule":"{}","name":"型号","code":"T490461518085885953","remark":"手机型号","lookups":[],"valueType":"描述型"},{"id":"490470468600598529","rule":"{}","name":"价格","code":"T490470438384832513","remark":"价格信息","lookups":[],"valueType":"描述型"}],"490521615633879041":[{"id":"490521666007470081","rule":"{}","name":"型号","code":"T490461518085885953","remark":"手机型号","lookups":[],"valueType":"描述型"},{"id":"490521669530685441","rule":"{}","name":"价格","code":"T490470438384832513","remark":"价格信息","lookups":[],"valueType":"描述型"}]},"primary":{"490470203390562305":"mate60pro","490470468600598529":"69999"},"node":{"id":"490470993278668800","code":"node_318f97d8-dfca-4f5b-b9d4-a863b9b6727a","type":"起始","name":"发起权限","num":1,"destType":"身份","primaryFormIds":["490461701871898625"],"detailFormIds":["490461701871898625","490521615633879041"],"primaryForms":[{"status":1,"attributes":[{"authId":"361356410044420096","id":"490470203390562305","name":"型号","code":"xh","rule":"{}","remark":"手机型号","property":{"updateUser":"445876715764453376","code":"xh","directoryId":"487259085100683264","createUser":"445876715764453376","typeName":"属性","info":"手机型号","name":"型号","status":1,"id":"490461518085885953","createTime":"2023-09-15 09:58:58.246","belongId":"487259085100683264","shareId":"487259085100683264","valueType":"描述型","version":1,"remark":"手机型号","updateTime":"2023-09-15 09:58:58.247"},"propId":"490461518085885953"},{"propId":"490470438384832513","authId":"361356410044420096","id":"490470468600598529","name":"价格","code":"jg","rule":"{}","remark":"价格信息","property":{"belongId":"487259085100683264","createTime":"2023-09-15 10:34:25.011","id":"490470438384832513","updateUser":"445876715764453376","info":"资产的价格","status":1,"createUser":"445876715764453376","directoryId":"487259085100683264","code":"jg","updateTime":"2023-09-15 10:34:25.011","valueType":"描述型","name":"价格","typeName":"属性","remark":"价格信息","version":1,"shareId":"487259085100683264"}}],"id":"490461701871898625","belongId":"487259085100683264","typeName":"实体配置","createTime":"2023-09-15 09:59:42.064","shareId":"487259085100683264","code":"lrst","rule":"{"schema":{"displayType":"row","type":"object","labelWidth":120,"column":1,"properties":{"object_OOipch":{"title":"对象","type":"object","theme":"card","properties":{}}}}}","remark":"录入实体","createUser":"445876715764453376","updateUser":"445876715764453376","version":1,"updateTime":"2023-09-15 10:35:59.879","directoryId":"487259085100683264","name":"录入实体"}],"detailForms":[{"name":"录入实体","version":1,"updateTime":"2023-09-15 10:35:59.879","createTime":"2023-09-15 09:59:42.064","shareId":"487259085100683264","rule":"{"schema":{"displayType":"row","type":"object","labelWidth":120,"column":1,"properties":{"object_OOipch":{"title":"对象","type":"object","theme":"card","properties":{}}}}}","remark":"录入实体","directoryId":"487259085100683264","id":"490461701871898625","createUser":"445876715764453376","code":"lrst","belongId":"487259085100683264","attributes":[{"propId":"490461518085885953","authId":"361356410044420096","id":"490470203390562305","name":"型号","code":"xh","rule":"{}","remark":"手机型号","property":{"updateUser":"445876715764453376","remark":"手机型号","id":"490461518085885953","createTime":"2023-09-15 09:58:58.246","createUser":"445876715764453376","status":1,"directoryId":"487259085100683264","typeName":"属性","shareId":"487259085100683264","valueType":"描述型","name":"型号","updateTime":"2023-09-15 09:58:58.247","code":"xh","belongId":"487259085100683264","version":1,"info":"手机型号"}},{"code":"jg","rule":"{}","remark":"价格信息","property":{"valueType":"描述型","directoryId":"487259085100683264","belongId":"487259085100683264","version":1,"id":"490470438384832513","shareId":"487259085100683264","updateUser":"445876715764453376","info":"资产的价格","updateTime":"2023-09-15 10:34:25.011","createUser":"445876715764453376","name":"价格","code":"jg","remark":"价格信息","status":1,"createTime":"2023-09-15 10:34:25.011","typeName":"属性"},"propId":"490470438384832513","authId":"361356410044420096","id":"490470468600598529","name":"价格"}],"typeName":"实体配置","status":1,"updateUser":"445876715764453376"},{"remark":"事项配置","typeName":"事项配置","attributes":[{"id":"490521666007470081","name":"型号","code":"xh","rule":"{}","remark":"手机型号","property":{"name":"型号","valueType":"描述型","info":"手机型号","version":1,"createUser":"445876715764453376","typeName":"属性","code":"xh","createTime":"2023-09-15 09:58:58.246","directoryId":"487259085100683264","belongId":"487259085100683264","updateUser":"445876715764453376","shareId":"487259085100683264","remark":"手机型号","status":1,"updateTime":"2023-09-15 09:58:58.247","id":"490461518085885953"},"propId":"490461518085885953","authId":"361356410044420096"},{"property":{"name":"价格","updateUser":"445876715764453376","updateTime":"2023-09-15 10:34:25.011","createUser":"445876715764453376","directoryId":"487259085100683264","version":1,"valueType":"描述型","shareId":"487259085100683264","id":"490470438384832513","status":1,"info":"资产的价格","remark":"价格信息","code":"jg","typeName":"属性","createTime":"2023-09-15 10:34:25.011","belongId":"487259085100683264"},"propId":"490470438384832513","authId":"361356410044420096","id":"490521669530685441","name":"价格","code":"jg","rule":"{}","remark":"价格信息"}],"directoryId":"487259085100683264","name":"事项配置","updateUser":"445876715764453376","createTime":"2023-09-15 13:57:46.624","updateTime":"2023-09-15 13:57:59.475","belongId":"487259085100683264","status":1,"createUser":"445876715764453376","version":1,"id":"490521615633879041","code":"sxpz","shareId":"487259085100683264"}],"destName":"全员","children":{"id":"490470993278668801","code":"node_dde9dbee-f476-4f52-8791-d1b927ac387f","type":"审批","name":"审批对象","num":1,"destType":"身份","primaryForms":[],"detailForms":[],"destId":"487259085134237696","destName":"管理员","branches":[]},"branches":[]},"allowAdd":true,"allowEdit":true,"allowSelect":true}',
    };
  },
  watch: {},
  onLoad(options) {
    console.log(options);
    this.belongId = options.belongId;
    this.instanceId = options.instanceId;
  },
  async onShow(options) {
    let res = await this.getInfo();
    this.data = res.data[0];
    let infoData = JSON.parse(this.data.data);
    this.infoData = infoData.data;
    console.log(infoData);

    this.mainIdList = infoData.node.primaryFormIds; //主表id
    this.mainData = infoData.node.primaryForms[0]; //主表信息
    this.childIdList = infoData.node.detailFormIds; //子表id集
    this.childData = infoData.node.detailForms; //子表信息集
    this.mainList = []; //主表list
    this.mainIdList.forEach((element) => {
      infoData.fields[element].forEach((els) => {
        let obj = {
          label: els.name,
          value: infoData.primary[els.id],
        };
        this.mainList.push(obj);
      });
    });
    this.childList = []; //子表list
    this.childIdList.forEach((element) => {
      infoData.fields[element].forEach((els) => {

        let obj = {
          label: els.name,
        };
        const item = infoData.data[element];
        item.forEach(items =>{
            console.log(items.after)
            items.after.forEach(itemx => {
              obj.value = itemx[els.id];
            });
        })
        this.childList.push(obj);
      });
    });
  },
  methods: {
    async getInfo() {
      return await kernel.collectionAggregate(
        this.belongId,
        [this.belongId],
        "work-instances",
        {
          match: { id: this.instanceId },
          limit: 1,
          lookup: {
            from: "work-tasks",
            localField: "id",
            foreignField: "instanceId",
            as: "tasks",
          },
        }
      );
    },
    bindTextAreaBlur: function (e) {
      console.log(e.detail.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.BaseLayout {
  background: #aaaaaa3d;
}
.head {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 36rpx;
  color: #154ad8;
  padding: 0 20rpx;
  background: #fff;
  border-bottom: 1px solid #eee;
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
.child-title {
  color: #154ad8;
  margin-bottom: 16rpx;
  font-size: 32rpx;
}
.main-outside {
  padding: 16rpx;
  padding-bottom: 20rpx;
  font-size: 32rpx;
  background: #fff;
  .row {
    margin-bottom: 16rpx;
    .row-title {
      margin-bottom: 16rpx;
    }
    .row-text {
      margin-bottom: 16rpx;
    }
    border-bottom: 1px solid #eee;
  }
  margin-bottom: 20rpx;
}

.child-outside {
  padding: 16rpx;
  font-size: 32rpx;
  margin-bottom: 20rpx;
  background: #fff;
  .child-table {
    overflow-x: scroll;
    display: flex;
    border-left: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    .row {
      width: 300rpx;
      border-right: 1px solid #eee;
      text-align: center;
      .row-text {
        margin-top: 16rpx;
      }
    }
  }
}
.describe {
  background: #fff;
  padding: 20rpx;
  .describe-title {
    margin: 16rpx 0;
  }
  .describe-text {
    width: 100%;
    border-radius: 8rpx;
    border: 1px solid #ccc;
    padding: 20rpx;
    box-sizing: border-box;
  }
}
</style>
