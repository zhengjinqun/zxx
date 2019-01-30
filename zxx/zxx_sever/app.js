//vue_app_server 服务器
const express = require("express");
const bodyParser = require('body-parser');
var app = express();
app.use(express.static("public"));
app.listen(3000);
const pool = require("./pool");

//express mysql 参数 request;response
//跨域访问配置
//1:加载模块cors
const cors = require("cors");
app.use(bodyParser.urlencoded({extended:false}));
//2:配置cors
app.use(cors({
  origin:["http://127.0.0.1:3244",
         "http://localhost:8080"],//允许列表
  credentials:true   //是否验证
}))
//3.加载第三方模块：express-session
const session = require("express-session");
//4.对模块配置
app.use(session({
  secret:"128位随机字符串",   //安全令牌
  resave:true,             //请求保存
  saveUninitialized:false,   //初始化
  cookie:{                  //sessionid保存时间1天 cookie
    maxAge:1000*60*60*24
  }
}));

//功能一:首页轮播
app.get("/getImages",(req,res)=>{
  var rows = [
    {id:1,img_url:"http://127.0.0.1:3000/img/5.jpg"},
    {id:2,img_url:"http://127.0.0.1:3000/img/6.jpg"},
  ];
  res.send(rows);
});
app.get("/getImages1/:pid",(req,res)=>{
  var pid = req.params.pid;
  var sql = "select * from zxx_carousel where pid=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
});
app.get("/index_sp",(req,res)=>{
  var sql = "select * from zxx_index";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})
app.get("/details/:pid",(req,res)=>{
  var pid = req.params.pid;
  // console.log(pid);
  var sql = "select * from zxx_details where pid=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})
//功能二:新闻分页显示
app.get("/getNews",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM zxx_news";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       console.log(result[0].c);
       console.log(result)
       console.log(pageSize)
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       console.log( obj.pageCount)
       console.log(obj)
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,ctime,title,img_url,point";
    sql +=" FROM zxx_news";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
    // console.log(offset)
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
})

//功能三:用户的注册
app.post("/register",(req,res)=>{
  //1.参数 name,pwd
  var name = req.body.name;
  var pwd = req.body.pwd;
  console.log(name)
  console.log(pwd)
  //1.1.验证
  var reg = /^[a-z0-9_]{8,12}$/;
  // console.log(pwd)
  if(!reg.test(name)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  //2.sql INSERT INTO xz_login VALUES(null,?,md5(?))
  var sql = "INSERT INTO zxx_login VALUES(null,?,md5(?))";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"});
    }else{
      res.send({code:-1,msg:"注册失败"});
    }
  })
  //3.json
})

//功能四:用户名是否存在
app.get("/existsName",(req,res)=>{
  //1:参数
  var name = req.query.name;
  //2:sql
  var sql = " SELECT name FROM zxx_login";
      sql+=" WHERE name = ?";
  pool.query(sql,[name],(err,result)=>{
       if(err)throw err;
       //result node.js 数组
       //[{c:0}]
       ///result[0].c
       console.log(result.length)
       if(result.length>0){
        //  console.log(1)
         res.send({code:-1,msg:"该用户名己存在"})
       }else{
        //  console.log(2)
         res.send({code:1,msg:"欢迎使用"});
       }
  })    
  //3:json
});
//功能五:用户登陆
app.post("/login",(req,res)=>{
  //1.获取登陆参数
  var name = req.body.name;
  var pwd = req.body.pwd;
  //2.正则

  //3.创建sql
  var sql = "SELECT * FROM zxx_login WHERE name = ? AND pwd = md5(?)";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    if(result.length == 1){
      
      req.session.uid = result[0].uid;
      console.log(req.session.uid)
      console.log(req.session)
      res.send({code:1,msg:"登陆成;功"})
    }else{
      res.send({code:-1,msg:"用户名或密码有误"})
    }
  })
  //4.如果参数匹配成功将用户id保存session对象
  //5.返回结果
});
//功能六:将商品信息添加至购物车
/*app.get("/addCart",(req,res)=>{
  //1:参数 uid pid price count
  console.log(req.session)
  console.log(req.session.uid)
  var uid   = req.session.uid;
  var pid   = parseInt(req.query.pid);
  var price = parseFloat(req.query.price);
  var count = parseInt(req.query.count);
  var title = req.query.title;
  console.log(uid);
  //2:sql  INSERT
  var sql=" INSERT INTO `zxx_cart`(`id`,";
      sql+=" `uid`, `pid`,`title`, `price`,";
      sql+=" `count`) VALUES (null,?,?,?,?,?)";
      console.log(title);
  pool.query(sql,[uid,pid,title,price,count],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
  })
  //3:json {code:1,msg:"添加成功"}
});
*/
//添加商品到购物车
app.use("/addCart",(req,res)=>{
  var uid   = req.session.uid;
  if(!uid){
    res.send("添加失败");
    return;
  }
  var pid=req.query.pid;
  var price=req.query.price;
  var count=parseInt(req.query.count);
  pool.query("SELECT count as c FROM zxx_cart WHERE pid=? AND uid=?",[pid,uid],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
          var count2=result[0].c+count;
          pool.query("UPDATE zxx_cart SET count=? WHERE pid=? AND uid=?",[count2,pid,uid],(err,result)=>{
            if(err) throw err;
            if (result.affectedRows > 0) {
              res.send({ code: 1, msg: "添加成功" });
            }else{
              res.send({ code: -1, msg: "添加失败" });
            }
          })
      }else{
          pool.query("INSERT INTO `zxx_cart`(`id`, `uid`,`pid`,`price`,`count`) VALUES(null,?,?,?,?)",[uid,pid,price,count], (err, result)=>{
            if (err) throw err;
            if (result.affectedRows > 0) {
              res.send({ code: 1, msg: "添加成功" });
            }else{
              res.send({ code: -1, msg: "添加失败" });
            }
        })
      }
  })
})

//功能6.1:将商品信息添加至购物车
app.get("/update_one",(req,res)=>{
  //1:参数 uid pid price count
  var id = parseInt(req.query.id);
  var count = parseFloat(req.query.count);
  //2:sql  INSERT
  var sql=" update zxx_cart set count=? where id=?";
  pool.query(sql,[count,id],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"修改成功"});
      }else{
        res.send({code:-1,msg:"修改失败"});
      }
  })
  //3:json {code:1,msg:"添加成功"}
});
//功能七:查询商品详细信息
app.get("/getProduct",(req,res)=>{
  //1:参数 商品id
  var pid = parseInt(req.query.pid);
  // console.log(pid);
  //2:sql  SELECT id,name,price,
  // var sql =" SELECT `id`, `title`,";
  // sql+="`price`, FROM `zxx_details`";
  // sql+="WHERE pid=?";
  var sql="SELECT `pid`,`title`,`price` FROM `zxx_details` WHERE pid=?"
  pool.query(sql,[pid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result[0]})
  });
  //3:json {code:1,data:{}}
});
//功能八:查询购物车中数据
app.get("/getCartList",(req,res)=>{
  //1.参数
  var uid = req.session.uid;
  //2.sql
  var sql = "SELECT p.title,c.count,c.price,c.id FROM zxx_details p,zxx_cart c WHERE p.pid = c.pid AND c.uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
  //3.json
})

//功能九:同步购物中商品数量
app.get("/updateCart",(req,res)=>{
  //1.参数 id count
  var id = parseInt(req.query.id);
  var count =  parseInt(req.query.count);
  //2.sql UPDATE
  var sql = "UPDATE zxx_cart SET count = ? WHERE id = ?";
  pool.query(sql,[count,id],(err,result)=>{
    if (err) throw err;
    if(result.affectedRows > 0){
      res.send({code:1,msg:"更新成功"});
    }else{
      res.send({code:-1,msg:"更新失败"});
    }
  })
  //3.json
})

//功能十: 删除购物车
app.get("/cart_delect",(req,res)=>{
  var id =parseInt(req.query.id);
  console.log(id);
	var sql= "delete from zxx_cart where id=?";
	pool.query(sql,[id],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:1,msg:"删除成功"});
			console.log(id);
		}else{
			res.send({code:-1,msg:"删除失败"});
		}
	})
})

/*
//功能二:用户名是否存在
app.get("/existsName",(req,res)=>{
  //1.参数
  var name = req.query.name
  //2.sql
  var sql = "SELECT count(id) as c FROM starbucks_login WHERE name = ?";
  pool.query(sql,[name],(err,result)=>{
    if(err) throw err;
    if(result[0].c > 0){
      res.send({code:-1,msg:"该用户名已存在"});
    }else{
      res.send({code:1,msg:"欢迎使用"});
    }
  })
  //3.json
})
//功能三:用户注册
app.get("/register",(req,res)=>{
  //1.参数 name,pwd
  var name = req.query.name;
  var pwd = req.query.pwd;
  //1.1.验证
  var reg = /^[a-z0-9_]{6,12}$/;
  if(!reg.test(name)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  //2.sql INSERT INTO xz_login VALUES(null,?,md5(?))
  var sql = "INSERT INTO starbucks_login VALUES(null,?,md5(?))";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"});
    }else{
      res.send({code:-1,msg:"注册失败"});
    }
  })
  //3.json
})
//功能四:用户登录
app.get("/login",(req,res)=>{
  //1.获取登陆参数
  var name = req.query.name;
  var pwd = req.query.pwd;
  //3.创建sql
  var sql = "SELECT count(id) as c,id FROM starbucks_login WHERE name = ? AND pwd = md5(?)";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    var c = result[0].c;
    if(c == 1){
      req.session.uid = result[0].id
      res.send({code:1,msg:"登陆成功"});
    }else{
      res.send({code:-1,msg:"用户名或密码有误"})
    }
  })
  //4.如果参数匹配成功将用户id保存session对象
  //5.返回结果
});






//功能二:新闻分页显示
app.get("/getNews",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_news";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,ctime,title,img_url,point";
    sql +=" FROM xz_news";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  });
})

//功能三:依据新闻编号查询新闻详细信息
app.get("/getNewsInfo",(req,res)=>{
  //1:参数   id
  var id = req.query.id;
  //2:sql    SELECT id,title,ctime,content FROM 
  //         xz_news WHERE id = ?
  var sql=" SELECT id,title,ctime,content";
      sql+=" FROM xz_news WHERE id = ?";
  //3:json   {code:1,data:obj}
  pool.query(sql,[id],(err,result)=>{
      if(err)throw err;
      res.send({code:1,data:result[0]});
  })
})

//功能四:发表评论
app.get("/addComment",(req,res)=>{
  //1:参数 nid content
  var nid = req.query.nid;
  var content = req.query.content;
  //2:sql INSERT INTO
  var sql = "INSERT INTO xz_comment(id,content,ctime,nid)VALUES(null,?,now(),?)";
  pool.query(sql,[content,nid],(err,result)=>{
    if(err) throw err;
    //影响行数大于0添加一条
    if(result.affectedRows > 0){
      res.send({code:1,msg:"评论发送成功"});
    }else{
      res.send({code:-1,msg:"评论发送失败"});
    }
  })
  //3:json {code:1,msg:""}
})

//功能五:依据新闻编号（id）,查询
app.get("/getComments",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var nid = parseInt(req.query.nid);
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_comment";
  sql +=" WHERE nid = ?"
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,[nid],(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,ctime,content";
    sql +=" FROM xz_comment";
    sql +=" WHERE nid = ?"
    sql +=" ORDER BY id DESC"; //按编号降序排列
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
})

//功能六:商品列表
app.get("/getGoodsList",(req,res)=>{
    //1:参数       pno 页码;pageSize 页大小
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    //1.2:默认值
    if(!pno){
      pno = 1;
    }
    if(!pageSize){
      pageSize = 4;
    }
    //2:验证正则表达式
    var reg = /^[0-9]{1,}$/;
    if(!reg.test(pno)){
       res.send({code:-1,msg:"页码格式不正确"});
       return;
    }
    if(!reg.test(pageSize)){
      res.send({code:-2,msg:"页大小格式不正确"});
      return;
    }
    //3:创建sql
    //  查询总页数
    var sql = "SELECT count(id) as c FROM xz_product";
    var progress = 0; //sql执行进度
    obj = {code:1};
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         //console.log(result[0].c);
         var pageCount = Math.ceil(result[0].c/pageSize);
         obj.pageCount = pageCount;
         progress += 50;
         if(progress == 100){
          res.send(obj);
         }
    });
    //  查询当前页内容
  var sql=" SELECT id,name,img_url,price,bank";
      sql +=" FROM xz_product";
      sql +=" LIMIT ?,?"
  var offset = parseInt((pno-1)*pageSize);
  pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
    }); 
})

//功能七:将商品信息添加至购物车
app.get("/addCart",(req,res)=>{
  //1:参数 uid pid price count
  var uid   = parseInt(req.query.uid);
  var pid   = parseInt(req.query.pid);
  var price = parseFloat(req.query.price);
  var count = parseInt(req.query.count);
  //2:sql  INSERT
  var sql=" INSERT INTO `xz_cart`(`id`, ";
      sql+=" `uid`, `pid`, `price`,";
      sql+=" `count`) VALUES (null,?,?,?,?)";
  pool.query(sql,[uid,pid,price,count],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
  })
  //3:json {code:1,msg:"添加成功"}
});

//功能八:查询商品详细信息
app.get("/getProduct",(req,res)=>{
  //1:参数 商品id
  var pid = parseInt(req.query.id);
  //2:sql  SELECT id,name,price,
  var sql =" SELECT `id`, `name`, `img_url`";
  sql+=" , `price`, `bank` FROM `xz_product`"; sql+=" WHERE id=?";
  pool.query(sql,[pid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result[0]})
  });
  //3:json {code:1,data:{}}
});
*/
