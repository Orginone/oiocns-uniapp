<template>
	<view>
		<headbar   :left="'more'" :url="'back'" right basic="办事"></headbar>
		<personList :listInfo='listInfo' :title="'个人'"  :localList="'办事'" :url="url"></personList>
		<personList :listInfo='listInfo2' :title="'组织'" :localList="'办事'"  :url="url"> ></personList>
	</view>
</template>
<script>
import { kernelApi, storage} from "common/app";
import {loadCohorts} from 'common/person'
export default {
  data() {
    return {
      url: "/pages/work/page2/page2",
      listInfo: [
        {
          name: "发起办事",
		  url:'/pages/work/page5/page5'
        },
        {
          name: "待办事项",
        },
        {
          name: "已办事项",
        },
        {
          name: "我发起的",
        },
      ],
      listInfo2: [
        {
          name: "杭州电子科技大学",
        },
        {
          name: "浙江省财政厅",
        },
        {
          name: "浙江省教育局",
        },
      ],
      userInfo: {},
    };
  },
  async onLoad(options) {
    this.userInfo = storage.getItem("currentUser"); 
    let res = await loadCohorts(this.userInfo.id)
    this.listInfo2 = res.data.result
    console.log(res);
	
  },
};
</script>

<style lang="scss" scoped>
</style>
