import { OperateType, TargetType } from "./enums";
import { kernel } from "../ts/base";
import { PageAll } from "./consts";

//获取组织单位列表
const loadCohorts = async (data: any) => {
  return await kernel.queryJoinedTargetById({
    id: data,
    typeNames: [TargetType.Company, TargetType.Hospital, TargetType.University],
    page: PageAll,
  });
};

//我发起的
const MyInfo = async (data: any) => {
  return await kernel.queryMyApply({
    id: data,
    page: PageAll,
  });
};

//待办事项
const WaitInfo = async (data: any) => {
  return await kernel.queryApproveTask({
    id: data,
    // page: PageAll,
  });
};

//已办事项
const DoneInfo = async (data: any) => {
  return await kernel.queryWorkRecord({
    id: data,
    page: PageAll,
  });
};

//树
const loadSpecies = async (data: any) => {
  return await kernel.querySpecies({
    id: data,
    page: PageAll,
  });
};

//办事节点
const loadWorkNode = async (data: any) => {
  return await kernel.queryWorkNodes({
    id: data.belongId,
  });
};

//加载办事
const loadWorkDefines = async (data: any) => {
  return await kernel.queryWorkDefine({
    id: data.id,
    page: PageAll,
  });
};

export {
  loadCohorts,
  MyInfo,
  WaitInfo,
  DoneInfo,
  loadSpecies,
  loadWorkNode,
  loadWorkDefines,
};
