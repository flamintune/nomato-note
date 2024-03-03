# 响应式视频 web component


## 概览

这是一个参考 https://calendar.perfplanet.com/2023/extending-responsive-video-with-html-web-components/ 这个的学习笔记

它以 web component 的方式编写了一个响应式的播放组件，会根据媒体查询来自动切换不同的视频源

## 细节

它的教程很有意思，先是头脑风暴，列出了这个组件应该有的功能，然后根据功能去划分设计函数，首先写好自然语言版本的函数，最后再转换成编程语言

最后一点非常值得参考的是，Enhancing Reponsibly 考虑到了未来，有可能web标准会支持，所以又添加了一个feature，测试当前已经支持响应式的播放器

## 困惑

存在疑惑的地方就是 previousSiblingIsPlaying 这里是不是写错了，因为