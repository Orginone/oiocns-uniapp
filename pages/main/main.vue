<template>
  <view class="index">
    <appHead :text='"门户"'></appHead>
    <view class="main">
      <!-- <appHead></appHead> -->
      <mainnav ref="tabnav" :tabnav="tabnav" @ontype_="ontype"></mainnav>
      <view class="more">
          <img src="../../static/base/menu.png" alt="">
      </view>
    </view>
    
  </view>
</template>

<script>
import { loadApps } from "./config/config";
export default {
  data() {
    return {
      // 线条宽度
      lineW: 10,
      // 是否固定
      fixed: false,
      // 菜单导航
      tabnav: [
        {
          type: '0', //状态值
          name: "动态",
          list: [], //数据
        },
        {
          type: "1", //状态值
          name: "共享软件",
          list: [], //数据
        },
        {
          type: "2", //状态值
          name: "公务仓",
          list: [], //数据
        },
        {
          type: "3", //状态值
          name: "公益仓",
          list: [], //数据
        },
        {
          type: "4", //状态值
          name: "数据资产",
          list: [], //数据
        },
      ],
    };
  },
  components: {
    
  },
  async onLoad(options) {
    this.userInfo = uni.getStorageSync("currentUser");
    // console.log(this.userInfo,7777);
    this.loadAppList();
    // let params = {
    //   id:this.userInfo.id,
    //   page:{offset:1,limit:999,filter:""},
    //   typeNames:['单位','大学','医院']
    // }
    // let res = await kernelApi.queryJoinedTargetById(params)
    // console.log(res)
    // let searchParams = {id:this.userInfo.id,page:{offset:1,limit:999,filter:""}}
    // let done =  await kernelApi.queryWorkRecord(searchParams) //查询已办
    // console.log(done,'done')
    // let todo =  await kernelApi.queryApproveTask(searchParams) //待办
    // console.log(todo,'todo')
    // // let post =  await kernelApi.queryMyWorkInstance(searchParams) //我发起的办事
    // let over =  await kernelApi.queryMyWorkInstance(searchParams) //审批通过
    // console.log(over,'over')
  },
  methods: {
    async loadAppList() {
      let arr = [];
      setTimeout(async () => {
        let res = await loadApps();
        res.forEach((item) => {
          item.metadata.icon = JSON.parse(item.metadata.icon);
          arr.push(item.metadata);
        });
        this.appList = arr;
      }, 1000);
    },
    jump() {
      uni.switchTab({
        url: "/pages/setting/index",
      });
    },
    jumosys() {
      uni.navigateTo({
        url: "/pages/setting/scanCode/index",
      });
    },
    //下拉选项打开时
    openEvent() {
      this.isShowMask = true;
    },
    closeEvent() {
      this.isShowMask = false;
    },
    ontype(index){
      console.log(index)
    },
    handle(item, index) {
      this.isShowMask = false;
      this.mode = item.value;
      if (item.value == "newCohort" || item.value == "newCompany") {
        this.isShow2 = true;
      } else {
        this.isShow = true;
      }
    },

    uploadPop(index) {
      if (index == 1) {
        this.isShow = false;
      } else {
        this.isShow2 = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .main{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15upx;
    .more{
      width:48rpx;
      height: 48rpx;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>