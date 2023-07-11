<template>
  <view class="BaseLayout">
    <headbar :localList="'存储'" :left="'none'"></headbar>
    <personList
      :listInfo="listInfo"
      :icon="['dotPlus', 'right']"
      :url="'/pages/shop/page2/page2'"
    ></personList>
  </view>
</template>

<script>
import * as config from "../../setting/config/menuOperate";
export default {
  data() {
    return {
      listInfo: [],
    };
  },
  async onLoad(option) {
    console.log("option", option);
    let res = await config.loadSettingMenu();
    let list = this.searchObjectByKey(res.children, "key", option.data);
    console.log('list',list)
    let rex = await list.item.loadContent(1);
      console.log('rex',rex);
    // this.listInfo = arr;
  },
  watch: {},
  methods: {
    searchObjectByKey(obj, key, value) {
      if (key === "icon") {
        obj[key] = "";
      }

      let queue = [obj];

      while (queue.length > 0) {
        let currentObj = queue.shift();

        if (currentObj.hasOwnProperty(key) && currentObj[key] === value) {
          return currentObj;
        }

        for (let prop in currentObj) {
          if (
            currentObj.hasOwnProperty(prop) &&
            typeof currentObj[prop] === "object"
          ) {
            queue.push(currentObj[prop]);
          }
        }
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
