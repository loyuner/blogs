---
title: 比赛wp
date: 2024-06-11
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---



##  校内赛

- 安杯2019--easyweb

  看到这个链接我就觉得有猫病，url后面跟着这么奇怪的数据

  ```
  pVek5yTENbVUzTVRabE5gVz
  ```

  起手就是一个base64解码：MzUzNTM1MmU3MDZlNjc=，还得二次64解码得到3535352e706e67，看起来是16进制555.png
  
  我是觉得作用就是将对象包含并进行转16进制再base64编码后输出，那我想要源码了，咋办？？？
  包index.php
  
  ```
  index.php
  696e6465782e706870
  Njk2ZTY0NjU3ODJlNzA2ODcwCg==
  TmprMlpUWTBOalUzT0RKbE56QTJPRGN3
  ```
  
  放入img参数进行上传得到base64，直接解码得到
  
  ```
  <?php
  error_reporting(E_ALL || ~ E_NOTICE);
  header('content-type:text/html;charset=utf-8');
  $cmd = $_GET['cmd'];
  if (!isset($_GET['img']) || !isset($_GET['cmd'])) 
      header('Refresh:0;url=./index.php?img=TXpVek5UTTFNbVUzTURabE5qYz0&cmd=');
  $file = hex2bin(base64_decode(base64_decode($_GET['img'])));
  
  $file = preg_replace("/[^a-zA-Z0-9.]+/", "", $file);
  if (preg_match("/flag/i", $file)) {
      echo '<img src ="./ctf3.jpeg">';
      die("xixi～ no flag");
  } else {
      $txt = base64_encode(file_get_contents($file));
      echo "<img src='data:image/gif;base64," . $txt . "'></img>";
      echo "<br>";
  }
  echo $cmd;
  echo "<br>";
  if (preg_match("/ls|bash|tac|nl|more|less|head|wget|tail|vi|cat|od|grep|sed|bzmore|bzless|pcre|paste|diff|file|echo|sh|'|"|`|;|,|*|?|\|\\|n|t|r|xA0|{|}|(|)|&[^d]|@|||\$|[|]|{|}|(|)|-|<|>/i", $cmd)) {
      echo("forbid ~");
      echo "<br>";
  } else {
      if ((string)$_POST['a'] !== (string)$_POST['b'] && md5($_POST['a']) === md5($_POST['b'])) {
          echo `$cmd`;
      } else {
          echo ("md5 is funny ~");
      }
  }
  
  ?>
  <html>
  <style>
    body{
     background:url(./bj.png)  no-repeat center center;
     background-size:cover;
     background-attachment:fixed;
     background-color:#CCCCCC;
  }
  </style>
  <body>
  </body>
  </html>
  ```
  
  我是菜鸡，到这里看不太懂，但是觉得这重要
  
  ```
  if (preg_match("/ls|bash|tac|nl|more|less|head|wget|tail|vi|cat|od|grep|sed|bzmore|bzless|pcre|paste|diff|file|echo|sh|'|"|`|;|,|*|?|\|\\|n|t|r|xA0|{|}|(|)|&[^d]|@|||\$|[|]|{|}|(|)|-|<|>/i", $cmd)) {     //跟这里匹配到了就会结束代码，所以需要绕过
      echo("forbid ~");
      echo "<br>";
  } else {
      if ((string)$_POST['a'] !== (string)$_POST['b'] && md5($_POST['a']) === md5($_POST['b'])) {    //a和b的内容不一样但是需要md5值一样
          echo `$cmd`;          //将cmd当成系统命令执行并输出
      } else {
          echo ("md5 is funny ~");
      }
  }
  ```
  
  还得绕或preg_match，使用`\`绕过，因为在liunx下，l\s等于ls
  然后md5的话我实验数组绕过，这个csdn一堆
  接下来就是ls和cat了，相信大佬都会了