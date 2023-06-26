import {  schema } from '../ts/base';
import { IFileInfo } from '../ts/core';

/** 加载文件菜单 */
export const loadFileMenus = (file: IFileInfo<schema.XEntity>, mode: number = 0) => {
  console.log('file',file)
  return file
    .operates(mode)
    .sort((a, b) => a.sort - b.sort)
    .map((o) => {
      return {
        key: o.cmd,
        label: o.label,
        icon: '',
        beforeLoad: async () => {
          if (o.cmd === 'open') {
            await file.loadContent();
          }
          return true;
        },
        children: o.menus
          ?.sort((a, b) => a.sort - b.sort)
          .map((s) => {
            return {
              key: s.cmd,
              label: s.label,
              icon: '',
              beforeLoad: async () => {
                console.log('ssssss',s);
                if (s.cmd === 'open') {
                  await file.loadContent();
                }
                return true;
              },
            };
          }),
      } as any;
    });
};
