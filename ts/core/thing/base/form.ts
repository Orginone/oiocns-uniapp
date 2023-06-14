import { PageAll } from '@/ts/core/public/consts';
import { SpeciesType } from '@/ts/core/public/enums';
import { ISpeciesItem } from './species';
import { model, schema } from '@/ts/base';
import { kernelApi as kernel } from '../../../../common/app';
import { IThingClass } from '../store/thingclass';
import { XProperty } from '@/ts/base/schema';
import { Entity, IEntity } from '../../public';
export interface IForm extends IEntity<schema.XForm> {
  /** 表单分类 */
  species: ISpeciesItem;
  /** 表单特性 */
  attributes: schema.XAttribute[];
  /** 更新表单 */
  update(data: model.FormModel): Promise<boolean>;
  /** 删除表单 */
  delete(): Promise<boolean>;
  /** 新建表单特性 */
  createAttribute(
    data: model.AttributeModel,
    property: XProperty,
  ): Promise<schema.XAttribute | undefined>;
  /** 更新表单特性 */
  updateAttribute(
    data: model.AttributeModel,
    property?: schema.XProperty,
  ): Promise<boolean>;
  /** 删除表单特性 */
  deleteAttribute(data: schema.XAttribute): Promise<boolean>;
}

export class Form extends Entity<schema.XForm> implements IForm {
  constructor(_metadata: schema.XForm, _species: ISpeciesItem) {
    super({
      ..._metadata,
    });
    this.species = _species;
  }
  species: ISpeciesItem;
  attributes: schema.XAttribute[] = [];
  async update(data: model.FormModel): Promise<boolean> {
    data.shareId = this.metadata.shareId;
    data.speciesId = this.metadata.speciesId;
    const res = await kernel.updateForm(data);
    if (res.success && res.data.id) {
      this.setMetadata(res.data);
    }
    return res.success;
  }
  async delete(): Promise<boolean> {
    const res = await kernel.deleteForm({
      id: this.id,
      page: PageAll,
    });
    return res.success;
  }
  async createAttribute(
    data: model.AttributeModel,
    property: XProperty,
  ): Promise<schema.XAttribute | undefined> {
    data.formId = this.id;
    data.propId = property.id;
    if (!data.authId || data.authId.length < 5) {
      data.authId = this.species.metadata.authId;
    }
    const res = await kernel.createAttribute(data);
    if (res.success && res.data.id) {
      res.data.property = property;
      res.data.linkPropertys = [property];
      this.attributes.push(res.data);
      return res.data;
    }
  }
  async updateAttribute(
    data: model.AttributeModel,
    property?: schema.XProperty,
  ): Promise<boolean> {
    const index = this.attributes.findIndex((i) => i.id === data.id);
    if (index > -1) {
      data.formId = this.id;
      if (property) {
        data.propId = property.id;
      }
      const res = await kernel.updateAttribute(data);
      if (res.success && res.data.id) {
        res.data.property = this.attributes[index].property;
        res.data.linkPropertys = this.attributes[index].linkPropertys;
        if (property) {
          res.data.linkPropertys = [property];
        }
        this.attributes[index] = res.data;
      }
      return res.success;
    }
    return false;
  }
  async deleteAttribute(data: schema.XAttribute): Promise<boolean> {
    const index = this.attributes.findIndex((i) => i.id === data.id);
    if (index > -1) {
      const res = await kernel.deleteAttribute({
        id: data.id,
        page: PageAll,
      });
      if (res.success) {
        this.attributes.splice(index, 1);
      }
      return res.success;
    }
    return false;
  }
}
