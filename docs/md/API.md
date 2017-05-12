### `<Form>`

名称             | 类型             | 默认值   | 描述
--------------------- | ----------------- | ----- |
horizontal            | bool             |        |  设置表单内的元素横向左右布局
inline                | bool             |       |  设置表单内元素在一行布局
values                | object           |       |  表单的值 `受控组件`
defaultValues         | object           |       |  表单的初始默认值 `非受控组件`
model                 | Schema           |       |  rsuite-schema 对象
checkDelay            | number           | 500 |  数据校验的时候，延迟处理，默认为 500 毫秒
checkTrigger          | One of 'change', 'blur', null  | 'change' |  数据校验的触发类型
onChange              | function         |       |  数据改变后的回调函数
onError               | function         |       |  校验出错的回调函数
onCheck               | function         |       |  数据校验的回调函数
errors                | object           |       |  表单错误信息

### `<Field>`

名称             | 类型             | 默认值   | 描述
--------------------- | ----------------- | ----- |
name            | string    |        |  表单元素名称
accepter        | elementType |      |  受代理的组件
