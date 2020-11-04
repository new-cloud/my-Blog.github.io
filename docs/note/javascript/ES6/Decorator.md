# 装饰器 Decorator

::: tip
ES6 Decorator 装饰器
:::

Decorator 是 ES7 的一个新语法，目前仍处于第2阶段提案中。

正如其“装饰器”的叫法所表达的，他通过添加@方法名可以对一些对象进行装饰包装然后返回一个被包装过的对象。

可以装饰的对象包括：类，属性，方法等。

* 注意：在使用它之前需要引入babel模块 transform-decorators-legacy 编译成 ES5 或 ES6。

## 类的装饰
示例：添加一个日志装饰器
```js

    @log
    class MyClass { }

    function log(target) { // 这个 target 在这里就是 MyClass 这个类
       target.prototype.logger = () => `${target.name} 被调用`
    }

    const test = new MyClass()
    test.logger() // MyClass 被调用

```
## 属性或方法的装饰
可以把此时的装饰器理解成是 Object.defineProperty(obj, prop, descriptor)的语法糖
```js
    class C {
      @readonly(false)
      method() { console.log('cat') }
    }

    function readonly(value) {
      return function (target, key, descriptor) { 
    	/**
    	* 此处 target 为 C.prototype; 
    	* key 为 method;
        * 原 descriptor 为：
        *   { value: f, enumarable: false, writable: true, configurable: true }
    	*/
        descriptor.writable = value
        return descriptor
      }
    }

    const c = new C()
    c.method = () => console.log('dog')

    c.method() // cat
```