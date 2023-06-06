import { App } from "@orginone/core";
import { ServiceBuilder } from "@orginone/core/lib/di/ServiceBuilder";
import { AppConfig, ConfigurationManager } from "@orginone/core/lib/config";
import { Store, StateAction } from "@orginone/core/lib/state";
import { IStorage } from "@orginone/core/lib/storage/Storage";
import { ShallowRefState } from "@orginone/vue/lib/ShallowRefState";
import AccountApi from '@orginone/core/lib/lib/api/account'
import KernelApi from '@orginone/core/lib/lib/api/kernelapi'
import AnyStoreApi from '@orginone/core/lib/lib/api/anystore'
import { OrginoneServices } from "@orginone/core";
import  { UniappRuntime }  from "@orginone/runtime-uniapp";
import { AuthorizationStore } from "@orginone/core/lib/lib/store/authorization";

const config = new ConfigurationManager<AppConfig>()
  .addConfig({
    apiUrl: "http://orginone.cn/orginone"
  });
// 注册服务
const builder = new ServiceBuilder()
  .use(OrginoneServices)
  .use(UniappRuntime as any,uni)
  .factory(ConfigurationManager<AppConfig>, ctx => config)
  .instance<StateAction>("StateAction", ShallowRefState);
// 生成服务容器并创建应用
const services = builder.build();
const app = App.create({
  config,
  services
});
// 启动应用
app.start();
console.log(app);

let accountApi =  app.services.resolve(AccountApi)

let kernelApi  =  app.services.resolve(KernelApi)

let anyStoreApi   =  app.services.resolve(AnyStoreApi)

let storage    =  app.services.resolve<IStorage>("IStorage");

let store      =  app.services.resolve<Store<AuthorizationStore>>("AuthorizationStore");

export {
	app,accountApi,kernelApi,storage,store,anyStoreApi
}
