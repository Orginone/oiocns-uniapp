
import {oapp} from './app'

import AccountApi from "@orginone/core/lib/lib/api/account";
import KernelApi from "@orginone/core/lib/lib/api/kernelapi";

const accountApi = new AccountApi(oapp.services.provider.api); //账户相关api

const kernelApi = new KernelApi(oapp.services.provider.api); //内核相关api

export {
	accountApi,kernelApi
}
