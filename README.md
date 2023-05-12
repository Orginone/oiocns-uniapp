<img width="1060" alt="image" src="https://user-images.githubusercontent.com/8328012/201800690-9f5e989e-4ed3-4817-85b9-b594ac89fd31.png">

奥集能是面向下一代互联网发展趋势，基于动态演化的复杂系统多主体建模方法，以所有权作为第一优先级，运用零信任安全机制，按自组织分形方法提炼和抽象“沟通、办事、仓库、商店、市场和设置”等基础功能，为b端和c端融合的全场景业务的提供新一代分布式应用架构。

# 项目目录

```目录
┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules           存放[uni_module](/uni_modules)。
├─platforms             存放各平台专用页面的目录，详见
├─nativeplugins         App原生语言插件 详见
├─nativeResources       App端原生资源目录
│  └─android            Android原生资源目录 详见
├─hybrid                App端存放本地html文件的目录，详见
├─wxcomponents          存放小程序组件的目录，详见
├─unpackage             非工程代码，一般存放运行或发行的编译结果
├─AndroidManifest.xml   Android原生应用清单文件 详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
└─uni.scss              这里是uni-app内置的常用样式变量
```

# 依赖环境

编辑器：HBuilder、微信开发者工具

项目启动：参考 [uni-app官网 (dcloud.net.cn)](https://uniapp.dcloud.net.cn/quickstart-hx.html) 快速启动项目

# 如何参与项目

Orginone 采用开放、开源共建模式，避免重复造轮子，以持续迭代，不断演进的模式，完善公共平台的建设。引入开放社区治理模式，保障平台的开放和中心，建设成果以开放或开源模式输出，鼓励在公共平台基础上开展商业服务，以市场化竞争方式提高资源效率，降低社会运行成本。

正式进入实际开发之前，需要做一些准备工作，比如：Javascript、Typescript 语言的学习、vue2、vue3 开发框架使用等。

## git规范

1. 命名要求：
   1.1 统一前缀-姓名缩写-描述及日期。如 增加XX功能 `feature-lw-addmain1101`
   1.2 分支名称前缀如下

- common：调整通用组件、通用功能、通用数据接口、通用样式等
- feature：新功能
- fix：bug修复
- hotfix：线上紧急修复
- perf：性能优化
- other：配置信息调整等非上面5种的改动改动

1. 迭代要求：
   2.1 `main` 分支为主干，所有迭代基于此分支进行获取
   2.2 所有新功能迭代，问题修复等，需要进行发布，需要提交 `PR` 请求到 `main` 分支。
   2.3 待系统上线后会拉出 `test` ,后续迭代与 `ISSUE`中问题进行关联的模式
