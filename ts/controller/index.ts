import { IPerson, UserProvider } from '../../ts/core';
import * as common from '../base/common';
import { IWorkProvider } from '../core/work/provider';
/**
 * 设置控制器
 */
class IndexController extends common.Emitter {
  public currentKey: string = '';
  private _provider: UserProvider;
  constructor() {
    super();
    this._provider = new UserProvider(this);
  }
  /** 是否已登录 */
  get logined(): boolean {
    return this._provider.user != undefined;
  }
  /** 数据提供者 */
  get provider(): UserProvider {
    return this._provider;
  }
  /** 当前用户 */
  get user(): IPerson {
    return this._provider.user!;
  }
  /** 办事提供者 */
  get work(): IWorkProvider {
    return this._provider.work!;
  }
}

export default new IndexController();