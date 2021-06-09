# 排序相关

::: tip 
1、字符串排序，空值放在最后
``` js
var arr = ["bob","12","A-n-001","a-b-003","","b-1-2","b-1-1","19","dan","","0",""]
``` 
思路
``` js
var arr = ["bob","12","A-n-001","a-b-003","","b-1-2","b-1-1","19","dan","","0",""]
var SortedArr = arr.sort(function (a,b) {
        // 如果 比较的值为空值  用一个最大值来替代比较
        return (a || "ZZZZZZ").toUpperCase().localeCompare((b || "ZZZZZZ").toUpperCase())
    });
console.log(SortedArr)
// ["0", "12", "19", "a-b-003", "A-n-001", "b-1-1", "b-1-2", "bob", "dan", "", "", ""]
``` 