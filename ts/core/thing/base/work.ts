import { XWorkDefine } from '../../../../ts/base/schema';
import {kernelApi as kernel} from '../../../../common/app';
import { model, schema } from '../../../base';
import { PageAll } from '../../public/consts';
import { TargetType } from '../../public/enums';
import { ISpeciesItem, SpeciesItem } from './species';
import { IApplication } from '../app/application';
import { ITarget } from '../../target/base/target';
import { Entity, IEntity } from '../../public';

export interface IWorkDefine extends IEntity<schema.XWorkDefine> {
  /** 办事分类 */
  workItem: IWork;
}

export class FlowDefine extends Entity<schema.XWorkDefine> implements IWorkDefine {
  workItem: IWork;
  constructor(_metadata: XWorkDefine, work: IWork) {
    super({
      ..._metadata,
    });
    this.workItem = work;
  }
  async deleteDefine(): Promise<boolean> {
    const res = await kernel.deleteWorkDefine({
      id: this.id,
      page: PageAll,
    });
    if (res.success) {
      this.workItem.defines = this.workItem.defines.filter((a) => a.id != this.id);
    }
    return res.success;
  }
}

export interface IWork extends ISpeciesItem {
  /** 对应的应用 */
  app: IApplication;
  /** 流程定义 */
  defines: IWorkDefine[];
  /** 加载办事 */
  loadWorkDefines(reload?: boolean): Promise<IWorkDefine[]>;
  /** 新建办事 */
  createWorkDefine(data: model.WorkDefineModel): Promise<IWorkDefine | undefined>;
}

export abstract class Work extends SpeciesItem implements IWork {
  constructor(
    _metadata: schema.XSpecies,
    _current: ITarget,
    _app?: IApplication,
    _parent?: ISpeciesItem,
  ) {
    super(_metadata, _current, _parent);
    this.app = _app || this;
  }
  app: IApplication;
  defines: IWorkDefine[] = [];
  private _defineLoaded: boolean = false;
  async loadWorkDefines(reload: boolean = false): Promise<IWorkDefine[]> {
    if (!this._defineLoaded || reload) {
      const res = await kernel.queryWorkDefine({
        id: this.current.id,
        speciesId: this.id,
        belongId: this.belongId,
        upTeam: this.current.typeName === TargetType.Group,
        page: PageAll,
      });
      if (res.success) {
        this._defineLoaded = true;
        this.defines = (res.data.result || []).map((a) => new FlowDefine(a, this));
      }
    }
    return this.defines;
  }
  async createWorkDefine(data: model.WorkDefineModel): Promise<IWorkDefine | undefined> {
    data.shareId = this.current.id;
    data.speciesId = this.id;
    const res = await kernel.createWorkDefine(data);
    if (res.success && res.data.id) {
      let define = new FlowDefine(res.data, this);
      this.defines.push(define);
      return define;
    }
  }
}
