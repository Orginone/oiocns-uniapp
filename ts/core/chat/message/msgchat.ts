import { model, common, schema, List } from '../../../base';
import { IBelong } from '../../target/base/belong';
import { IEntity, Entity, TargetType} from '../../public';
// 消息变更推送
export const msgChatNotify = new common.Emitter();

// 消息类会话接口
interface IChat {
  /** 回话的标签列表 */
  labels: List<string>;
  /** 会话Id */
  chatId: string;
  /** 当前用户Id */
  userId: string;
  /** 会话归属Id */
  belongId: string;
  /** 加载会话的自归属用户 */
  space: IBelong;
  /** 共享信息 */
  share: model.ShareIcon;
  /** 会话描述 */
  information: string;
  /** 会话的成员 */
  members: schema.XTarget[];
  /** 是否归属人员用户 */
  isBelongPerson: boolean;
  /** 是否为我的好友 */
  isFriend: boolean;
  /** 加载成员用户实体 */
  loadMembers(reload?: boolean): Promise<schema.XTarget[]>;
}

export interface IMsgChatT<T extends schema.XEntity> extends IChat, IEntity<T> {}

export abstract class MsgChat<T extends schema.XEntity>
  extends Entity<T>
  implements IMsgChatT<T>
{
  constructor(
    _metadata: T,
    _labels: string[],
    _space?: IBelong,
    _belong?: schema.XTarget,
  ) {
    super(_metadata);
    this.chatId = _metadata.id;
    this.space = _space || (this as unknown as IBelong);
    this._belong = _belong || this.space.metadata;
    this.labels = new List(_labels);
  }
  space: IBelong;
  chatId: string;
  labels: List<string>;
  members: schema.XTarget[] = [];
  _belong: schema.XTarget;
  get userId(): string {
    return this.space.user.id;
  }
  get belongId(): string {
    return this._belong.id;
  }
  get isBelongPerson(): boolean {
    return this._belong.typeName === TargetType.Person;
  }
  get information(): string {
    return this.remark.substring(0, 60);
  }
  get isFriend(): boolean {
    if (this.typeName === TargetType.Person && this.id != this.userId) {
      if (this.space.user.members.every((i) => i.id != this.id)) {
        return false;
      }
    }
    return true;
  }
  abstract loadMembers(reload?: boolean): Promise<schema.XTarget[]>;
}
