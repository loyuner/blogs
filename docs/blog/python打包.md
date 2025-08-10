---
title: python打包
date: 2024-06-11
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---



## strat

突发奇想想试试能不能把<mark>python</mark>打包成exe去装杯，但是网上都是cmd命令。想找ui界面的

### 装

1. 确保我们的Python环境要大于或等于2.7，然后cmd输pip install auto-py-to-exe（我喜欢用pycharm）别问
2. auto-py-to-exe
   ![image-20250809174226968](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250809174238717.webp)

ui界面出来了

### Auto-py-to-exe部分选项介绍

接下来就是照搬了

1. Script Location：主要是指定我们要打包的Python文件

2. Onefile

   - Onefile下有两个选项，分别是：One Directory和One File。
   - 如果选择One Directory ，那么程序打包完成后会是一个文件夹的形式展现
   - 如果选择One File ，那么程序打包完成后就一个 .exe 文件

3. Console Window：主要设置打包程序运行时，是否出现控制台

   - Console Based : 当打包的程序运行时会显示一个控制台界面
   - Window Based (hide the console) : 会隐藏控制台界面，主要用于带有 GUI的python程序打包



   如果不懂，看这个
   [(1 封私信) python 可视化打包exe，这个打包神器绝了 - 知乎](https://zhuanlan.zhihu.com/p/455923497)