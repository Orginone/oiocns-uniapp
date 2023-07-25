/** 组织图标 */
const EntityIcon = (info: any) => {
  switch (info) {
    case "目录":
      return "../../static/base/folder-fill.png";
    case "单位":
      return "../../static/base/office.png";
    case "人员":
      return "../../static/base/user-tie.png";
    case "群组":
      return "../../static/base/chat.png";
    default:
      return "";
  }
};

export default EntityIcon;
