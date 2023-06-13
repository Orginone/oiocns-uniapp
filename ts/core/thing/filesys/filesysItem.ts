import { blobToDataUrl, generateUuid, logger } from '../../../../ts/base/common';
import { BucketOpreateModel, BucketOpreates, FileItemModel } from '../../../../ts/base/model';
import {kernelApi as kernel} from '../../../../common/app';
import { model } from '../../../../ts/base';
import { IFileSystem, TaskModel } from './filesystem';
import { FileItemShare } from '../../../base/model';
import { orgAuth } from '../../public/consts';
/** 分片大小 */
const chunkSize = 1024 * 1024;
/** 可为空的进度回调 */
export type OnProgressType = (p: number) => void | undefined;
/** 文件系统目录接口 */
export interface IFileSystemItem {
  /** 实体唯一键 */
  key: string;
  /** 文件系统 */
  filesys: IFileSystem;
  /** 文件系统项对应的目标 */
  metadata: FileItemModel;
  /** 上级文件系统项 */
  parent: IFileSystemItem | undefined;
  /** 下级文件系统项数组 */
  children: IFileSystemItem[];
  /** 分享信息 */
  shareInfo(): FileItemShare;
  /** 是否有操作权限 */
  hasOperateAuth(log?: boolean): boolean;
  /**
   * 下载文件
   * @param {string} path 下载保存路径
   * @param {OnProgressType} onProgress 进度回调
   */
}

/** 文件系统项实现 */
export class FileSystemItem implements IFileSystemItem {
  constructor(
    _filesys: IFileSystem,
    _metadata: model.FileItemModel,
    _parent?: IFileSystemItem,
  ) {
    this.key = generateUuid();
    this.metadata = _metadata;
    this.parent = _parent;
    this.filesys = _filesys;
    this.belongId = this.filesys.belong.id;
  }
  key: string;
  belongId: string;
  filesys: IFileSystem;
  metadata: FileItemModel;
  parent: IFileSystemItem | undefined;
  children: IFileSystemItem[] = [];
  shareInfo(): model.FileItemShare {
    return {
      size: this.metadata.size,
      name: this.metadata.name,
      extension: this.metadata.extension,
      shareLink:
        location.origin + '/orginone/anydata/bucket/load/' + this.metadata.shareLink,
      thumbnail: this.metadata.thumbnail,
    };
  }
  get childrenData(): model.FileItemModel[] {
    return this.children.map((item) => {
      return item.metadata;
    });
  }
  /** 校验权限 */
  hasOperateAuth(log: boolean = true): boolean {
    if (!this.filesys.belong.hasAuthoritys([orgAuth.ThingAuthId])) {
      if (log) {
        logger.warn('抱歉,您没有权限操作.');
      }
      return false;
    }
    return true;
  }
  /**
   * 格式化key,主要针对路径中的中文
   * @returns 格式化后的key
   */
  private _formatKey(subName: string = '') {
    if (!this.metadata.key && !subName) {
      return '';
    }
    try {
      let keys = !this.metadata.key ? [] : [this.metadata.key];
      if (subName != '' && subName.length > 0) {
        keys.push(subName);
      }
      return btoa(unescape(encodeURIComponent(keys.join('/'))));
    } catch (err) {
      return '';
    }
  }
  /**
   * 根据名称查询子文件系统项
   * @param name 名称
   */
  private async _findByName(name: string): Promise<IFileSystemItem | undefined> {
    for (const item of this.children) {
      if (item.metadata.name === name) {
        return item;
      }
    }
    return;
  }
  /**
   * 根据新目录生成文件系统项
   * @param source 源
   * @param destination 目标
   * @returns 新的文件系统项
   */
  private _newItemForDes(
    source: IFileSystemItem,
    destination: IFileSystemItem,
  ): IFileSystemItem {
    let node = new FileSystemItem(
      this.filesys,
      {
        name: source.metadata.name,
        dateCreated: new Date(),
        dateModified: new Date(),
        size: source.metadata.size,
        shareLink: source.metadata.shareLink,
        extension: source.metadata.extension,
        thumbnail: source.metadata.thumbnail,
        key: destination.metadata.key + '/' + source.metadata.name,
        isDirectory: source.metadata.isDirectory,
        contentType: source.metadata.contentType,
        hasSubDirectories: source.metadata.hasSubDirectories,
      },
      destination,
    );
    for (const item of source.children) {
      node.children.push(this._newItemForDes(item, node));
    }
    return node;
  }
}
