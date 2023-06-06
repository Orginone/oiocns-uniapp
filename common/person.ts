import { OperateType, TargetType } from './enums';
import {kernelApi} from './app'
import { PageAll } from './consts';

//获取资产类别列表
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


  export { loadCohorts,MyInfo,WaitInfo,DoneInfo };

