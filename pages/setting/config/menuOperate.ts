import orgCtrl from '../../../ts/controller';
import { MenuItemType } from '../../../typings/globelType';
import { loadFileMenus } from '../../../executor/fileOperate';
import { IDepartment, IGroup, ITarget, IDirectory } from '../../../ts/core';

/** 创建团队菜单 */
const createMenu = (target: ITarget, children: MenuItemType[]) => {
  return {
    key: target.directory.key,
    item: target.directory,
    label: target.name,
    itemType: target.directory.typeName,
    menus: loadFileMenus(target.directory, 2),
    tag: [target.typeName],
    icon: '',
    children: children,
    beforeLoad: async () => {
      await target.loadContent();
    },
  };
};
/** 编译部门树 */
const buildDepartmentTree = (departments: IDepartment[]): MenuItemType[] => {
  return departments.map((item) =>
    createMenu(item, [
      ...buildDirectoryTree(item.directory.children),
      ...buildDepartmentTree(item.children),
    ]),
  );
};
/** 编译组织集群树 */
const buildGroupTree = (groups: IGroup[]): MenuItemType[] => {
  return groups.map((item) =>
    createMenu(item, [
      ...buildDirectoryTree(item.directory.children),
      ...buildGroupTree(item.children),
    ]),
  );
};

/** 编译目录树 */
const buildDirectoryTree = (directorys: IDirectory[]): MenuItemType[] => {
  return directorys.map((directory) => {
    return {
      key: directory.key,
      item: directory,
      label: directory.name,
      tag: [directory.typeName],
      icon: '',
      itemType: directory.typeName,
      menus: loadFileMenus(directory, 2),
      children: buildDirectoryTree(directory.children),
      beforeLoad: async () => {
        await directory.loadContent();
      },
    };
  });
};

/** 获取个人菜单 */
const getUserMenu = () => {
  return createMenu(orgCtrl.user, [
    ...buildDirectoryTree(orgCtrl.user.directory.children),
    ...orgCtrl.user.cohorts.map((i) =>
      createMenu(i, buildDirectoryTree(i.directory.children)),
    ),
  ]);
};

/** 获取组织菜单 */
const getTeamMenu = () => {
  const children: MenuItemType[] = [];
  for (const company of orgCtrl.user.companys) {
    children.push(
      createMenu(company, [
        ...buildDirectoryTree(company.directory.children),
        ...buildDepartmentTree(company.departments),
        ...buildGroupTree(company.groups),
        ...company.cohorts.map((i) =>
          createMenu(i, buildDirectoryTree(i.directory.children)),
        ),
      ]),
    );
  }
  return children;
};

/** 加载设置模块菜单 */
export const loadSettingMenu = (() => {
  let settingMenu:any = null;
  return () => {
    // if (settingMenu !== null) {
    //   return settingMenu;
    // }
    settingMenu = {
      key: '设置',
      label: '设置',
      itemType: 'Tab',
      children: [getUserMenu(), ...getTeamMenu()],
      icon: '',
    };
    return settingMenu;
  };
})();