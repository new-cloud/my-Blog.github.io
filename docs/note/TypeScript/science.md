# 执行环境

::: tip TIP
    TypeScript并不能直接用运行在浏览器或者node.js环境当中!
    
    我们都是先将TS编译为JS之后再使用编译后的JS文件
:::


### ts-node
* 在 node 环境中可以直接运行 TS 文件的插件

* npm安装
```
    npm i -g ts-node

```
* 运行命令
```
    ts-node ts文件
```