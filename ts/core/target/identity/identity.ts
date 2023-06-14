import { kernelApi as kernel} from '../../../../common/app';
import { model, schema } from '../../../base';
import { Entity, IEntity, OperateType, TargetType } from '../../public';
import { PageAll } from '../../public/consts';
import { ITarget } from '../base/target';

/** 身份（角色）接口 */
export interface IIdentity extends IEntity<schema.XIdentity> {
  /** 设置身份（角色）的用户 */
  current: ITarget;
  /** 赋予身份（角色）的成员用户 */
  members: schema.XTarget[];
  /** 加载成员用户实体 */
  loadMembers(reload?: boolean): Promise<schema.XTarget[]>;
  /** 身份（角色）拉入新成员 */
  pullMembers(members: schema.XTarget[], notity?: boolean): Promise<boolean>;
  /** 身份（角色）移除成员 */
  removeMembers(members: schema.XTarget[], notity?: boolean): Promise<boolean>;
  /** 删除身份（角色） */
  delete(notity?: boolean): Promise<boolean>;
}

/** 身份（角色）实现类 */
export class Identity extends Entity<schema.XIdentity> implements IIdentity {
  constructor(_metadata: schema.XIdentity, current: ITarget) {
    super({
      ..._metadata,
    });
    this.current = current;
  }
  current: ITarget;
  members: any;
  private _memberLoaded: boolean = false;
  async loadMembers(reload?: boolean | undefined): Promise<schema.XTarget[]> {
    if (!this._memberLoaded || reload) {
      const res = await kernel.queryIdentityTargets({
        id: this.id,
        page: PageAll,
      });
      if (res.success) {
        this._memberLoaded = true;
        this.members = res.data.result || [];
      }
    }
    return this.members;
  }
  async pullMembers(
    members: schema.XTarget[],
    notity: boolean = false,
  ): Promise<boolean> {
    members = members.filter((i) => this.members.every((m) => m.id !== i.id));
    if (members.length > 0) {
      if (!notity) {
        const res = await kernel.giveIdentity({
          id: this.id,
          subIds: members.map((i) => i.id),
        });
        if (!res.success) return false;
      }
      this.members.push(...members);
    }
    return true;
  }
  async removeMembers(
    members: schema.XTarget[],
    notity: boolean = false,
  ): Promise<boolean> {
    members = members.filter((i) => this.members.some((m) => m.id === i.id));
    if (members.length > 0) {
      if (!notity) {
        const res = await kernel.removeIdentity({
          id: this.id,
          subIds: members.map((i) => i.id),
        });
        if (!res.success) return false;
      }
      this.members = this.members.filter((i) => members.every((s) => s.id !== i.id));
    }
    return true;
  }
  async delete(notity: boolean = false): Promise<boolean> {
    if (!notity) {
      const res = await kernel.deleteIdentity({
        id: this.id,
        page: PageAll,
      });
      if (!res.success) return false;
    }
    this.current.identitys = this.current.identitys.filter((i) => i.key != this.key);
    return true;
  }
}
