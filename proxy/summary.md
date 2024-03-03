# Web 终极拦截技巧

来自对这篇blog https://hughfenghen.github.io/posts/2023/12/23/web-spy/ 的学习

## 概览

介绍了 web 拦截的带来的方便（以一种暴力的方式增加中间层），web 拦截的各种方法，以及一些实战案例

## 细节

拦截增加了中间层，因为现实中无法掌控系统的所有环节，通过拦截这种暴力的形式能够更方便地添加中间层

拦截的方法：
- 覆盖重写原生API，通过 apply bind 去调用原生API，类似fetch axios这类的
- 拦截/篡改 事件、DOM 元素  addEventListener#usecapture (opens new window)
    浏览器也提供了相关的hooks，去拦截相关活动，以及Proxy这种对象，
```js
  window.addEventListener('beforeunload', () => {
  debugger; 
});
```
    
- Service Worker  常用于缓存相关资源 离线访问

- 服务器拦截

  网关 篡改 HTTP请求参数，
  1.根据 HTTP 信息，可将请求转发到本地目录（静态资源），或转发到其他远程服务
  2.添加 Cookie 追踪用户，实现灰度、AB 实验分流等功能
  3.实现业务层无感知注入代码
  4.动态篡改数据，实现 Mock 功能
 

## 还介绍了注入相关拦截代码，就是如何注入JavaScript

原理是修改 html 或 js 资源的内容
- script标签  直接嵌着代码 或者 引入一个js文件
- 注入代码包裹在自执行函数中

注入时机
- 源码
- 构建、推送
- 网关注入
- devtool 插件

## 相关案例

- web container
- 沙盒
- 通用域名服务

    这部分跟我之前接触的不一样，我之前就是用whistle，代理到原先的页面去访问，他这里还讲了怎么解决HMR失效的问题，把socket.io也打过去，
    
    后面有时间回来参考下