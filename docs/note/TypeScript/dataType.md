# 数据类型

::: tip TIP
TS中数据类型 由JS中的数据类型延伸而来

对JS当中很熟悉的数据类型就不做过多介绍,主要详细介绍TS中我们没见过的数据类型
:::

<!-- * 如果变量声明的时候没给定数据类型,那么该变量的数据类型以赋值 值的数据类型为主,不赋值 为any -->

## 数组

声明一个数组类型的方式:
``` ts
    // 1
    let list: number[] = [1, 2, 3];
    // 2
    let list2: Array<number> = [1, 2, 3];
    //多数据类型数组
    let list2: Array<number | string> = [1, 2, '3'];

```

## 元组

元组  就是可以定义一个数组,各元素类型不相同
``` ts 
let x: [string, number];  //长度也固定死 为2 ?
x = ['hello', 10]; // OK
// x = [10, 'hello']; // err 报错
// x[2] = 10; //  报错?

```

## 枚举
* 数字枚举 
* 字符串枚举 

#### 数字枚举
``` ts
    enum Role {
        age,
        name
    }
    console.log(Role);
    //{ '0': 'age', '1': 'name', age: 0, name: 1 }
    //会对索引和值做一个反向映射
    
    enum Role2 {
        age = 2,
        name
    }
    console.log(Role2);
    //{ '2': 'age', '3': 'name', age: 2, name: 3 }
```
#### 字符串枚举
一般不使用
``` ts
    enum Role {
        laji = 'xx'
    }
    console.log(Role);
    // { laji: '啊啊' }
    //不会对索引和值做映射
```
#### 实际运用
``` ts
enum Sex {
  MALE,
  FEMALE,
  UNKNOWN
}
function checkSex(sex: Sex) {
    let result: string = '';
    switch (sex) {
      case Sex.MALE:
        result = '男';
        break;
      case Sex.FEMALE:
        result = '女';
        break;
      case Sex.UNKNOWN:
        result = '未知';
        break;
      default:
        break;
    }
    return result;
}
let member_sex:Sex = Sex.FEMALE;
console.log(checkSex(member_sex)) // 女

```
## any
如果值可能来自于动态的内容，比如来自用户输入或第三方代码库。

这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。

那么我们可以使用 any类型来标记这些变量：
``` js
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // ok

```

## Void
* void类型像是与any类型相反，它表示没有任何类型。一个函数没有返回值时，你通常会见到其返回值类型是 void

``` ts
    //当需要规定一个函数必须有返回值,并且值还是规定的类型
    function sdd():number{
        return 1;
    }
    //一个函数没有返回值时，你通常会见到其返回值类型是 void
    function add():void{
        console.log(1)
    }

```