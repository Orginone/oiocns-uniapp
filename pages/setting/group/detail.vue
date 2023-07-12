<template>
  <view class="BaseLayout">
    <headbar></headbar>
    <view class="main">
      <basicForm :formData="datalist" :title="title"></basicForm>
      <!-- 子表信息 -->
      <view class="formArea">
        <view class="head">
          <view class="title">群组成员</view>
          <button class="search-btn" @click="addTeam">添加</button>
        </view>
        <view class="item">
          <uni-table>
            <uni-tr>
              <uni-th
                v-for="(item, index) in formTitle"
                :key="index"
                style="color: #333; font-weight: normal"
                >{{ item.name }}</uni-th
              >
            </uni-tr>
            <uni-tr v-for="(item, index) in formList" :key="index">
              <uni-td
                v-for="(it, ind) in Object.values(item)"
                :key="ind"
                style="color: #9a9a9a"
                >{{ it }}</uni-td
              >
            </uni-tr>
          </uni-table>
          <view class="more" v-if="formTitle.length > 0" @click="getMore"
            >更多</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import * as config from "../config/menuOperate";
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      datalist: [
        {
          name: "群组名称",
          key: "name",
          value: "",
        },
        {
          name: "群组代码",
          key: "code",
          value: "",
        },
        {
          name: "团队简称",
          key: "public",
          value: "",
        },
        {
          name: "团队标识",
          key: "belongName",
          value: "",
        },
        {
          name: "创建人",
          key: "creater",
          value: "",
        },
        {
          name: "创建时间",
          key: "createTime",
          value: "",
        },
        {
          name: "简介",
          key: "remark",
          value: "",
        },
      ],
      itemData: {},
      groupList: [],
      formTitle: [
        {
          name: "账号",
          value: "code",
        },
        {
          name: "昵称",
          value: "name",
        },
        {
          name: "姓名",
          value: "name",
        },
        {
          name: "手机号",
          value: "code",
        },
        {
          name: "签名",
          value: "remark",
        },
      ],
      formList: [],
      title: "",
      type: "",
      groupId: "", //群组id
    };
  },
  watch: {},
  async onLoad(option) {
    console.log("detail", option);
    let key = option.key;
    let res = await config.loadSettingMenu();
    this.findObject(res.children, key);
    this.keyFindid(res.children, key);
  },
  methods: {
	...mapMutations(['pushSetting']),
    findObject(arr, key) {
      let that = this;
      if (arr && arr.length > 0) {
        arr.forEach(async (element) => {
          element.directory = null;
          element.item.directory = null;
          element.item.space = null;
          if (element.key == key) {
            let res =  await element.item.loadContent(1);
            console.log("111", res)
            console.log("element", element.item.content());
            that.dataCompare(element, element.item.content());
            // return
          }
          if (element.children && element.children.length > 0) {
            that.findObject(element.children, key);
          }
        });
      }
    },
    keyFindid(arr, key) {
      let that = this;
      if (arr && arr.length > 0) {
        arr.forEach((element) => {
          if (element.key == key) {
            that.groupId = element.item.id;
          }
          if (element.children && element.children.length > 0) {
            this.keyFindid(element.children, key);
          }
        });
      }
    },
    dataCompare(formData, list) {
      this.title =
        this.type + "[" + formData?.item?._metadata.name + "]基本信息";
      this.datalist[0].value = formData.item._metadata.name;
      this.datalist[1].value = formData?.item?._metadata.code;
      this.datalist[2].value = formData?.item?._metadata.name;
      this.datalist[3].value = formData?.item?._metadata.code;
      this.datalist[4].value = formData?.item?._metadata.belong.name;
      this.datalist[5].value =
        formData?.item?._metadata.belong.updateTime.slice(0, 10);
      this.datalist[6].value = formData?.item?._metadata.remark;
      let arr = [];
      list.forEach((item) => {
        let json = {};
        json.code = item._metadata.code;
        json.name = item._metadata.name;
        json.remark = item._metadata.remark;
        arr.push(json);
      });
      this.formList = arr;
    },
    addTeam() {
      uni.navigateTo({
        url: "/pages/setting/group/addPerson?groupId=" + this.groupId,
      });
    },
    getMore() {
      uni.navigateTo({
        url:
          "/pages/setting/agency/detail" +
          "?data=" +
          encodeURIComponent(JSON.stringify(this.formList)),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 22upx;
  padding-bottom: 40upx;
}
.more {
  width: 100%;
  display: flex;
  font-size: 24upx;
  justify-content: flex-end;
}
.head {
  display: flex;
  .title {
    flex: 1;
    margin-right: 20upx;
    line-height: 60upx;
  }
}
.search-btn {
  background: #096dd9;
  color: #fff;
  border-radius: 10upx;
  height: 60upx;
  line-height: 60upx;
  margin-right: 20upx;
  font-size: 24upx;
}
</style>
