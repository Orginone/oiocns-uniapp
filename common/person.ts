import { OperateType, TargetType } from './enums';
import {kernelApi} from './app'
import { PageAll } from './consts';

//获取组织单位列表
const  loadCohorts = async(data:any) => {
    return await kernelApi.queryJoinedTargetById({
        id: data,
        typeNames: [TargetType.Company,TargetType.Hospital,TargetType.University],
        page: PageAll,
      });

}
//我发起的

const  MyInfo = async(data:any) => {
    return await kernelApi.queryMyWorkInstance({
        id: data,
        page: PageAll,
      });

}
//待办事项
const  WaitInfo = async(data:any) => {
    return await kernelApi.queryApproveTask({
        id: data,
        page: PageAll,
      });

}
//已办事项
const  DoneInfo = async(data:any) => {
    return await kernelApi.queryWorkRecord({
        id: data,
        page: PageAll,
      });

}

//树
const  loadSpecies = async(data:any) => {
  return await kernelApi.querySpeciesTree({
    belongId: data.belongId,
    id: data.sid,
    upTeam: true,
    filter: "",
    });

}
//办事节点

const  loadWorkNode = async(data:any) => {
  return await kernelApi.queryWorkNodes({ id: data.belongId, page: PageAll });

}

//加载办事
const  loadWorkDefines = async(data:any) => {
  return await kernelApi.queryWorkDefine({ 
    id: data.id,
    speciesId: data.speciesId,
    belongId: data.belongId,
    upTeam: true,
    page: PageAll, });

}

  export { loadCohorts,MyInfo,WaitInfo,DoneInfo,loadSpecies,loadWorkNode,loadWorkDefines };

