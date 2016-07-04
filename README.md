## h5+ and VUE模板工程
> A h5+ and VUE project

## 环境说明
###1.安装nodejs(编译和打包需要用到)，配置环境变量path
###2.svn下载项目工程
###3.打开命令行，进入到工程根目录，eg:vueProject/
###4.如果需要进行域名替换，运行npm run repl,这个命令会把src下面的文件都进行一次扫描，将里面的域名按照配置文件进行替换
###5.运行npm install 安装依赖,如果有依赖下载不了，可以尝试将源设置成taobao的，eg：npm --registry https://registry.npm.taobao.org info underscore 
###6.运行npm run build 编译生成dist
###7.运行npm run dev 进行调试默认端口8080可以自己修改，在./config/index.js里面
###8.npm run xbuild 这个指令是先进行域名替换，然后进行build的快捷指令



## 工程结构说明
>输出目录是dist
	

##工程目录说明
├─dist
│   ├─index.html //首页
│   │
│   ├─demo
│   │   └─index.html //子页面，这里的页面名称是来自src/demo/index
│   │
│   ├─home
│   │   └─index.html
│   │
│   ├─order
│   │    └─index.html
│   │
│   └─static //静态资源
│        ├─css
│        │  ├─index.css 
│        │  │
│        │  ├─demo
│        │  │   └─index.css
│        │  │
│        │  ├─home
│        │  │   └─index.css
│        │  │
│        │  └─order
│        │       └─index.css
│        │
│        └─js
│           ├─index.js
│           ├─vendors.js//公共js，被每个页面引用的js，都提取到这里来了
│           │
│           ├─demo
│           │   └─index.js
│           │
│           ├─home
│           │   └─index.js
│           │
│           └─order
│               └─index.js
├─build
├─config
├─doc
├─src
│  ├─api
│  ├─static
│  │  ├─css
│  │  ├─fonts
│  │  ├─img
│  │  └─js
│  ├─common
│  ├─component
│  ├─directive
│  ├─filter
│  ├─library
│  ├─store
│  └─view
│   ├─demo
|		│  ├─bizcomponent
|		│  │      Demo.vue
|		│  │
|		│  └─index
|		│      │  app.vue
|		│      │  index.html
|		│      └─index.js
|		├─order
|		│  ├─bizcomponent
|		│  └─index
|		│      │  app.vue
|		│      │  index.html
|		│      └─index.js
|		└─home
|		    ├─bizcomponent
|		    │      directiveSelect.vue
|		    │      SeeSort.vue
|		    │
|		    └─index //这个文件夹名称对应的就是页面名称，会在dist目录下生成index.html文件
|		        │  app.vue
|		        │  index.html
|		        └─index.js
|		        
└─test
      ├─e2e
      └─unit
      

###坑记录
1.在模板里面引用图片路径问题
		<img class="logo" src="./assets/img/bg.png">，直接使用相对路径可以
		<img class="logo" :src='imgl'>如果是计算属性，imgl:require(type==1?'./assets/img/logo.png':'./assets/img/bg.png')|||imgsrc:require('./assets/img/bg.png'),
		必须使用require引入图片
2.传递参数名必须使用全小写 ，驼峰会有问题
	props: {
		hello: String,
		propb: {
      type: String,
      required: true
    }
	},
3.	
# vueProject
