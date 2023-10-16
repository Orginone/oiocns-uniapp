<template>
  <view class="BaseLayout">
    <view class="content" v-for="(item, index) in primaryList" >
      <view class="item">
        <view class="item-title">{{ item.name }}</view>
        <view class="item-com">
          <view v-if="item.valueType == '描述型'">
            <input class="item-ipt" v-model="item.value" type="text" />
          </view>
          <selectFrom v-else-if="item.valueType == '描述型1'"></selectFrom>
          <timeFrom v-else-if="item.valueType == '描述型2'"></timeFrom>
        </view>
      </view>
    </view>

    <view class="detail-from">
      <view class="detail-head">
        <view class="detail-type">事项配置</view>
        <view class="detail-edit">
          <view class="add-btn" @click="showAddDetail()">新增</view>
          <view class="search-btn">选择</view>
        </view>
      </view>
      <view class="detail-tab">
        <view class="uni-container">
          <uni-table
            ref="table"
            :loading="loading"
            border
            stripe
            emptyText="暂无更多数据"
          >
            <uni-tr>
              <uni-th
                v-for="(item, index) in detailList"
                :key="index"
                width="150"
                align="center"
                >{{ item.name }}</uni-th
              >
            </uni-tr>
            <uni-tr  v-for="(it, index) in detailForm.after" :key="it.label">
              <!-- <uni-td  v-for="(item, index) in detailList" :key="index">{{ item.value }}</uni-td> -->
            </uni-tr>
          </uni-table>
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
      <view class="nocheck">返回</view>
      <view class="passcheck" @click="submitFrom()">通过</view>
    </view>

    <!-- add -->
    <view class="dialog-add" v-if="addDetail">
      <view class="dialog-box">
        <view class="item" v-for="(item, index) in detailList" :key="index">
          <view class="item-title">{{ item.name }}</view>
          <view class="item-com">
            <input class="item-ipt" type="text" v-model="item.value" />
          </view>
        </view>
        <view class="dialog-foot">
          <view class="dialog-nocheck" @click="addDetail = false">关闭</view>
          <view class="dialog-passcheck" @click="createThing">确认</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import orgCtrl from "@/ts/controller";
import timeFrom from "./formType/timeFrom.vue";
import selectFrom from "./formType/selectFrom.vue";
import inputFrom from "./formType/inputFrom.vue";
import { kernel } from "../../../ts/base";
import UniTr from '../../../uni_modules/uni-table/components/uni-tr/uni-tr.vue';

export default {
  data() {
    return {
      tableData: [
        {
          date: "2020-09-12",
          name: "Dcloud12",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      id: "", //work的id
      menu: [],
      apply: {
        belong:{},
      }, //表单
      primaryId: "",
      detailId: "",
      primaryList: [], //主表字段
      detailList: [], //子表字段
      describe: "",
      addDetail: false, //显示弹窗
      detailForm:{},//传递的子表信息
    };
  },
  components: {
    inputFrom,
    selectFrom,
    timeFrom,
    UniTr,
  },
  watch: {},
  async onLoad(options) {
    this.id = options.id;
    let apps = [];
    for (const target of orgCtrl.targets) {
      apps.push(...(await target.directory.loadAllApplication()));
    }
    apps.forEach((element) => {
      this.findObject(element.works, this.id);
    });
  },
  async onShow(options) {},
  methods: {
    async getWorkDetail(element) {
      element.createApply().then((value) => {
        console.log('value',value);
        this.apply.belong.id = value.belong.id
        this.apply.belong.userId = value.belong.userId;
        this.apply.instanceData = value.instanceData;
        this.apply.metadata = value.metadata;
        // this.apply = res;
        console.log("this.apply", this.apply);
        this.getPrimaryList();
        this.getDetailList();
        this.getFormData();
      });

    },
    findObject(arr, id) {
      console.log("arr", arr, "id", id);
      if (arr && arr.length > 0) {
        arr.forEach((element) => {
          if (element._metadata.id == id) {
            this.getWorkDetail(element);
            return;
          }
          if (element.children && element.children.length > 0) {
            this.findObject(element.children, id);
          }
        });
      }
    },
    formatDate(date, format) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

      const placeholders = {
        "yyyy": year,
        "MM": month,
        "dd": day,
        "hh": hours,
        "mm": minutes,
        "ss": seconds,
        "S": milliseconds
      };

      return format.replace(/(yyyy|MM|dd|hh|mm|ss|S)/g, match => placeholders[match]);
    },
    getFormData(id) {
      const source = [];
      // if (this.instanceData.data && this.instanceData.data[id]) {
      //   const beforeData = props.data.data[id];
      //   if (beforeData.length > 0) {
      //     if (!props.allowEdit) {
      //       const nodeData = beforeData.filter((i) => i.nodeId === node.id);
      //       if (nodeData && nodeData.length > 0) {
      //         return nodeData.slice(-1)[0];
      //       }
      //     } else {
      //       source.push(...beforeData.slice(-1)[0].after);
      //     }
      //   }
      // }
      this.detailForm = {
        before: [],
        after: [],
        nodeId: this.apply.instanceData.node.id,
        creator: this.apply.belong.userId,
        createTime: this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S"),
      };
      console.log(this.detailForm);
    },
    showAddDetail() {
      this.addDetail = true;
    },
    getPrimaryList() {
      this.primaryList = JSON.parse(JSON.stringify(this.apply.instanceData.fields[this.apply.instanceData.node.primaryForms[0].id]))
      this.primaryList.forEach(element => {
        element.value ='';
      });
    },
    getDetailList() {
      this.detailList = JSON.parse(JSON.stringify(this.apply.instanceData.fields[  this.apply.instanceData.node.detailForms[0].id ]))
      this.detailList.forEach(element => {
        element.value ='';
      });
    },
    createThing(){
      let obj = {};
      this.detailList.forEach(element => {
          obj[element.id] = element.value
      });
      kernel.createThing(this.apply.belong.userId, [], '').then((res) => {
        if (res.success && res.data) {
          this.detailForm.after.push({ ...res.data, ...obj })
          this.addDetail = false;
        }
      });
    },
    async submitFrom(){
      let obj = {...JSON.parse(JSON.stringify(this.apply.instanceData))}
      let m ={};
      let id = this.apply.instanceData.node.detailForms[0].id;
      m[id] =  this.detailForm;
      obj.data = m;
      
      let primanyObj = {}

      this.primaryList.forEach(element => {
        primanyObj[element.id] = element.value;
      });

      obj.primary = primanyObj;
      console.log('obj',obj);
      const res = await kernel.createWorkInstance({
        ...this.apply.metadata,
        applyId: this.apply.belong.id,
        content: this.describe,
        contentType: 'Text',
        data: JSON.stringify(obj),
      });
      uni.showToast({
        title: '发起成功',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        uni.navigateBack({
          delta: 1
        })
      }, 1500);
      console.log('res',res);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  border-bottom: 1px solid #eee;
  height: 100rpx;
  line-height: 100rpx;
  .item-title {
    width: 100rpx;
    text-align: center;
    margin-right: 10rpx;
  }
}
.detail-head {
  display: flex;
  height: 100rpx;
  justify-content: space-between;
  padding: 0 20rpx;
  align-items: center;
  .detail-edit {
    display: flex;
    view {
      width: 120rpx;
      height: 60rpx;
      text-align: center;
      line-height: 60rpx;
      border-radius: 10rpx;
      background: #154ab8;
      color: #fff;
      margin-left: 15rpx;
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
.item-com{
  display:flex;
  align-items: center;
  .item-ipt{}
}
.dialog-foot {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9;
  margin-top: 30rpx;
  .dialog-nocheck {
    background: rgb(246, 57, 57);
    margin-right: 80rpx;
  }
  .dialog-passcheck {
    background: #154ad8;
  }
  .dialog-nocheck,
  .dialog-passcheck {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 32rpx;
    border-radius: 8rpx;
    text-align: center;
  }
}
.dialog-add {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;

  background: rgba(0, 0, 0, 0.2);
}
.dialog-box {
  width: 80%;
  position: absolute;
  left: 10%;
  top: 20%;
  border-radius: 10rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 20rpx;
  .item-com {
    display: flex;
    align-items: center;
    .item-ipt {
      border: 1px solid #eee;
      height: 40rpx;
      padding-left: 20rpx;
    }
  }
}
</style>
