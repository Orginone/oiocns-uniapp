<template>
  <view class="BaseLayout">
    <headbar :localList="'关系,浙江省财政厅'" :left="'none'"></headbar>
    <personList :listInfo="menu" :icon="['dotPlus', 'right']" ></personList>
  </view>
</template>

<script>
import store from "@/store/index.js"; //需要引入store
import * as config from "./config/menuOperate";
export default {
  data() {
    return {
      menu: [],
    };
  },
  watch: {},
  onLoad() {
    this.getMenu();
  },
  methods: {
    removeCircularReferences(obj) {
      const queue = [obj];
      const visited = new Set();
      visited.add(obj);

      while (queue.length > 0) {
        const currentObj = queue.shift();

        for (let key in currentObj) {
          if (currentObj.hasOwnProperty(key)) {
            const value = currentObj[key];

            if (typeof value === "object" && value !== null) {
              if (visited.has(value)) {
                // 如果该对象已经被访问过，则表示存在循环引用
                currentObj[key] = null;
              } else {
                queue.push(value); // 将该对象加入队列中
                visited.add(value); // 将该对象加入已访问列表中
              }
            }
          }
        }
      }
    },
    async getMenu() {
      let res = await config.loadSettingMenu();
      this.removeCircularReferences(res)
      store.setting = res;
      this.menu = res.children;
      this.showMenu = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
