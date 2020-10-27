# 补充

::: tip 
补充一些不常用的 API 或 知识点

:::

## eval()
::: tip 
计算某个字符串，并执行其中的的 JavaScript 代码。

也就是将字符串转化为 JS 表达式

:::

``` js
    function add(){
        console.log(1);
    }
    function sdd(){
        console.log(2);
    }
    let obj = {};
    ['add','sdd'].forEach(name=>{
        obj[name] = eval(name);
        //eval(name) 将字符串 add sdd 指向add sdd函数
    })

```
## 关于()的运用

``` js
    //例子1
    Number.prototype.add = function(){
        return 1;
    }
    // console.log(5.add());  //报错提示 Invalid or unexpected token
    console.log((5).add());  //  1

    //例子2
    function add(){
        return 
            12
    }
    console.log(add()); //undefined

    function add(){
        return (
            12
        )
    }
    console.log(add()); //12
    
    
```
