# 函数相关

::: tip 
函数的高阶用法

:::
## 函数柯里化
实现一个add方法,满足以下功能
``` js
add(1, 2, 3)(4)             // 10
add(1)(2)(3)(4)(5)          // 15

```
``` js
function add() {
    // 第一次执行时，定义一个数组专门存储所有的参数
    //arguments是一个类数组对象,将arguments转换为一个真正的数组
    var _args = Array.prototype.slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

console.log(add(1, 2, 3)(4))             // 10
console.log(add(1)(2)(3)(4)(5))          // 15

```

