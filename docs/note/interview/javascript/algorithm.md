# JS算法相关

::: tip 


:::

给定一个深度为 n 的多维数组，将其展平。展平后，将其作为 array 实例上的可用方法。
``` js
let arr = [1,2,[3,4, [5,6, [7, [8, 9, 10]]]]];
//调用方法后返回  [1,2,3,4,5,6,7,8,9,10]
```
``` js
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

