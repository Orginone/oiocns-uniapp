import {kernelApi as kernel} from '../../common/app';
import { IPerson, Person } from './target/person';
import { common, model, schema } from '../base';
import { IChatProvider, ChatProvider } from './chat/provider';
import { IWorkProvider, WorkProvider } from './work/provider';
import { OperateType } from './public/enums';
import { logger } from '../base/common';
import { msgChatNotify } from './chat/message/msgchat';
import { IIdentity, Identity } from './target/identity/identity';
import { IStation } from './target/innerTeam/station';
import { ITeam } from './target/base/team';
import { ITarget } from './target/base/target';
const sessionUserName = 'currentUser';

/** 当前用户提供层 */
export class UserProvider {
  private _user: IPerson | undefined;
  private _work: IWorkProvider | undefined;
  private _chat: IChatProvider | undefined;
  private _inited: boolean = false;
  private _emiter: common.Emitter;
  constructor(emiter: common.Emitter) {
    this._emiter = emiter;

    let timeIndex = setInterval(() => {
      const userJson = uni.getStorageSync(sessionUserName);
      if (userJson) {
        clearInterval(timeIndex);
        this._loadUser(userJson);  // 使用箭头函数绑定this
      }
    },100);
  }
  /** 当前用户 */
  get user(): IPerson | undefined {
    return this._user;
  }
  /** 办事提供层 */
  get work(): IWorkProvider | undefined {
    return this._work;
  }
  /** 会话 */
  get chat(): IChatProvider | undefined {
    return this._chat;
  }
  /** 是否完成初始化 */
  get inited(): boolean {
    return this._inited;
  }
  /** 所有相关的用户 */
  get targets(): ITarget[] {
    const targets: ITarget[] = [];
    if (this._user) {
      targets.push(...this._user.targets);
      for (const company of this._user.companys) {
        targets.push(...company.targets);
      }
    }
    return targets;
  }
  /** 加载用户 */
  private _loadUser(person: schema.XTarget) {
    uni.setStorageSync(sessionUserName, JSON.stringify(person));
    this._user = new Person(person);
    this._chat = new ChatProvider(this._user);
    this._work = new WorkProvider(this._user);
    this.refresh();
  }
  /** 更新用户 */
  public update(person: schema.XTarget) {
    uni.setStorageSync(sessionUserName, JSON.stringify(person));
  }
  /** 重载数据 */
  public async refresh(): Promise<void> {
    this._inited = false;
    // this._chat?.PreMessage();
    await this._user?.deepLoad(true);
    await this.work?.loadTodos(true);
    this._inited = true;
    // this._chat?.loadPreMessage();
    this._emiter.changCallback();
  }
  /** 接受组织变更 */
  async _updateTarget(recvData: string) {
    const data: model.TargetOperateModel = JSON.parse(recvData);
    if (!this.user || !data) return;
    const allTarget: ITeam[] = this.targets;
    this.user.companys.forEach((a) => {
      allTarget.push(...a.stations);
    });
    let message = '';
    switch (data.operate) {
      case OperateType.Delete:
        message = `${data.operater?.name}将${data.target.name}删除.`;
        allTarget.filter((i) => i.id === data.target.id).forEach((i) => i.delete(true));
        break;
      case OperateType.Update:
        message = `${data.operater?.name}将${data.target.name}信息更新.`;
        this.user.updateMetadata(data.target);
        break;
      case OperateType.Remove:
        if (data.subTarget) {
          let operated = false;
          for (const item of [this.user, ...this.user.companys]) {
            if (item.id === data.subTarget.id) {
              message = `${item.id === this.user.id ? '您' : item.name}已被${
                data.operater?.name
              }从${data.target.name}移除.`;
              item.parentTarget
                .filter((i) => i.id === data.target.id)
                .forEach((i) => {
                  i.delete(true);
                  operated = true;
                });
            }
          }
          if (!operated) {
            message = `${data.operater?.name}把${data.subTarget.name}从${data.target.name}移除.`;
            allTarget
              .filter(
                (i) => i.id === data.target.id || data.target.id === data.subTarget!.id,
              )
              .forEach((i) => {
                i.removeMembers([data.subTarget!], true);
              });
          }
        }
        break;
      case OperateType.Add:
        if (data.subTarget) {
          let operated = false;
          message = `${data.operater?.name}把${data.subTarget.name}与${data.target.name}建立关系.`;
          for (const item of [this.user, ...this.user.companys]) {
            if (
              item.id === data.subTarget.id &&
              (await item.teamChangedNotity(data.target))
            ) {
              operated = true;
            }
          }
          if (!operated) {
            for (const item of allTarget) {
              if (item.id === data.target.id) {
                await item.teamChangedNotity(data.subTarget);
              }
            }
          }
        }
    }
    if (message.length > 0) {
      if (data.operater?.id != this.user.id) {
        logger.info(message);
      }
      msgChatNotify.changCallback();
      this._emiter.changCallback();
    }
  }

  /** 接受身份变更 */
  async _updateIdentity(recvData: string) {
    const data: model.IdentityOperateModel = JSON.parse(recvData);
    if (!this.user || !data) return;
    let targets = this.user.targets;
    this.user.companys.forEach((a) => {
      targets.push(...a.cohorts);
    });
    let identitys: IIdentity[] = [];
    let stations: IStation[] = [];
    targets
      .filter((i) => i.id === data.identity.shareId)
      .forEach((a) => {
        identitys.push(...(a.identitys.filter((s) => s.id == data.identity.id) || []));
      });
    this.user.companys.forEach((a) => stations.push(...a.stations));
    let message = '';
    switch (data.operate) {
      case OperateType.Create:
        message = `${data.operater?.name}新增身份【${data.identity.name}】.`;
        targets.forEach((a) => {
          if (a.identitys.every((q) => q.id !== data.identity.id)) {
            a.identitys.push(new Identity(data.identity, a));
          }
        });
        break;
      case OperateType.Delete:
        message = `${data.operater?.name}将身份【${data.identity.name}】删除.`;
        identitys.forEach((a) => a.delete(true));
        stations.forEach((i) => i.removeIdentitys([data.identity], true));
        break;
      case OperateType.Update:
        message = `${data.operater?.name}将身份【${data.identity.name}】信息更新.`;
        this.user.updateMetadata(data.identity);
        break;
      case OperateType.Remove:
        if (data.station) {
          message = `${data.operater?.name}移除岗位【${data.station.name}】中的身份【${data.identity.name}】.`;
          stations
            .find((s) => s.id === data.station!.id)
            ?.removeIdentitys([data.identity], true);
        } else {
          message = `${data.operater?.name}移除赋予【${data.subTarget!.name}】的身份【${
            data.identity.name
          }】.`;
          identitys.forEach((i) => i.removeMembers([data.subTarget!], true));
        }
        break;
      case OperateType.Add:
        if (data.station) {
          message = `${data.operater?.name}向岗位【${data.station.name}】添加身份【${data.identity.name}】.`;
          stations
            .find((s) => s.id === data.station?.id)
            ?.pullIdentitys([data.identity], true);
        } else {
          message = `${data.operater?.name}赋予{${data.subTarget!.name}身份【${
            data.identity.name
          }】.`;
          identitys.forEach((i) => i.pullMembers([data.subTarget!], true));
        }
    }
    if (message.length > 0) {
      if (data.operater?.id != this.user.id) {
        logger.info(message);
      }
      this._emiter.changCallback();
    }
  }
}
