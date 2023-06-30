import orgCtrl from '../../../ts/controller';
import { IApplication, SpeciesType } from '../../../ts/core';

export const loadApps = async () => {
  // const apps: IApplication[] = [];
  // if(orgCtrl){
  //   for (const u of orgCtrl.user.targets) {
  //     for (const s of u.species) {
  //       if (s.typeName === SpeciesType.Application) {
  //         const app = s as IApplication;
  //         if ((await app.loadWorkDefines()).length > 0) {
  //           apps.push(app);
  //         }
  //       }
  //     }
  //   }
  //   return apps.filter((a, i) => apps.findIndex((x) => x.id === a.id) === i);
  // }
  return []
};