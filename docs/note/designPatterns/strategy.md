
# 策略模式 - 动态表单验证

::: tip
+ 策略模式将算法的实现和使用拆分，这个特点带来了很多优点：
    * 策略之间相互独立，但策略可以自由切换，这个策略模式的特点给策略模式带来很多灵活性，也提高了策略的复用率；
    * 如果不采用策略模式，那么在选策略时一般会采用多重的条件判断，采用策略模式可以避免多重条件判断，增加可维护性；
    * 可扩展性好，策略可以很方便的进行扩展；
:::
具体的例子我们用编程上的例子来演示，比较好量化。

场景是这样的，某个电商网站希望举办一个活动，通过打折促销来销售库存物品，有的商品满 100 减 30，有的商品满 200 减 80，有的商品直接8折出售（想起被双十一支配的恐惧），这样的逻辑交给我们，我们要怎样去实现呢。

``` js
function priceCalculate(discountType, price) {
    if (discountType === 'minus100_30') {   		// 满100减30
        return price - Math.floor(price / 100) * 30
    }
    elseif (discountType === 'minus200_80') {  // 满200减80
        return price - Math.floor(price / 200) * 80
    }
    elseif (discountType === 'percent80') {    // 8折
        return price * 0.8
    }
}

priceCalculate('minus100_30', 270)    // 输出: 210
priceCalculate('percent80', 250)      // 输出: 200
```
+ 通过判断输入的折扣类型来计算计算商品总价的方式，几个 if-else 就满足了需求，但是这样的做法的缺点也很明显：
    * 策略之间相互独立，但策略可以自由切换，这个策略模式的特点给策略模式带来很多灵活性，也提高了策略的复用率；
    * 如果增加了新的折扣类型或者折扣类型的算法有所改变，那么需要更改 priceCalculate 函数的实现，这是违反开放-封闭原则的；
    * 可复用性差，如果在其他的地方也有类似这样的算法，但规则不一样，上述代码不能复用；
我们可以改造一下，将计算折扣的算法部分提取出来保存为一个对象，折扣的类型作为 key，这样索引的时候通过对象的键值索引调用具体的算法：
``` js
const DiscountMap = {
    minus100_30: function(price) {
        return price - Math.floor(price / 100) * 30
    },
    minus200_80: function(price) {
        return price - Math.floor(price / 200) * 80
    },
    percent80: function(price) {
        return price * 0.8
    }
}

/* 计算总售价*/
function priceCalculate(discountType, price) {
    return DiscountMap[discountType] && DiscountMap[discountType](price)
}

priceCalculate('minus100_30', 270)
priceCalculate('percent80', 250)

// 输出: 210
// 输出: 200
```
这样算法的实现和算法的使用就被分开了，想添加新的算法也变得十分简单：
``` js
DiscountMap.minus150_40 = function(price) {
    return price - Math.floor(price / 150) * 40
}
```
如果你希望计算算法隐藏起来，那么可以借助 IIFE 使用闭包的方式，这时需要添加增加策略的入口，以方便扩展：
``` js
const PriceCalculate = (function() {
    /* 售价计算方式 */
    const DiscountMap = {
        minus100_30: function(price) {      // 满100减30
            return price - Math.floor(price / 100) * 30
        },
        minus200_80: function(price) {      // 满200减80
            return price - Math.floor(price / 200) * 80
        },
        percent80: function(price) {        // 8折
            return price * 0.8
        }
    }
    
    return {
        priceClac: function(discountType, price) {
            return DiscountMap[discountType] && DiscountMap[discountType](price)
        },
        addStrategy: function(discountType, fn) {		// 注册新计算方式
            if (DiscountMap[discountType]) return
            DiscountMap[discountType] = fn
        }
    }
})()

PriceCalculate.priceClac('minus100_30', 270)	// 输出: 210

PriceCalculate.addStrategy('minus150_40', function(price) {
    return price - Math.floor(price / 150) * 40
})
PriceCalculate.priceClac('minus150_40', 270)	// 输出: 230
```
## 表单验证
这里举一个 Vue + ElementUI 项目的例子，其他框架同理。

ElementUI 的 Form 表单 具有表单验证功能，用来校验用户输入的表单内容。实际需求中表单验证项一般会比较复杂，所以需要给每个表单项增加 validator 自定义校验方法。
我们可以像官网示例一样把表单验证都写在组件的状态 data 函数中，但是这样就不好复用使用频率比较高的表单验证方法了，这时我们可以结合策略模式和函数柯里化的知识来重构一下。首先我们在项目的工具模块（一般是 utils 文件夹）实现通用的表单验证方法：
``` js
// src/utils/validates.js

/* 姓名校验 由2-10位汉字组成 */
export function validateUsername(str) {
    const reg = /^[\u4e00-\u9fa5]{2,10}$/
    return reg.test(str)
}

/* 手机号校验 由以1开头的11位数字组成  */
export function validateMobile(str) {
    const reg = /^1\d{10}$/
    return reg.test(str)
}

/* 邮箱校验 */
export function validateEmail(str) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(str)
}
然后在 utils/index.js 中增加一个柯里化方法，用来生成表单验证函数：
// src/utils/index.js

import * as Validates from'./validates.js'

/* 生成表格自定义校验函数 */
exportconst formValidateGene = (key, msg) =>(rule, value, cb) => {
    if (Validates[key](value)) {
        cb()
    } else {
        cb(newError(msg))
    }
}
```
上面的 formValidateGene 函数接受两个参数，第一个是验证规则，也就是 src/utils/validates.js 文件中提取出来的通用验证规则的方法名，第二个参数是报错的话表单验证的提示信息。
``` vue
<template>
    <el-form ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             :rules="rules"
             :model="ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        
        <el-form-item label="手机号" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
    </el-form>
</template>

<script type='text/javascript'>
    import * as Utils from '../utils'
    
    export default {
        name: 'ElTableDemo',
        data() {
            return {
                ruleForm: { pass: '', checkPass: '', age: '' },
                rules: {
                    username: [{
                        validator: Utils.formValidateGene('validateUsername', '姓名由2-10位汉字组成'),
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: Utils.formValidateGene('validateMobile', '手机号由以1开头的11位数字组成'),
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: Utils.formValidateGene('validateEmail', '不是正确的邮箱格式'),
                        trigger: 'blur'
                    }]
                }
            }
        }
    }
</script>
```