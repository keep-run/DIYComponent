# 要点分析
- Toast组件的使用方式和其他组件不同，Toast通过函数的形式调用。比如：`Toast.success()`;
- Toast组件，不依赖你在何处调用，最终都是渲染在同一个地方；
- Toast具备设置一个时间后自动消失的能力；
- Toast具备一键取消所有的Toast能力；
# 解决方案
- 函数调用：通过调用函数在某个DOM下插入一个节点。手动执行`ReactDOM.render(<Component {...props} />, dom)`;
- 由于Toast的渲染不依赖在何处调用，所以一般会手动创建一个空的div，插入body之后，作为插入Toast的DOM；
- 关于Toast的取消，需要维护一个队列存放当前显示的Toast，超过规定时间，从队列中移除对应的Toast。一键取消所有的Toast时，即把该队列置为空即可（或者通过`ReactDOM.unmountComponentAtNode(dom);document.body.removeChild(dom)`实现彻底的清除）。因此需要我们在不同的地方调用Toast时操作的是同一个队列（需要设计一个单例模式）。

# 参考文档
- https://segmentfault.com/a/1190000009863702