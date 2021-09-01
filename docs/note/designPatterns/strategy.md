
# 策略模式 - 动态表单验证

::: tip
+ 策略模式将算法的实现和使用拆分，这个特点带来了很多优点：
    * pending       策略之间相互独立，但策略可以自由切换，这个策略模式的特点给策略模式带来很多灵活性，也提高了策略的复用率；
    * fulfilled     如果不采用策略模式，那么在选策略时一般会采用多重的条件判断，采用策略模式可以避免多重条件判断，增加可维护性；
    * rejected      可扩展性好，策略可以很方便的进行扩展；
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
