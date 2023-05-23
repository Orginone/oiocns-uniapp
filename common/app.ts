import { App } from "@orginone/core";
import { ServiceBuilder } from "@orginone/core/lib/di/ServiceBuilder";
import { useUniappRuntime } from "@orginone/runtime-uniapp";
import { AppConfig, ConfigurationManager } from "@orginone/core/lib/config";
import { Store, StateAction } from "@orginone/core/lib/state";
import { ShallowRefState } from "@orginone/vue/lib/ShallowRefState";
import { registerServices } from "@orginone/core/lib/lib";
import {UniRequestClient} from "@orginone/runtime-uniapp/lib/network/UniRequestClient"
import { ShallowRef } from "@Vue/reactivity";
import { ApiClient } from "@orginone/core/lib/network";
import AccountApi from '@orginone/core/lib/lib/api/account'
import KernelApi from '@orginone/core/lib/lib/api/kernelapi'
import {IStorage} from '@orginone/core/lib/storage/Storage'
import MemoryCacheStorage from '@orginone/core/lib/storage/MemoryCacheStorage'

const config = new ConfigurationManager<AppConfig>()
  .addConfig({
    apiUrl: "http://orginone.cn/orginone"
  });
const builder = new ServiceBuilder();
registerServices(builder)
  .factory(ConfigurationManager<AppConfig>, ctx => config)
  .instance<StateAction<ShallowRef<any>>>("StateAction", ShallowRefState)
  .instance<IStorage>("IStorage", new MemoryCacheStorage())
  .factory<ApiClient>("ApiClient",(ctx)=>{ 
    return new UniRequestClient(uni,config,ctx.resolve('AuthorizationStore'))
  })

  .constructorInject(AccountApi)
  .constructorInject(KernelApi)
  useUniappRuntime(builder,uni)

const services = builder.build();
const app = App.create({
  config,
  services
});
app.start();
let accountApi =  app.services.resolve(AccountApi)

let kernelApi  =  app.services.resolve(KernelApi)
console.log('====================================');
console.log(accountApi,kernelApi);
console.log('====================================');
export {
	app,accountApi,kernelApi
}
