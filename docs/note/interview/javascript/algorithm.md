# JS算法相关

::: tip 


:::

## 数组扁平化
给定一个深度为 n 的多维数组，将其展平。展平后，将其作为 array 实例上的可用方法。
``` js
let arr = [1,2,[3,4, [5,6, [7, [8, 9, 10]]]]];
//调用方法后返回  [1,2,3,4,5,6,7,8,9,10]
```
``` js
//方法1  利用ES6的flat方法，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维数组
//[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
//flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1
//如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
arr.flat(Infinity);
//后续拓展还有flatMap()方法.....
```
``` js
//方法2
function flatten(arr) {
    return arr.reduce(function(acc, next){
        let isArray = Array.isArray(next)
        return acc.concat(isArray ? flatten(next) : next)
    }, [])
}
if (!Array.prototype.flatten) {
    Array.prototype.flatten = function() {
        return flatten(this)
    }
}
console.log(arr.flatten());  //  [1,2,3,4,5,6,7,8,9,10]

```
## 数组去重。
``` js
let arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
//调用方法后返回  [1,2,3,4,5,6,7,8,9,10]
```
方法一：利用Set
``` js
let res = Array.from(new Set(arr));
console.log(res)
```
方法二：两层for循环+splice
``` js
const unique1 = arr => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
        len--;
        j--;
      }
    }
  }
  return arr;
}
```
方法三：利用include
``` js
    const unique3 = arr => {
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) res.push(arr[i]);
      }
      return res;
    }
```
方法四：利用Map
``` js
    const unique5 = arr => {
      const map = new Map();
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        if (!map.has(arr[i])) {
          map.set(arr[i], true)
          res.push(arr[i]);
        }
      }
      return res;
    }
```
## 打印出当前网页使用了多少种HTML元素
一行代码可以解决：
``` js
    const fn = () => {
      return [...new Set([...document.querySelectorAll('*')].map(el => el.tagName))].length;
    }
```