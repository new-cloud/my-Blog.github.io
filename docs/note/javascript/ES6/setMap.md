
# Set和Map

::: tip
ES6 增加了Map和Set两种新的数据结构
:::

Map是类似Object的一种键值对集合，区别在于Map的键不仅限于是字符串，其他各种类型的值包括对象都可以成为Map的键

``` js
const a = new Map();  //创建一个map对象
a.set(0,'mm');  //往Map里面添加键值对
a.get(0);  //跟句键获取对应值
```

Set是类似数组的一种数据结构，不同点在于Set中没有重复的值

``` js
const a = new Set([1,1,2,3,4,4,5]);
console.log(a); // Set(5) { 1, 2, 3, 4, 5 }
a.add(11);  //增加
a.delete(11);  //删除
a.size  //长度
```
判断一个对象（obj） 是否包含某个值（b）

``` js
//也可以用于判断一个对象是否包含另外一个对象
let obj = {
    c: {
        age: 10
    },
    a: {
        name: 'xx'
    }
};
let b = obj.a;
let set = new Set();
Object.keys(obj).forEach(item=>{
    set.add(obj[item]);
});
//has() 方法  传入一个参数，判断是否这个值是否包含在set类数组对象当中
console.log(set.has(b));  //返回true
```
