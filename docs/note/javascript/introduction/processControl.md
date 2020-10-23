# 流程控制
::: tip TIP

程序的三种基本结构


顺序结构： 从上到下，从左到右执行的顺序，就叫做顺序结构，程序默认就是由上到下顺序执行的


分支结构：根据不同的情况，执行对应代码


循环结构：重复做一件事情

:::

## if 语句 （判断语句）

``` js
    //当条件表达示为真  就执行  下面的的执行语句
    if (/* 条件表达式 */) {
      // 执行语句
    }
```
如果if后的大括号{}中只有一行语句，大括号可以省略
在if语句的条件表达式中，有一些默认值就是false
undefined 、 0 、 NaN 、 false 、 

* if-else语句

``` js
if (/* 条件表达式 */) {
// 成立执行语句
} else {
  // 否则执行语句
}
//举例:
 //获取两个数字中的最大值
var num1=100;
var num2=20;
if(num1>num2){
    console.log(num1);
}else{
    console.log(num2);
}
// 100
```
* if --- else if 语句
if-else嵌套

``` js
if (/* 条件1 */){
  // 成立执行语句
} else if (/* 条件2 */){
  // 成立执行语句
} else if (/* 条件3 */){
  // 成立执行语句
} else {
  // 最后默认执行语句
}
```

## switch-case （判断语句）

``` js
    switch基本格式
    switch (表达式) {
        case 值1:语句1;break;
        case 值2:语句2;break;
        case 值3:语句3;break;
        default:语句4;
    }

```
## while循环 （循环语句）

::: tip
基本语法
:::
``` js
    // 当循环条件为true时，执行循环体，
    // 当循环条件为false时，结束循环。
    while (循环条件) {
      //循环体
    }
```
示例: 计算1-100之间所有数的和
```js
// 初始化变量
    var i = 1;
    var sum = 0;
    while (i <= 100) {   // 判断条件
      sum += i;  // 循环体
      i++;  // 自增
    }
    console.log(sum);
```
## do-while循环 （循环语句）

不管循环条件是否为true,都会先执行一遍循环体,再去判断条件
::: tip
基本语法
:::
``` js
    do {
      // 循环体;
    } while (循环条件);
```
示例: 计算1-100的和
``` js
    // 初始化变量
    var i = 0;
    var sum = 1;
    do {
      sum += i;//循环体
      i++;//自增
    } while (i <= 100);//循环条件

```
## for循环 （循环语句）
::: tip
基本语法
:::
``` js
    // for循环的表达式之间用的是分号分隔的
    for (初始化表达式1; 判断表达式2; 自增表达式3) {
      // 循环体4
    }

```
示例: 打印1-100之间所有数
``` js
    for(var i=1;i<=100;i++){
        console.log(i);
    }

```

## 结束循环

* break 强制结束任何形式的循环

示例: 求200-300之间第一个能被7整数的数（break）
``` js
    for(var i=200;i<=300;i++){
        if(i % 7 == 0){
            console.log(i);
            break;
        }
    }
```
* continue 跳过本次循环，继续下一次循环

示例: 求1-100之间不能被7整除的整数的和（用continue）
``` js
    var s = 0;
    for(var i = 0; i < 100; i++){
        if(i % 7 == 0){
            continue;
        }
        s += i;
    }
    console.log(s);
```

