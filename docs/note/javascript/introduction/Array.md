# 数组

## 稀疏数组
::: tip TIP
  什么是稀疏呢？稀疏也就是说，数组中的元素之间可以有空隙，因为一个数组其实就是一个键值映射
:::

创建一个指定长度的稀疏数组很简单
```js
  var arr = Array(3)
  // [empty × 3]
```
当你遍历它时，你会发现，它并没有元素，JavaScript会跳过这些缝隙。
还有一些其他情况会生成稀疏数组，比如：
```js
var arr = []
arr[0] = 0
arr[100] = 100
```
数组元素实际只有2个，但是长度确实101

## 密集数组
::: tip TIP
  什么是稀疏呢？稀疏也就是说，数组中的元素之间可以有空隙，因为一个数组其实就是一个键值映射
:::

创建密集数组的技巧: 
```js
var a = Array.apply(null, Array(3));
// [ undefined, undefined, undefined ]
//上面的语句其实等同于:
Array(undefined, undefined, undefined)
```
你现在可以看到数组里面有真实元素了，虽然元素的值是undefined，但是你可以遍历到这些数组元素了，还可以为每个元素重新赋值

另外一个技巧:
```js
Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number))
//[ 0, 1, 2 ]
//上面的语句其实等同于:
Array.apply(null, Array(3)).map(
  function (x,i,...) { return Number.call(x,i,...)
})
//注意：x是call方法的第一个参数，它作为了Number函数中的this值。这个值没有什么意义
//相当于被忽略，我更喜欢下面这个能让人一眼就看明白的写法
Array.apply(null, Array(3)).map(function (x,i) { return i })
```
另外一种方式:
```js
  Array(100).join("a").split('')
```
<font color=#FF0000 >但是有个问题就是两个元素才1个坑，因为2个才能join，单数就会存在问题</font>

实际用途：在实际生产中，使用上面讲的创建密集数组的方法会让别人无法读懂你的代码。所以封装成一个工具函数会更好
```js
//比如 _.range:
 _.range(3)    //[ 0, 1, 2 ]

//和map配合使用，可以使用某个指定的值填充整个数组。
 _.range(3).map(function () { return "a" })
//[ 'a', 'a', 'a' ]
```