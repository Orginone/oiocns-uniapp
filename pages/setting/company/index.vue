<template>
  <view class="BaseLayout">
    <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
    <!-- <treeCom :trees="listInfo"></treeCom>		 -->
    <personList
      :listInfo="listInfo"
      icon="['dotPlus', 'right']"
      :localList="'仓库'"
      :url="'/pages/shop/page2/page2'"
    ></personList>
  </view>
</template>

<script>
import treeCom from "../tree/index";
export default {
  components: {
    treeCom,
  },
  data() {
    return {
      listInfo: [
        {
          label: "组织详情",
          url: "pages/setting/company/detail",
          key: "",
          children: [],
        },
        {
          label: "权限标准",
          url: "/pages/setting/tree/index",
          key: "",
          children: [],
        },
        {
          label: "数据标准",
          key: "",
          children: [],
          url: "/pages/setting/tree/index",
        },
        {
          label: "内部机构",
          url: "/pages/setting/tree/index",
          key: "",
          children: [],
        },
        {
          label: "组织集群",
          url: "/pages/setting/orgGroup/index",
          key: "",
          children: [],
        },
        {
          label: "单位岗位",
          url: "/pages/setting/agency/agency",
          key: "",
          children: [],
        },
        {
          label: "外部群组",
          key: "",
          children: [],
          url: "/pages/setting/group/index",
        },
      ],
    };
  },
  watch: {},
  onLoad(option) {
    let options = this.$store.setting;
    let key = JSON.parse(option.data);
    let newOptions = options?.children.find((item) => item.key === key);
    newOptions?.children.forEach((element) => {
      this.listInfo.forEach((item) => {
        if (element.label == item.label) {
          item.children = element.children;
          item.key = element.key;
        } else {
          item.itemType == newOptions.itemType;
          item.key = newOptions.key;
        }
      });
    });
    console.log(this.listInfo, "999");
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
