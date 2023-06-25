export type XAttrLinkProp = {
  id: string;
  attrId: string;
  propId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  property: XProperty | undefined;
  attribute: XAttribute | undefined;
};
export type XAttrLinkPropArray = {
  offset: number;
  limit: number;
  total: number;
  result: XAttrLinkProp[] | undefined;
};
export type XAttribute = {
  id: string;
  name: string;
  code: string;
  rule: string;
  remark: string;
  shareId: string;
  belongId: string;
  authId: string;
  propId: string;
  formId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  linkPropertys: XProperty[] | undefined;
  links: XAttrLinkProp[] | undefined;
  property: XProperty | undefined;
  authority: XAuthority | undefined;
  form: XForm | undefined;
  belong: XTarget | undefined;
};
export type XAttributeArray = {
  offset: number;
  limit: number;
  total: number;
  result: XAttribute[] | undefined;
};
export type XAuthority = {
  id: string;
  name: string;
  code: string;
  remark: string;
  icon: string;
  public: boolean;
  parentId: string;
  shareId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  parent: XAuthority | undefined;
  nodes: XAuthority[] | undefined;
  belong: XTarget | undefined;
  identitys: XIdentity[] | undefined;
  authSpecies: XSpecies[] | undefined;
  autAttrs: XAttribute[] | undefined;
};
export type XAuthorityArray = {
  offset: number;
  limit: number;
  total: number;
  result: XAuthority[] | undefined;
};
export type XDict = {
  id: string;
  name: string;
  code: string;
  icon: string;
  remark: string;
  speciesId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  dictItems: XDictItem[] | undefined;
  dictProps: XProperty[] | undefined;
  belong: XTarget | undefined;
};
export type XDictArray = {
  offset: number;
  limit: number;
  total: number;
  result: XDict[] | undefined;
};
export type XDictItem = {
  id: string;
  name: string;
  value: string;
  icon: string;
  belongId: string;
  dictId: string;
  remark: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  dict: XDict | undefined;
  belong: XTarget | undefined;
};
export type XDictItemArray = {
  offset: number;
  limit: number;
  total: number;
  result: XDictItem[] | undefined;
};
export type XForm = {
  id: string;
  name: string;
  code: string;
  rule: string;
  remark: string;
  speciesId: string;
  shareId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  attributes: XAttribute[] | undefined;
  bindNodes: XWorkNode[] | undefined;
  species: XSpecies | undefined;
  belong: XTarget | undefined;
};
export type XFormArray = {
  offset: number;
  limit: number;
  total: number;
  result: XForm[] | undefined;
};
export type XIdProof = {
  id: string;
  identityId: string;
  targetId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  target: XTarget | undefined;
  identity: XIdentity | undefined;
};
export type XIdProofArray = {
  offset: number;
  limit: number;
  total: number;
  result: XIdProof[] | undefined;
};
export type XIdentity = {
  id: string;
  name: string;
  code: string;
  remark: string;
  authId: string;
  shareId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  idProofs: XIdProof[] | undefined;
  identityTeams: XTeamIdentity[] | undefined;
  givenTargets: XTarget[] | undefined;
  teams: XTeam[] | undefined;
  authority: XAuthority | undefined;
  share: XTarget | undefined;
  belong: XTarget | undefined;
};
export type XIdentityArray = {
  offset: number;
  limit: number;
  total: number;
  result: XIdentity[] | undefined;
};
export type XLog = {
  id: string;
  type: string;
  module: string;
  content: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
};
export type XLogArray = {
  offset: number;
  limit: number;
  total: number;
  result: XLog[] | undefined;
};
export type XOrder = {
  id: string;
  nftId: string;
  name: string;
  code: string;
  price: number;
  marketId: string;
  belongId: string;
  content: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  pays: XOrderPay[] | undefined;
  belong: XTarget | undefined;
};
export type XOrderArray = {
  offset: number;
  limit: number;
  total: number;
  result: XOrder[] | undefined;
};
export type XOrderPay = {
  id: string;
  orderId: string;
  price: number;
  paymentType: string;
  remark: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  orderDetail: XOrder | undefined;
};
export type XOrderPayArray = {
  offset: number;
  limit: number;
  total: number;
  result: XOrderPay[] | undefined;
};
export type XProperty = {
  id: string;
  name: string;
  code: string;
  valueType: string;
  unit: string;
  remark: string;
  speciesId: string;
  dictId: string;
  sourceId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  linkAttributes: XAttribute[] | undefined;
  links: XAttrLinkProp[] | undefined;
  attributes: XAttribute[] | undefined;
  things: XThing[] | undefined;
  propThingValues: XThingProp[] | undefined;
  species: XSpecies | undefined;
  dict: XDict | undefined;
  belong: XTarget | undefined;
};
export type XPropertyArray = {
  offset: number;
  limit: number;
  total: number;
  result: XProperty[] | undefined;
};
export type XRelation = {
  id: string;
  targetId: string;
  teamId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  team: XTeam | undefined;
  target: XTarget | undefined;
};
export type XRelationArray = {
  offset: number;
  limit: number;
  total: number;
  result: XRelation[] | undefined;
};
export type XSpecies = {
  id: string;
  name: string;
  code: string;
  remark: string;
  icon: string;
  typeName: string;
  parentId: string;
  authId: string;
  shareId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  defines: XWorkDefine[] | undefined;
  propertys: XProperty[] | undefined;
  attributes: XAttribute[] | undefined;
  forms: XForm[] | undefined;
  parent: XSpecies | undefined;
  nodes: XSpecies[] | undefined;
  authority: XAuthority | undefined;
  belong: XTarget | undefined;
};
export type XSpeciesArray = {
  offset: number;
  limit: number;
  total: number;
  result: XSpecies[] | undefined;
};
export type XTarget = {
  id: string;
  name: string;
  code: string;
  typeName: string;
  public: boolean;
  icon: string;
  remark: string;
  belongId: string;
  thingId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  orders: XOrder[] | undefined;
  idProofs: XIdProof[] | undefined;
  shareIdentitys: XIdentity[] | undefined;
  identitys: XIdentity[] | undefined;
  things: XThing[] | undefined;
  relations: XRelation[] | undefined;
  team: XTeam | undefined;
  dicts: XDict[] | undefined;
  sellOrder: XOrder[] | undefined;
  dictItems: XDictItem[] | undefined;
  species: XSpecies[] | undefined;
  attributes: XAttribute[] | undefined;
  propertys: XProperty[] | undefined;
  authority: XAuthority[] | undefined;
  relTeams: XTeam[] | undefined;
  forms: XForm[] | undefined;
  givenIdentitys: XIdentity[] | undefined;
  belong: XTarget | undefined;
  targets: XTarget[] | undefined;
  thing: XThing | undefined;
  defines: XWorkDefine[] | undefined;
  instances: XWorkInstance[] | undefined;
};
export type XTargetArray = {
  offset: number;
  limit: number;
  total: number;
  result: XTarget[] | undefined;
};
export type XTeam = {
  id: string;
  name: string;
  code: string;
  targetId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  relTargets: XTarget[] | undefined;
  teamIdentitys: XTeamIdentity[] | undefined;
  relations: XRelation[] | undefined;
  target: XTarget | undefined;
  identitys: XIdentity[] | undefined;
};
export type XTeamArray = {
  offset: number;
  limit: number;
  total: number;
  result: XTeam[] | undefined;
};
export type XTeamIdentity = {
  id: string;
  identityId: string;
  teamId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  team: XTeam | undefined;
  identity: XIdentity | undefined;
};
export type XTeamIdentityArray = {
  offset: number;
  limit: number;
  total: number;
  result: XTeamIdentity[] | undefined;
};
export type XThing = {
  id: string;
  chainId: string;
  name: string;
  code: string;
  shareId: string;
  belongId: string;
  remark: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  thingPropValues: XThingProp[] | undefined;
  target: XTarget | undefined;
  givenPropertys: XProperty[] | undefined;
  belong: XTarget | undefined;
};
export type XThingArray = {
  offset: number;
  limit: number;
  total: number;
  result: XThing[] | undefined;
};
export type XThingProp = {
  id: string;
  propId: string;
  thingId: string;
  value: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  histroy: XThingPropHistroy[] | undefined;
  property: XProperty | undefined;
  thing: XThing | undefined;
};
export type XThingPropArray = {
  offset: number;
  limit: number;
  total: number;
  result: XThingProp[] | undefined;
};
export type XThingPropHistroy = {
  id: string;
  thingPropId: string;
  value: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  thingProp: XThingProp | undefined;
};
export type XThingPropHistroyArray = {
  offset: number;
  limit: number;
  total: number;
  result: XThingPropHistroy[] | undefined;
};
export type XWorkDefine = {
  id: string;
  code: string;
  name: string;
  icon: string;
  remark: string;
  speciesId: string;
  shareId: string;
  belongId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  nodes: XWorkNode[] | undefined;
  instances: XWorkInstance[] | undefined;
  target: XTarget | undefined;
  species: XSpecies | undefined;
};
export type XWorkDefineArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkDefine[] | undefined;
};
export type XWorkInstance = {
  id: string;
  title: string;
  defineId: string;
  contentType: string;
  taskId: string;
  content: string;
  data: string;
  thingIds: string;
  hook: string;
  shareId: string;
  belongId: string;
  remark: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  tasks: XWorkTask[] | undefined;
  historyTasks: XWorkTaskHistory[] | undefined;
  define: XWorkDefine | undefined;
  target: XTarget | undefined;
};
export type XWorkInstanceArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkInstance[] | undefined;
};
export type XWorkNode = {
  id: string;
  rule: string;
  code: string;
  name: string;
  count: number;
  defineId: string;
  destId: string;
  destName: string;
  brotherIds: string;
  branchId: string;
  branchType: number;
  remark: string;
  destType: string;
  nodeType: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  tasks: XWorkTask[] | undefined;
  bindFroms: XForm[] | undefined;
  historyTasks: XWorkTaskHistory[] | undefined;
  define: XWorkDefine | undefined;
};
export type XWorkNodeArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkNode[] | undefined;
};
export type XWorkNodeRelation = {
  id: string;
  nodeId: string;
  formId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
};
export type XWorkNodeRelationArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkNodeRelation[] | undefined;
};
export type XWorkRecord = {
  id: string;
  taskId: string;
  comment: string;
  data: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  task: XWorkTask | undefined;
};
export type XWorkRecordArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkRecord[] | undefined;
};
export type XWorkTask = {
  id: string;
  nodeId: string;
  title: string;
  approveType: string;
  taskType: string;
  count: number;
  defineId: string;
  shareId: string;
  belongId: string;
  instanceId: string;
  identityId: string;
  content: string;
  remark: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  records: XWorkRecord[] | undefined;
  node: XWorkNode | undefined;
  instance: XWorkInstance | undefined;
};
export type XWorkTaskArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkTask[] | undefined;
};
export type XWorkTaskHistory = {
  id: string;
  nodeId: string;
  instanceId: string;
  status: number;
  createUser: string;
  updateUser: string;
  version: string;
  createTime: string;
  updateTime: string;
  records: XWorkRecord[] | undefined;
  node: XWorkNode | undefined;
  instance: XWorkInstance | undefined;
};
export type XWorkTaskHistoryArray = {
  offset: number;
  limit: number;
  total: number;
  result: XWorkTaskHistory[] | undefined;
};
export type XEntity = {
  // 名称
  name: string;
  // 编号
  code: string;
  // 备注
  remark: string;
  // 归属用户
  belongId: string;
  // 雪花ID
  id: string;
  // 状态
  status: number;
  // 创建人员ID
  createUser: string;
  // 更新人员ID
  updateUser: string;
  // 修改次数
  version: string;
  // 创建时间
  createTime: string;
  // 更新时间
  updateTime: string;
  typeName?:any
};