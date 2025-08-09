---
title: web入门
date: 2025-05-27
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---



##       初始web（八大类）

### 1.web基础

1. http请求包

• GET：通常用于直接获取服务器上的资源

• POST：一般用于向服务器发送数据，常用于更新资源信息

• PUT：一般用于新增一个数据记录

• PATCH：一般用于修改一个数据记录。• DELETE：一般用于删除一个数据记录

• HEAD：一般用于判断一个资源是否存在

• OPTIONS：一般用于获取一个资源自身所具备的约束，如应该采用怎样的HTTP方法及自定义的请求头

• Referer：一般表示请求来源，Referer头会告诉服务器用户是从哪个页面过来的

2. http返回包

• 101 Switching Protocols：切换协议，通常见于HTTP切换为Websocket协议

• 200 OK：请求成功。• 201 Created：资源创建成果，通常用于回应动词PUT

• 204 No Content：用于不回显任何内容的情况，如网络联通性检测

• 301 Moved Permanently：永久跳转，浏览器以后访问到这个地址都会直接跳转到Location头所指向的新地址

• 302 Found：临时跳转，会跳转到Location头所指向的地址

• 404 Not Found：所请求资源不存在

• 405 Method not allowed：方法不被允许

500 Internal Server Error：服务器内部错误

• 502 Bad Gateway：网关在转发内容时出错，通常是转发的下一站——后端不可达或返回了一些奇怪的信息

### 基础解题

可以去练习ctfshow的web入门：[ctf.show](https://ctf.show/)

#### 源码类

1. [ctf.show](https://ctf.show/challenges#web1-363)
   f12直接看源码
   ![image-20250809195644398](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250809195646458.webp)

2. [ctf.show](https://ctf.show/challenges#web3-365)
   用到bp抓包，抓到直接发送看返回包

   ![image-20250809200034485](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250809200036596.webp)

3. [ctf.show](https://ctf.show/challenges#web4-366)
   robots.txt泄露

4. [ctf.show](https://ctf.show/challenges#web5-367)
   直接访问/index.phps，查看源码看到flag

5. 不一一举例了，还有  .git   .svg

6. 还有可以用Dirserch

#### 文件包含

#### 文件上传

