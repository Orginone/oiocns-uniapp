import { IPerson } from '../target/person';
export interface IChatProvider {
  /** 当前用户 */
  user: IPerson;
}

export class ChatProvider implements IChatProvider {
  constructor(_user: IPerson) {
    this.user = _user;
  }
  user: IPerson;
}
