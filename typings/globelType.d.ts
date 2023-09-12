import { ICompany } from '@/ts/core';

interface DataType {
  [key: string]: any;
}

type PageShowType = 'table' | 'card'; //数据页面展示形式 表格 / 卡片

/**
 * 前端业务分页结果的数据类型
 */
export type PageData<T> = {
  success: boolean;
  total: number;
  data: T[];
  msg?: string;
};

interface MenuItemType {
  item?: any;
  key: string;
  label: string;
  menuType?: string;
  checked?: boolean;
  itemType: string;
  count?: number;
  tag?: string[];
  icon?: any;
  expIcon?: any;
  menus?: OperateMenuType[];
  children: MenuItemType[];
  parentMenu?: MenuItemType;
  company?: ICompany;
  beforeLoad?: () => Promise<void>;
}

interface OperateMenuType {
  key: string;
  label: string;
  model?: string;
  children?: OperateMenuType[];
  icon: any;
  beforeLoad?: () => Promise<boolean>;
}
