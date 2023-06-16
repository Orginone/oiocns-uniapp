<template>
  <view class="BaseLayout">
    <headbar :localList="'设置'" :left="'none'"></headbar>
    <personList :listInfo="menu" :icon="['dotPlus', 'right']" ></personList>
  </view>
</template>

<script>
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
                let json = {}
                json.memberTypes = value?.memberTypes
                json.metadata = value?.metadata
                json.members = value?.members
                json.belong = value?.belong
                json.id = value?.id
                json.creater = value?.creater
                for (const key in json.members) {
                  if (Object.hasOwnProperty.call(json.members, key)) {
                   json.members[key].icon = ""
                  }
                }
                currentObj[key] = json;
                // console.log('json',json)
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
      // console.log('setting', JSON.parse(JSON.stringify(res)))
      console.log('res',res)
      let arr = []
      res.children.forEach(element => {
         let obj = {
          label:element.label,
          itemType:element.itemType,
          key:element.key
         }
         arr.push(obj)
      });
      // store.setting = res;
      this.menu = arr;
      // this.showMenu = true;
      // console.log(res,'res')
    },
  },
};
</script>

<style lang="scss" scoped></style>
