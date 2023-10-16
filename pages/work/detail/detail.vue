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
      <view class="nocheck" @click="submit(200)">退回</view>
      <view class="passcheck" @click="submit(100)">通过</view>
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
      data: "",
      id:"",//提交的id
    };
  },
  watch: {},
  onLoad(options) {
    console.log(options);
    this.belongId = options.belongId;
    this.instanceId = options.instanceId;
    this.id = options.id
  },
  async onShow(options) {
    let res = await this.getInfo();
    console.log('res',res);
    this.data = res.data[0];
    let infoData = JSON.parse(this.data.data);
    this.infoData = infoData.data;
    console.log('infoData',infoData);

    this.mainIdList = [infoData.node.primaryForms[0].id]; //主表id
    this.mainData = infoData.node.primaryForms[0]; //主表信息
    this.childIdList = [infoData.node.detailForms[0].id]; //子表id集
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
  
    this.childData[0].attributes.forEach((els) => {
      let obj = {
        label: els.name,
      };
      const item = infoData.data[this.childIdList[0]];
     
      item.after.forEach(itemx => {
        obj.value = itemx[els.id];
      });
      this.childList.push(obj);
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
    async submit(num){
       const res = await kernel.approvalTask({
          id: this.id,
          status: num,
          comment: this.describe,
          data: JSON.stringify(this.data),
        });
        uni.showToast({
          title: '审核成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1500);
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
