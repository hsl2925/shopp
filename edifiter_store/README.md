# edifier

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### 工程结构解析

```
├── public                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── assets                # 图片文件
│   ├── components            # 全局组件
│   ├── pages                  # 主包页面
│       ├── cart               # 购物车
│       ├── category            # 分类页
│       ├── index               # 首页
│       ├── profile             # 我的
│       └── stroll              # 搜索
│   ├── router                 # 路由配置
│   ├── style                  # 全局样式
│       └── base.scss          # 基础样式
│   ├── App.vue                # 入口页面
│   ├── main.js                # Vue初始化入口文件
│   ├── store.js               # vuex
├── .gitignore                 # git 忽略文件
├── babel.config.ls            # babel配置
├── jsconfig.js                # config配置
├── package.json               # package.json 依赖
└── vite.config.ts             # vite 配置
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
