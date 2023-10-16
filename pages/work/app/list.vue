<template>
  <view>
    <appHead :text="'办事'"></appHead>
    <view class="myList">
      <lostPage v-show="!list.length" mode="noContent"></lostPage>
      <view v-show="list.length" class="thing-list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="jumpApp(item)"
        >
          <view class="left">
            <view class="box"></view>
            <view class="item-title">{{ item.name }}</view>
          </view>
          <view class="item-time">{{ item.createTime }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import orgCtrl from "@/ts/controller";

export default {
  data() {
    return {
      menu: [],
      key:'',//上级的key
      list: [], //待办
    };
  },
  onLoad(options) {
    this.key = options.key;
    this.getList();
  },
  onShow() {},
  methods: {
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
    childShow() {
      this.showPop = false;
    },
    //我发起的
    async getList() {
      let apps = [];
      for (const target of orgCtrl.targets) {
        apps.push(...(await target.directory.loadAllApplication()));
      }
      console.log(apps,this.key);

      apps.forEach(element => {
        if(element.key == this.key){
          element.children.forEach(elx => {
              this.list.push(elx._metadata)
          });
        }
      });
    },
    async jumpApp(item) {
      apps.forEach((element) => {
        console.log("element", element);
        if (item.id == element._metadata.id) {
          if (element.children.length > 0) {
            uni.navigateTo({
              url: "/pages/work/app/list?key=" + item.key,
            });
          } else {
            uni.navigateTo({
              url: "/pages/work/app/workList?key=" + item.id,
            });
          }
        }
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
