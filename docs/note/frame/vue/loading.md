# loading

::: tip
多个loading 的状态维护问题
:::

页面里的按钮点击后和后台进行交互的时候，需要显示为loading状态。

因为element-ui中，el-button组件的loading状态可以用一个变量来控制，所以我给每个会产生交互的按钮都绑定了一个loading变量。但是因为每个页面都有按钮，按钮越来越多，每个都声明一个变量来控制十分的繁琐和重复，感觉这种方法并不理想。

我尝试用了axios的拦截器，虽然每次发起请求的时候能够拦截，但是问题就是，无法知道这个请求来自哪个按钮触发，所以也无法更新按钮的loading状态

我觉得比较理想的状态是一种类似事件委托的形式，不需要给每个按钮都设置变量，能否把这个loading状态抽离出来。于是有了以下代码：

### httm 部分
```html
<div @click="handleClick">
    <el-button type='info' class="btn" :loading="loadingBtn == 1" icon='plus'>
        上传
        <div class="click-block"  data-index="1"></div>
    </el-button>
    
    <el-button type='info' class="btn" :loading="loadingBtn == 2" icon='plus'>
        下载
        <div class="click-block"  data-index="2"></div>
    </el-button>
    <el-button type='info' class="btn" :loading="loadingBtn == 3" icon='plus'>
        编辑
        <div class="click-block"  data-index="3"></div>
    </el-button>
</div>
```
### JS 部分
```js
export default {
    data(){
        return {
            loadingBtn: 0
        }
    }
    methods: {
        handleTestBlur(e) {
            console.log(e.target);
            this.loadingBtn = e.target.getAttribute('data-index')
        },
    }
}
```
### CSS 部分
```css
<style lang='scss' scoped>

.btn {
  position: relative;
}
.click-block {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>

```
从上面的代码得出结论：控制所有的loading状态的变量只有一个，只是根据变量的值来区分每个按钮的loading的状态

所以改进为：
### httm 部分
```html
    <el-button type='info' class="btn" @click="upload" :loading="loadingBtn == 'upload'">
        上传
    </el-button>
    <el-button type='info' class="btn" @click="download" :loading="loadingBtn == 'download'">
        下载
    </el-button>
    <el-button type='info' class="btn" @click="edit" :loading="loadingBtn == 'edit'">
        编辑
    </el-button>
```
### JS 部分

```js
export default {
    data(){
        return {
            loadingBtn: ''
        }
    }
    methods: {
        // 上传
        upload() {
           this.loadingBtn = 'upload'
           //  上传完成
           this.loadingBtn = ''
        },
        // 下载  .......
        download() {}
    }
}
```