<template>
  <view class="baseLayout">
    <headbar
      right
      :left="'more'"
      :url="'/pages/work/work'"
      last
      basic="办事"
    ></headbar>
    <view class="main">
      <selectBar @change="change" style="width: 100%"></selectBar>
      <view
        class="dealList"
        v-for="(item, index) in dealList"
        :key="index"
        @click="turnpage()"
      >
        <dealItem :itemInfo="item" :btn="false"></dealItem>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dealList: [],
    };
  },
  onLoad(options) {
    let data = JSON.parse(options.data);
    console.log(data);
    let arr = [];
    if (data.name == "待办事项" && data.data.WaitInfo) {
      data.data.WaitInfo.forEach((el) => {
        el.content = JSON.parse(el.content);
        let content = `${el.content[0].name}[${el.content[0].typeName}]申请加入${el.content[1].name}[${el.content[1].typeName}]`;
        arr.push({
          title: el.title,
          titleType: el.taskType,
          sub: content,
          type: el.status == 1 ? "待审批" : "已审批",
          workData: data,
          time: el.createTime,
          btn: true,
        });
      });
      this.dealList = arr;
    }
    if (data.name == "已办事项" && data.data.DoneInfo) {
      data.data.DoneInfo.forEach((el) => {
        el.task.content = JSON.parse(el.task.content);
        let content = `${el.task.content[0].name}[${el.task.content[0].typeName}]申请加入${el.task.content[1].name}[${el.task.content[1].typeName}]`;
        arr.push({
          title: el.task.title,
          titleType: el.task.taskType,
          sub: content,
          type: el.task.status == 1 ? "待审批" : "已同意",
          workData: data,
          time: el.task.createTime,
          btn: false,
        });
      });
      this.dealList = arr;
    }
  },
  methods: {
    //跳转
    turnpage() {
      return;
      uni.navigateTo({
        url:
          "/pages/work/page4/page4?data=" +
          JSON.stringify({ name: "资产处置" }),
      });
    },
    //获取选择菜单参数
    change(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dealList {
    margin-top: 20upx;
  }
}
</style>