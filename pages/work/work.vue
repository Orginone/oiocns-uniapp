<template>
  <view>
    <appHead :text="'办事'"></appHead>
    <view class="main">
      <mainTag
        ref="mainTag"
        v-if="showTag"
        :tabnav="tabnav"
        @ontype_="ontype"
      ></mainTag>
      <view class="more">
        <img src="../../static/base/menu.png" @click="showPop = true" alt="" />
      </view>
      <showBox
        v-if="showPop"
        :showType="'work'"
        @childShow="childShow()"
      ></showBox>
    </view>
    <workList
      v-show="showType == '全部'"
      :listInfo="menu"
      :listType="listType"
      model="1"
      :icon="['dotPlus', 'right']"
    ></workList>
    <view class="myList" v-if="workMyShow.includes(showType)">
      <lostPage v-show="!list.length" mode="noContent"></lostPage>
      <view v-show="list.length" class="thing-list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="jumpDetail(item)"
        >
          <view class="left">
            <view class="box"></view>
            <view class="item-title">{{ item.title }}</view>
          </view>
          <view class="item-time">{{ item.createTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { WaitInfo, loadSpecies } from "common/person";
import * as config from "./config/menuOperate";
import { mapState, mapMutations } from "vuex";
import { anyStoreApi } from "../../common/app";

export default {
  data() {
    return {
      menu: [],
      list: [],
      showType: "全部",
      workMyShow: ["待办", "已办", "发起", "已发起"],
      showTag: false,
      tabnav: [],
      showPop: false,
      userInfo: {},
    };
  },
  onLoad() {
    this.getMenu();
  },
  onShow() {
    this.org_tag = uni.getStorageSync("org_tag");
    this.tabnav = this.org_tag.work.select;
    this.showTag = true;
  },
  methods: {
    ...mapMutations(["setSetting"]),
    removeCircularReferences(obj) {
      const queue = [obj];
      const visited = new Set();
      visited.add(obj);
      let flag = 0;
      while (queue.length > 0) {
        const currentObj = queue.shift();

        for (let key in currentObj) {
          if (currentObj.hasOwnProperty(key)) {
            const value = currentObj[key];

            if (typeof value === "object" && value !== null) {
              if (visited.has(value)) {
                // 如果该对象已经被访问过，则表示存在循环引用
                let json = {};
                json.memberTypes = value?.memberTypes;
                json.metadata = value?.metadata;
                json.members = value?.members;
                json.belong = value?.belong;
                json.id = value?.id;
                json.creater = value?.creater;
                json.target = value?.target;
                json.targets = value?.targets;

                for (const key in json.members) {
                  if (Object.hasOwnProperty.call(json.members, key)) {
                    json.members[key].icon = "";
                  }
                }
                currentObj[key] = json;
              } else {
                queue.push(value); // 将该对象加入队列中
                visited.add(value); // 将该对象加入已访问列表中
              }
            }
          }
        }
      }
    },
    ontype(index) {
      this.showType = index;
      this.userInfo = uni.getStorageSync("currentUser");
      this.tabnav = this.org_tag.work.select;
      this.showTag = true;
      let data = this.userInfo.id;
      this.id = this.userInfo.id;
      // this.getWaitInfo();
      this.baseInfo = data;
      if (this.showType == "待办") {
        this.getWaitInfo();
      } else if (this.showType == "已办") {
        this.getDoneInfo();
      } else if (this.showType == "已发起") {
        this.getMyInfo();
      } else if (this.showType == "发起") {
        this.getStartInfo();
      }
    },
    childShow() {
      this.showPop = false;
    },
    async getMenu() {
      let res = await config.loadWorkMenu();
      // this.removeCircularReferences(res)
      console.log("res", res);
      let arr = [];
      res.children.forEach((element) => {
        let obj = {
          label: element.label,
          key: element.key,
          id: element.item.id,
          itemType: element.item.typeName,
          icon: element?.item?.share?.avatar?.thumbnail,
        };
        arr.push(obj);
      });
      // store.setting = res;
      this.menu = arr;
      console.log("this.menu", this.menu);
      // this.showMenu = true;
      // console.log(res,'res')
    },
    async getInfo(data, infoType) {
      const hisWorkCollName = "work-task";
      console.log("data", data);
      if (infoType == "Done") {
        return await anyStoreApi.aggregate(data.id, hisWorkCollName, {
          match: {
            belongId: data.belongId,
            status: { _gte_: 100 },
            records: { _exists_: true },
          },
          sort: {
            createTime: -1,
          },
          skip: 0,
          limit: 20,
        });
      } else if (infoType == "myInfo") {
        return await anyStoreApi.aggregate(data.id, hisWorkCollName, {
          match: {
            belongId: data.belongId,
            createUser: data.belongId,
            nodeId: { _exists_: false },
          },
          sort: {
            createTime: -1,
          },
          skip: 0,
          limit: 20,
        });
      } else {
      }
    },
    // 发起办事
    async getStartInfo() {
      let params = this.userInfo.id;
      let res = await loadSpecies(this.id);
      console.log(res, "办事列表");
      this.list = res.data;
      // this.baseInfo.StartInfo = res.data.result
      // this.listInfo1[0].data = this.baseInfo

      // let resNode = await loadWorkNode(params)
      // let resWorkNode = await loadWorkDefines(params)
      // console.log(resWorkNode, '');
    },
    //待办事项
    async getWaitInfo() {
      let res = await WaitInfo(this.id);
      console.log(res, "待办事项");
      if (res.data.result) {
        this.list = res.data?.result;
      }
      // this.baseInfo.WaitInfo = res.data.result
      // this.listInfo1[1].data = this.baseInfo
    },

    //已办事项
    async getDoneInfo() {
      let res = await this.getInfo(
        {
          id: this.id,
          belongId: this.id,
        },
        "Done"
      );
      this.list = res.data;
      // this.baseInfo.DoneInfo = res.data.result
      // this.listInfo1[2].data = this.baseInfo
      console.log(res, "已办事项");
    },
    //我发起的
    async getMyInfo() {
      let res = await this.getInfo(
        {
          id: this.id,
          createUser: this.id,
          belongId: this.id,
        },
        "myInfo"
      );
      this.list = res.data;
      // this.baseInfo.MyInfo = res.data
      // this.listInfo1[3].data = this.baseInfo
      console.log(res, "我发起的");
    },
    jumpDetail(item) {
      uni.navigateTo({
        url:
          "/pages/work/detail/detail?belongId=" +
          item.belongId +
          "&instanceId=" +
          item.instanceId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  padding: 15rpx;
  .more {
    width: 48rpx;
    height: 48rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.myList {
  .item {
    height: 120rpx;
    border-bottom: 1px solid #eee;
    padding: 15rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .box {
        width: 72rpx;
        height: 72rpx;
        background: #154ab8;
        margin-right: 20rpx;
        border-radius: 8rpx;
      }
    }
    .item-title {
      font-size: 32rpx;
      color: #333;
    }
  }
}
</style>
