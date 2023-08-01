import { IBelong } from "../../../ts/core";
import { MenuItemType } from "../../../typings/globelType";
import orgCtrl from "../../../ts/controller";
import { GroupMenuType } from "./menuType";

const createSpaceMenu = (team: IBelong) => {
  return {
    key: team.key,
    item: team,
    label: team.name,
    itemType: team.typeName,
    menus: [],
    icon: "",
    children: [
      {
        key: team.key + GroupMenuType.Todo,
        item: team,
        label: GroupMenuType.Todo,
        itemType: GroupMenuType.Todo,
        icon: "",
        expIcon: "",
        menus: [],
        children: [],
      },
      {
        key: team.key + GroupMenuType.Done,
        item: team,
        label: GroupMenuType.Done,
        itemType: GroupMenuType.Done,
        icon: "",
        expIcon: "",
        menus: [],
        children: [],
      },
      {
        key: team.key + GroupMenuType.Apply,
        item: team,
        label: GroupMenuType.Apply,
        itemType: GroupMenuType.Apply,
        icon: "",
        expIcon: "",
        menus: [],
        children: [],
      },
    ],
  };
};

export const loadWorkMenu = (): MenuItemType => {
  return {
    key: "办事",
    label: "办事",
    itemType: "Tab",
    icon: '',
    children: [orgCtrl.user, ...orgCtrl.user.companys].map((a) =>
      createSpaceMenu(a)
    ),
  };
};
