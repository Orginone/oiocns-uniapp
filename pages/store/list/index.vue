<template>
  <view class="BaseLayout">
    <headbar :localList="'存储'" :left="'none'"></headbar>
    <storeList
      :listInfo="listInfo"
      :fileList="fileList"
      :icon="['dotPlus', 'right']"
      :url="'/pages/shop/page2/page2'"
    ></storeList>
  </view>
</template>

<script>
import * as config from "../../setting/config/menuOperate";
export default {
  data() {
    return {
      listInfo: [],
      fileList: [],
    };
  },
  async onLoad(option) {
    console.log("option", option);
    let res = await config.loadSettingMenu();
    let item = this.searchObjectByKey(res.children, "key", option.data);
    await item.item.loadFiles();
    let arrs = [];
    item.item.files.forEach((element) => {
      let obj = element.filedata;
      obj.id = element.metadata.id;
      arrs.push(obj);
    });
    this.fileList = arrs
    let arr = [];

    if(item.children.length ==0){
      item.item.children.forEach((element) => {
        let obj = {
          label: element.label ||element.name,
          key: element.key,
          id:element?.item?.id,
          itemType:element?.item?.metadata?.typeName || element?.metadata?.typeName,
          icon:element?.item?.share?.avatar?.thumbnail
        };
        arr.push(obj);
      });
    }else{
      item.children.forEach((element) => {
        let obj = {
          label: element.label||element.name,
          key: element.key,
          id:element?.item?.target?.id,
          itemType: element?.item?.target?.metadata?.typeName || element?.metadata?.typeName ,
          icon:element?.item?.share?.avatar?.thumbnail
        };
        arr.push(obj);
      });
    }
    this.listInfo = arr;
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
