<template>
  <view class="BaseLayout">
    <appHead :text="'存储'"></appHead>
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
      <showBox v-if="showPop" :showType="'store'" @childShow= childShow()></showBox>
    </view>
    <storeList
      :listInfo="menu"
      :listType="listType"
      model="1"
      :icon="['dotPlus', 'right']"
    ></storeList>
  </view>
</template>

<script>
import * as config from "../setting/config/menuOperate";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      menu: [],
      listType: "store",
      showType: "0",
      // 菜单导航
      showTag: false,
      showPop: false,
      tabnav: [],
    };
  },
  watch: {},
  onLoad() {
    this.getMenu();
  },
  onShow() {
    this.setSetting([{ name: "存储" }]);
    this.org_tag = uni.getStorageSync("org_tag");
    this.tabnav = this.org_tag.store.select;
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
    childShow(){
      this.showPop = false;
    },
    // 切换tag
    ontype(index) {
      this.showType = index.type;
    },
    async getMenu() {
      let res = await config.loadSettingMenu();
      // this.removeCircularReferences(res)
      console.log("res", res);
      let arr = [];
      res.children.forEach((element) => {
        let obj = {
          label: element.label,
          key: element.key,
          itemType: element.item.target.metadata.typeName,
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
</style>
