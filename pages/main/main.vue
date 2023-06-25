<template>
  <view class="index" @click.stop="closeEvent">
    <view class="tabBox">
      <view class="leftBox" @click="jump">
        <img src="../../static/base/setting.png" alt="" class="leftBoxSrc" />
      </view>
      <view class="rightBox">
        <img src="../../static/base/search2.png" alt="" class="rightBoxSrc"/>
        <img src="../../static/base/add.png" alt="" class="rightBoxSrc" @click.stop="openEvent" />
        <!-- <img src="../../static/base/dotPlus.png" alt="" class="dotPlusSrc"/> -->
        <view class="more">
          <view class="more_point"></view>
          <view class="more_point"></view>
          <view class="more_point"></view>
        </view>
        <view class="menu-box" v-show="isShowMask == true">
          <div class="menu-item" v-for="(item,index) in menuList" :key="index" @click.stop="handle(item,index)">
            <view class="item_btn">+</view>
            <view class="item_name">{{item.name}}</view>
          </div>
        </view>
      </view>
    </view>
    <!-- <view class="userInfo">
      <view class="userInfo_unit">
        <view class="userInfo_unit_fristName">{{
          userInfo.name?userInfo.name.substring(0, 1):''
        }}</view>
        <view class="userInfo_unit_name">{{ userInfo.name }}</view>
      </view>
      <view class="userInfo_img">
        <img :src="userInfo.userImg" alt="" srcset="" />
      </view>
    </view> -->
    <!-- <view class="topTab">
      <view class="topTab_box">
        <view class="topTab_item" v-for="(item, index) in tabList" :key="index" @click="tabActive=index">
          {{ item.name }}
          <view :class="tabActive==index?'topTab_item_line':''"></view>
        </view>
      </view>

      <view class="more">
        <view class="more_point"></view>
        <view class="more_point"></view>
        <view class="more_point"></view>
      </view>
    </view> -->
    <view class="banner">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-color='color' :easing-function="'easeInOutCubic'">  
        <swiper-item v-for="(item,index) in imgList" :key="index">  
          <view class='li'>
            <img :src="'../../static/banner/' + item + '.png'" class="itemSrc" />
          </view> 
        </swiper-item>  
      </swiper> 
    </view>
	  <view class="link">
      <linkBox @handle="handle"></linkBox>
    </view>
    <view class="mune inlet">
      <userApp :appList="appList"></userApp>
	  </view>
    <popBox :show="isShow" :mode="mode" @uploadPop="uploadPop"/>
  </view>
</template>

<script>
import popBox from './components/pop';
import { loadApps } from './config/config';
export default {
  data() {
    return {
      userInfo: {
        unit: "数据治理实验平台",
        userImg:
          "https://img.haote.com/upload/news/20190817/156601001342100.jpeg",
      },
      tabList: [
        { name: "首页" },
        { name: "工作台" },
        { name: "看板" },
        { name: "新闻" },
        { name: "共享" },
        { name: "交易" },
      ],
	    indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      imgList:[1],
      color:"#fff",
      tabActive:0,
      todoList:[{name:'待办',number:''},{name:'已办',number:0},{name:'已完结',number:0},{name:'我发起的',number:0},],
      appList:[],
      isShowMask:false,
      menuList:[{name:'添加朋友',value:'joinFriend'},{name:'加入群组',value:'joinCohort'},{name:'加入单位组织',value:'joinCompany'},{name:'发起群聊'}],
      isShow:false,
      mode:''
    };
  },
  components:{
    popBox
  },
  async onLoad(options) {
    this.userInfo = uni.getStorageSync('currentUser')
    // console.log(this.userInfo,7777);
    this.loadAppList()
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
  methods:{
    async loadAppList(){
      let arr = []
      setTimeout(async()=>{
        let res = await loadApps()
        res.forEach(item => {
          item.metadata.icon = JSON.parse(item.metadata.icon)
          arr.push(item.metadata)
        })
        this.appList = arr
      },1000)
    },
    jump(){
      uni.switchTab({
        url: '/pages/setting/index'
      })
    },
    //下拉选项打开时
    openEvent(){
			this.isShowMask = true;
		},
    closeEvent(){
      this.isShowMask = false;
    },

    handle(item,index){
      this.mode = item.value
      this.isShowMask = false;
      this.isShow = true
    },
    
    uploadPop(){
      this.isShow = false
    }
  }
};
</script>

<style lang="scss" scope>
page {
  background: #fff;
  .index {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
	  padding-bottom: 20upx;
    .tabBox{
      width: 100%;
      padding: 10upx 32upx;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .leftBoxSrc{
        width: 62upx;
        height: 62upx;
        border-radius: 50%;
        display: block;
      }
      .rightBox{
        display: flex;
        align-items: center;
        position: relative;
        .rightBoxSrc{
          width: 36upx;
          height: 36upx;
          display: block;
          margin-right:20upx;
        }
        .more {
          margin-top: 12upx;
          padding-left: 10upx;
          .more_point {
            width: 6upx;
            height: 6upx;
            background: rgba(89,90,92,1.0);
            border-radius: 50%;
            margin-bottom: 8upx;
          }
        }
        .dotPlusSrc{
          width: 10upx;
          height: 36upx;
        }
      }
    }
    .userInfo {
      width: 100%;
      padding: 20upx 32upx;
      background: #3d5ed1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userInfo_unit {
        display: flex;
        align-items: center;
        .userInfo_unit_fristName {
          width: 62upx;
          height: 62upx;
          border-radius: 50%;
          background: #fff;
          font-size: 28upx;
          color: #3d5ed1;
          text-align: center;
          line-height: 62upx;
        }
        .userInfo_unit_name {
          font-size: 30upx;
          color: #ffffff;
          margin-left: 14upx;
        }
      }
      .userInfo_img {
        width: 62upx;
        height: 62upx;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .topTab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #3d5ed1;
      padding: 26upx 0;
	    padding-bottom: 0;
      .more {
        padding-right: 26upx;
        .more_point {
          width: 4upx;
          height: 4upx;
          background: #ffffff;
          border-radius: 50%;
          margin-bottom: 4upx;
        }
      }
      .topTab_box {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
      .topTab_item {
        padding: 0 26upx;
        font-size: 22upx;
        color: #ffffff;
        text-align: center;
        .topTab_item_line{
          width: 36upx;
          height: 4upx;
          background: #FFFFFF;
          opacity: 1;
          margin: 0 auto;
          margin-top: 13upx;
        }
      }
    }
    .banner{
      width: 100%;
      height: 300upx;
      .swiper{
        width: 100%;
        height: 300upx;
      }
      .swiper_item{
        width: 100%;
        height: 300upx;
        img{
          width: 100%;
          height: 300upx;
        }
      }
    }
    .link{
      width: 100%;
      padding: 0 0 0 32upx;
      margin-top: 22upx;
    }
    .inlet{
      width: 100%;
      padding: 0 32upx;
      margin-top: 22upx;
    }
  }
  .li{
    width: 100%;
    height: 300upx;
  }
  .itemSrc{
    width: 100%;
    height: 300upx;
    display: block;
    margin: 0 auto;
    border-radius: 12rpx;
  }
  .menu-box{
    position: absolute;
    top: 60upx;
    right: 10upx;
    width: 360upx;
    height: 320upx;
    background: rgba(76,76,76,1);
    border-radius: 16upx;
    z-index: 999;
    :before {
      content: "";
      width: 0px;
      height: 0px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid rgba(76,76,76,1);
      position: absolute;
      top: -5px;
      right: 16px;
    }
    .menu-item{
      width: 100%;
      padding: 4upx 60upx;
      display: flex;
      align-items: center;
      .item_btn{
        font-size: 50upx;
        color: #fff;
        text-align: center;
        margin-top: 0rpx;
        margin-bottom: 6rpx
      }
      .item_name{
        font-size: 28upx; 
        text-align: center;
        color:#fff;
        margin-left: 16upx;
      }
    }
  }
}
</style>
