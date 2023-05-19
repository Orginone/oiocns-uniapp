import { App, ServiceHost } from "@orginone/core";
import { useUniappRuntime } from "@orginone/runtime-uniapp";
import { ConfigurationManager } from "@orginone/core/lib/config";
import { AppState, useAppEvents } from "@orginone/core/lib/lib";
const config = new ConfigurationManager()
    .addConfig({
    apiUrl: "https://orginone.cn/orginone"
});
const oapp = App.create({
    config,
    services: new ServiceHost()
        .registerProvider(useUniappRuntime(uni, config))
        .build()
});
useAppEvents(oapp);
oapp.start();
export { oapp };