
# 发布订阅（Pub-Sub）设计模式

::: tip

:::

在node环境下运行
``` js
const fs = require('fs');
    
    let event = {
        _arr: [],
        on(fn){  //发布
            this._arr.push(fn);
        },
        emit(){  //订阅
            this._arr.forEach(fn=>{
                fn();
            })
        }
    };
    let obj = {};
    event.on(function(){  // 这个函数不会立即执行
        console.log("搞完一个");
    });
    event.on(function(){
        if(Object.keys(obj).length===2){
            console.log("搞完了");
        }
    })
    fs.readFile('name.txt','utf8',function(err,data){
        obj.name = data;
        event.emit();  //发布一下
    })

    fs.readFile('age.txt','utf8',function(err,data){
        obj.age = data;
        event.emit();  //发布一下
    })
```
