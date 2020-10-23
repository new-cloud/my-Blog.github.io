# 数据类型

::: tip TIP
JS 中的数据类型可分为2大类:


:::
## 原始类型
* 数值型（number）、
* 字符串型（string）、
* 布尔型（boolean）、
* 未定义型（undefined）、
* 空 （null）、
* symbol

## 引用类型
* 对象 （Object）、
* 函数 （Function）、
* 数组 （Array）、

## 检测数据类型API
* typeof
```js
    typeof(1);          // number
    typeof('a');        // string
    // 但是typeof 只返回： number、boolean、symbol、string、object、undefined、function。
    typeof(null);       // object  null返回object
    // 引用类型，除了function返回function类型外，其他均返回object
    function add(){};   
    typeof(add);        //function
    let arr = [];
    typeof(arr);          // object

```

* toString
::: tip 
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。
这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。
对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。
而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
:::

示例: 
```js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
```
## 数据类型转换

* 隐士转换

①.数值型+字符串型：数值型转成了字符串型

②.数值型+布尔型：布尔型被转换成了数值型

③.布尔型+字符串型：布尔型被转换成了字符串型

补充：n++  自增会吧n转换为数值型再自增

* 强制转换
::: tip
将任意数据转换为数值型 Number()

将数值型和布尔型转为字符串 toString()

...

:::
