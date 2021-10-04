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

// console.log(add(1, 2, 3)(4))             // 10
console.log(+add(1, 2, 3)(4))             // 10
console.log(add(1)(2)(3)(4)(5))          // 15

```

toString隐式转换的特性：在Function需要转换为字符串时，通常会自动调用函数的 toString 方法
例子：
``` js
function test() {
    function fn() {
		console.log('我是fn')
	}
    fn.toString = () => {
        console.log('toString()')
        return 'toString'
    }
    return fn
}
// 现在直接打印toString 会在打印后执行
console.log(test())
// 所以直接隐士转换一下就能正常打印
console.log(+test())
//这句代码执行后会打印出
//f return toString
```

当执行 test() 之后会返回一个 function fn(typeof test()=== function),

<font color=#FF0000 >但是此时会自动调用函数的 toString(),所以返回了 字符串’toString’</font>

如果没有重写 toString() 则会返回函数的字符串形式(返回结果: ƒ fn(){console.log(‘我是fn’)})