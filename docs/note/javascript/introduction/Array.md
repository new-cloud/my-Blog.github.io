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

## 关于数组的越界
::: tip TIP
  数组的长度大小是有限制的，最大长度为 4294967295 也就是2的32次方减2 = Math.pow(2, 32) - 2
:::

```js
//定义一个空数组
var a = []
//改变length属性,使得a成为一个装满的稀疏数组,由于数组索引从0开始
//所以最大的索引号就是Math.pow(2, 32) - 2
a[Math.pow(2, 32) - 2] = "最大索引"
console.log(a.length === Math.pow(2, 32) - 1)
//true, a的length已经不能再大了
try {
  //再往里面push元素,铁定抛出异常
  a.push("我比最大索引还大1", "我比最大索引还大2")
} catch (e) {
  console.log('数组越界', e instanceof RangeError)
  // 数组越界, true,
}
console.log(a.length === Math.pow(2, 32) - 1)
// true,长度没变,还是4294967295,那元素呢?push进去没有?
console.log(a[Math.pow(2, 32) - 1] === "我比最大索引还大1")
// true,居然能访问,而且值还存进去了! 
console.log(a[Math.pow(2, 32)] === "我比最大索引还大2")
// true,这个也是!
try {
  // 再push一个
  a.push("我比最大索引还大3?");                           
} catch (e) {
  console.log('数组越界', e instanceof RangeError)
  // 数组越界, true,
}
console.log(a[Math.pow(2, 32) + 1])
//undefined,没有存上?
console.log(a[Math.pow(2, 32) - 1])
//"我比最大索引还大3?",原来是覆盖了第一个越界的元素                
console.log(a[Math.pow(2, 32)])
//"我比最大索引还大2",这个没被覆盖                         
```
JavaScript中的数组就是一个稍微有点特殊的普通对象.在Array.prototype.push方法执行时,会先把每个要push的元素push进去,也就是定义多个自身属性(ES5 15.4.4.7.5).

然后才设置数组的length属性为最大的索引值+1(ES5 15.4.4.7.5),这个例子中就是Math.pow(2, 32) + 1,这时才会报错(ES5 15.4.5.1.3.d),但上面的元素已经push进去了.

如果再次push的话,还会从当前的length属性-1的那个索引处开始push,也就出现了覆盖而不是继续追加的情况。