import { schema } from '../../../../ts/base';
import { ITarget, Target } from '../base/target';
import { IBelong } from '../base/belong';
export interface ICohort extends ITarget {}

export class Cohort extends Target implements ICohort {
  get chats(): any[] {
    throw new Error('Method not implemented.');
  }
  constructor(_metadata: schema.XTarget, _space: IBelong) {
    super(_metadata, [_metadata.belong?.name ?? '', _metadata.typeName], _space);
  }
  async exit(): Promise<boolean> {
    if (this.metadata.belongId !== this.space.id) {
      if (await this.removeMembers([this.space.user.metadata])) {
        this.space.cohorts = this.space.cohorts.filter((i) => i.key != this.key);
        return true;
      }
    }
    return false;
  }
  override async delete(notity: boolean = false): Promise<boolean> {
    notity = await super.delete(notity);
    if (notity) {
      this.space.cohorts = this.space.cohorts.filter((i) => i.key != this.key);
    }
    return notity;
  }
  get subTarget(): ITarget[] {
    return [];
  }
  get targets(): ITarget[] {
    return [this];
  }
  async deepLoad(reload: boolean = false): Promise<void> {
    await this.loadMembers(reload);
  }
  async teamChangedNotity(target: schema.XTarget): Promise<boolean> {
    return await this.pullMembers([target], true);
  }
}
