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
//方法1  利用ES6的flat方法
//Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维数组
//[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
//flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组
//可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1
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
//调用方法后返回  [1,17,'1',true,false,'true','a',{}];
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
方法五、利用hasOwnProperty
``` js
    function unique(arr){
        let obj = {};
        return arr.filter(item=>{
            return obj.hasOwnProperty(typeof item + item) ? 
            false : (obj[typeof item + item] = true)
        })
    }
    console.log(unique(arr)); //可以去掉相同的空对象
```
## 打印出当前网页使用了多少种HTML元素
一行代码可以解决：
``` js
    const fn = () => {
      return [...new Set([...document.querySelectorAll('*')].map(el => el.tagName))].length;
    }
```
## 扁平数据结构转Tree
非常常见的需求，后台返回一个扁平的数据结构，转成树
``` js
	let arr = [
	    {id: 1, name: '部门1', pid: 0},
	    {id: 2, name: '部门2', pid: 1},
	    {id: 3, name: '部门3', pid: 1},
	    {id: 4, name: '部门4', pid: 3},
	    {id: 5, name: '部门5', pid: 4},
	    {id: 5, name: '部门5', pid: 0},
		// arr 的长度不固定，并且pid下的children层级也没有最大限制
		...
	]
	// 需要输出
	[
	    {
	        "id": 1,
	        "name": "部门1",
	        "pid": 0,
	        "children": [
	            {
	                "id": 2,
	                "name": "部门2",
	                "pid": 1,
	                "children": []
	            },
	            {
	                "id": 3,
	                "name": "部门3",
	                "pid": 1,
	                "children": [
	                    // 结果 ,,,
	                ]
	            }
	        ]
	    }
	]
```
最容易想到的思路是提供一个递getChildren的方法，该方法递归去查找子集。
就这样，不用考虑性能，无脑去查，大多数人只知道递归，就是写不出来。。。
``` js
/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}

/**
* 转换方法
* pid 作为每次调用getChildren开始向下递归的值
*/
const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid)
  return result;
}
// 最后调用arrayToTree得到数据树
arrayToTree(arr)
```
从上面的代码我们分析，该实现的时间复杂度为O(2^n)。
从算法层面看这是一个不可用的时间复杂度。所带来的性能损耗也是巨大的！
所以我们开始寻求最优解: 利用Map数据结构和对象的引用关系来实现性能会更好。
``` js
	function arrayToTree(items) {
      	const result = [];   // 存放结果集
      	const itemMap = {};  //map对象

      	for (const item of items) {
      	  const id = item.id;
      	  const pid = item.pid;

			// 将所有数据都转化为map数据结构储存在itemMap中
      	  itemMap[id] = {...item, children: []}

      	  const treeItem =  itemMap[id];
      	  if (pid === 0) {
      	    result.push(treeItem);
      	  } else {
      	    if (!itemMap[pid]) {
      	      itemMap[pid] = {
      	        children: [],
      	      }
      	    }
      	    itemMap[pid].children.push(treeItem)
      	  }
	
      	}
      	return result;
    }
	// 最后调用arrayToTree得到数据树
	arrayToTree(arr)
```
