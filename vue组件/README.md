# vue

## 购物车

## El表单

### provide

```javascript
// el-form
<script>
data () {
    return {
        .....
    }
}
// 在父组件上定义provide并在其中加入值 FormValue
// 在其下不知层级的子组件中取出
provide () {
    return {
        FormValue: 'form'
    }
}
</script>
```

```javascript
// el-input
<script>
data () {
    return {
        .....
    }
}
// 注入
Inject: ['someval']
</script>
```

