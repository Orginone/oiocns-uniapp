
import {oapp} from './app'

import AccountApi from "@orginone/core/lib/lib/api/account";

const api = new AccountApi(oapp.services.provider.api);

export {
	api,
}
