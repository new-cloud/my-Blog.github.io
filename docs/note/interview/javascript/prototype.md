# 面向对象

::: tip 
封装、继承、多态

:::

## 继承
实现一个 (5).add(3).minus(2)    //输出结果为: 6
``` js
    // ~ function 同匿名函数自调用(写法不同)
    ~function (){
        function check(n){
            n=Number(n);
            return isNaN(n) ? 0 : n;
        };
        let fnObj = {
            add(n) {
                n = check(n);
                return this + n;
            },
            minus(n){
                n = check(n);
                return this - n;
            }
        }
        Object.keys(fnObj).forEach(name=>{
            Number.prototype[name] = fnObj[name];
        })
    }();
    console.log((5).add(3).minus(2));  //输出6

```