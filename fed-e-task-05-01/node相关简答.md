
1.简述 Node.js 的特点以及适用的场景。

    特点：   1. 非阻塞异步IO  ：通过非阻塞IO，使用回调，提高程序效率
                 2. 单线程：因为不用像java，php创建进程，节约内存，节省成本
                 3. 事件驱动：请求的连接提交数据等会触发事件环机制
                 4. 支持性好：在libuv支持下，可以在多个平台下运行

     场景：  1. 实时交互系统，例如直播，考试软件等，IO密集型高并发的时候
                 2. web端的多人游戏
                 3. 操作数据库、前端的模块化，脚手架等大件单页应用程序 




2.简述 Buffer 的使用.包括多种创建方式。实例方法，静态方法。


     使用：  1. 数据缓冲区，使用时候像是数组，对象存储数据
                 2. 处理二进制数据，因为JS没有专门处理二进制方法
                 3. 处理字符编码
                 4. 配合流操作，视频边放边播等

     实例方法：fill：填充数据
                      write：写入数据
                      toString：提取数据
                      slice: 截取buffer
                      indexOf：查找对应的数据
                      copy：拷贝数据

 ```
let buf = Buffer.alloc(6)

// fill  最多填充3位数据，第一参数是数值，第二是开始位置，第三是结束位置
/* buf.fill(123)
console.log(buf) 
console.log(buf.toString()) */

// write   
/* buf.write('123', 1, 4)
console.log(buf)
console.log(buf.toString()) */

// toString
/* buf = Buffer.from('buffer测试')
console.log(buf)
console.log(buf.toString('utf-8', 3, 9)) */

// slice 
/* buf = Buffer.from('buffer测试')
let b1 = buf.slice(-3)
console.log(b1)
console.log(b1.toString()) */

// indexOf
/* buf = Buffer.from('zce爱前端，爱大家，我爱所有')
console.log(buf)
console.log(buf.indexOf('爱qc', 4)) */

// copy 
let b1 = Buffer.alloc(6)
let b2 = Buffer.from('buffer测试')

b2.copy(b1, 3, 3, 6)
console.log(b1.toString())
console.log(b2.toString())


```

    静态方法：concat：合并buffer，isBuffer：判断是不是buffer

3.写出5个以上文件操作的API，并且用文字说明其功能。

   主要是使用FS模块操作文件系统
   一般操作分为同步方式或者异步方式

   读取文件

    ```
     var fs = require("fs");

// 异步读取
fs.readFile('input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");


    ```

  打开文件  fs.open(path, flags[, mode], callback)
   ```
   var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});
   ```
   获取文件信息  fs.stat(path, callback)

  ```
var fs = require('fs');

fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
    console.log(stats.isFile());         //true
})

  ```


写入文件  fs.writeFile(file, data[, options], callback)
 
 ```
var fs = require("fs");

console.log("准备写入文件");
fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});

  ```

创建文件目录   fs.mkdir(path[, options], callback)



 ```
var fs = require("fs");
// tmp 目录必须存在
console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
  ```




4.简述使用流操作的优势，以及Node中流的分类。

    优势： 1. 流操作可以分段加载数据，减少消耗内存，等待时间短
               2. 可以配合管道，进行需求加工 
               3. 使用方便，减少无用的代码，底层封装好，配合pipe便捷
    流分类：Readable - 可读操作。

                  Writable - 可写操作。

                  Duplex - 可读可写操作.

                  Transform - 操作被写入数据，然后读出结果。 

实例

```
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```




5.在数据封装与解封装过程中，针对应用层、传输层、网络层、数据链路层、物理层5层分别做了什么事情？

1. 第一步在应用层产出传输的数据，就是data表示，
2. 数据传向传输层，在这一层最常见的就是TCP和UDP协议，这两个协议都是基于端口的，端口作用就是在主机上确定应用进程，所以数据在这一层就会被包裹上目标应用端口和应用在当前的源端口
3. 数据传向网络层，主机处于不同的网络里的，所以需要通过IP协议来确定目标主机在网络，因此数据在这一层会被包裹上目标IP,端口，源主机IP，端口，确定某一个网络
4. 在数据链路层，通过MAC地址来完成寻址操作，数据会被包裹上目标Mac和源MAC,到此一条完整的数据封装完成，递给网络
5. 物理层，网线不能识别二进制数据，需要通过网卡调制之后，会形成高低电压，到达目标主机的网卡，
6. 目标的物理层 首先做数据的解调，将电压变为二进制，向上层传递至链路层，
7. 链路层会进行分析目标的MAC地址是不是当前主机的MAC地址，是的话继续向上传递网络层
8. 网络层解析目标IP是不是自己的IP，如果是继续拆包，向上传输至传输层
9. 确定当前的目标端口是不是自己的，是在拆解数据
10. 发送到应用层，这时候主机接收到另外一台主题的数据
