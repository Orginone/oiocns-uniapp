// import { anyStoreApi } from './app';

// const hisWorkCollName = 'work-task';

// const  loadApply = async(data:any) => {
//     return await anyStoreApi.aggregate(
//          data.id,
//          hisWorkCollName,
//          {
//             match: {
//               belongId: data.belongId,
//               createUser: data.userId,
//               nodeId: {
//                 _exists_: false,
//               },
//             },
//             sort: {
//               createTime: -1,
//             },
//             skip:0,
//             limit:10
//         },
    
//       );
// }
//   export { loadApply };
