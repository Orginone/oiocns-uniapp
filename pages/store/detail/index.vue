<template>
  <view class="BaseLayout">
    <headbar></headbar>
    <storeList :listInfo="menu" :listType='"store"' :icon="['dotPlus', 'right']" ></storeList>
  </view>
</template>

<script>
import * as config from "../../setting/config/menuOperate";
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      menu: [],
	  listType:'',
    };
  },
  watch: {},
  onLoad() {
    this.getMenu();
  },
  onShow() {
    this.setSetting([{name:'设置'}]);
  },
  methods: {
     ...mapMutations(['setSetting']),
    async getMenu() {
      let res = await config.loadSettingMenu();
      // this.removeCircularReferences(res)
      console.log('res',res);
      let arr = []
      res.children.forEach(element => {
         let obj = {
          label:element.label,
          key:element.key
         }
         arr.push(obj)
      });
      // store.setting = res;
      this.menu = arr;
      console.log('this.menu', this.menu);
      // this.showMenu = true;
      // console.log(res,'res')
    },
  },
};
</script>

<style lang="scss" scoped></style>
