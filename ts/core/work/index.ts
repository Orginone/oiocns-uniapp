// @ts-nocheck
import {kernelApi as kernel} from '../../../common/app';
import { XWorkDefine } from '../../base/schema';
import { model, schema } from '../../base';
import { IApplication } from '../thing/application';
import { Entity, IEntity } from '../public';
import { IFormView, FormView } from '../thing/form';

export interface IWork extends IEntity<schema.XWorkDefine> {
  /** 应用 */
  application: IApplication | undefined;
  /** 流程关联的表单 */
  forms: IFormView[];
  /** 更新办事定义 */
  updateDefine(req: model.WorkDefineModel): Promise<boolean>;
  /** 加载事项定义节点 */
  loadWorkNode(): Promise<model.WorkNodeModel | undefined>;
  /** 加载事项定义节点关联的表单 */
  loadWorkForms(): Promise<IFormView[]>;
  /** 删除办事定义 */
  deleteDefine(): Promise<boolean>;
  /** 新建办事实例 */
  createWorkInstance(
    data: model.WorkInstanceModel,
  ): Promise<schema.XWorkInstance | undefined>;
}

export const fullDefineRule = (data: XWorkDefine) => {
  data.allowAdd = true;
  data.allowEdit = true;
  data.allowSelect = true;
  if (data.rule && data.rule.includes('{') && data.rule.includes('}')) {
    const rule = JSON.parse(data.rule);
    data.allowAdd = rule.allowAdd;
    data.allowEdit = rule.allowEdit;
    data.allowSelect = rule.allowSelect;
  }
  data.typeName = '事项';
  return data;
};

export class Work extends Entity<schema.XWorkDefine> implements IWork {
  constructor(_metadata: XWorkDefine, _application?: IApplication) {
    super(fullDefineRule(_metadata));
    this.application = _application;
  }
  forms: IFormView[] = [];
  application: IApplication | undefined;
  async deleteDefine(): Promise<boolean> {
    if (this.application) {
      const res = await kernel.deleteWorkDefine({
        id: this.id,
      });
      if (res.success) {
        this.application.works = this.application.works.filter((a) => a.id != this.id);
      }
      return res.success;
    }
    return false;
  }
  async updateDefine(data: model.WorkDefineModel): Promise<boolean> {
    data.id = this.id;
    data.applicationId = this.metadata.applicationId;
    const res = await kernel.createWorkDefine(data);
    if (res.success && res.data.id) {
      res.data.typeName = '事项';
      this.setMetadata(fullDefineRule(res.data));
    }
    return res.success;
  }
  async loadWorkNode(): Promise<model.WorkNodeModel | undefined> {
    const res = await kernel.queryWorkNodes({ id: this.id });
    if (res.success) {
      return res.data;
    }
  }
  async loadWorkForms(): Promise<IFormView[]> {
    const forms: IFormView[] = [];
    const res = await kernel.queryWorkNodes({ id: this.id });
    if (res.success && res.data) {
      const recursionForms = (node: model.WorkNodeModel) => {
        if (node.forms && node.forms.length > 0) {
          forms.push(...node.forms.map((i) => new FormView(i)));
        }
        if (node.children) {
          recursionForms(node.children);
        }
        if (node.branches) {
          for (const branch of node.branches) {
            if (branch.children) {
              recursionForms(branch.children);
            }
          }
        }
      };
      recursionForms(res.data);
    }
    this.forms = forms;
    return forms;
  }
  async createWorkInstance(
    data: model.WorkInstanceModel,
  ): Promise<schema.XWorkInstance | undefined> {
    let res = await kernel.createWorkInstance(data);
    if (res.success) {
      return res.data;
    }
  }
}
