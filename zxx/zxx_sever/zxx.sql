#xz_news[id/title/ctime/img_url/point/content]
SET NAMES UTF8;
DROP DATABASE IF EXISTS zxx;
CREATE DATABASE zxx CHARSET=UTF8;
USE zxx;

/****首页商品****/
CREATE TABLE zxx_index(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  index_title VARCHAR(64),
  pic VARCHAR(128)
); 
/****首页商品****/
INSERT INTO zxx_index VALUES
(NULL, '天然甜桂圆', 'http://127.0.0.1:3000/img/1.jpg'),
(NULL, '综合果仁','http://127.0.0.1:3000/img/3.jpg'),
(NULL, '巴坦木', 'http://127.0.0.1:3000/img/8.png'),
(NULL, '综合果仁', 'http://127.0.0.1:3000/img/2.jpg');

/****详情轮播****/
CREATE TABLE zxx_carousel(
   pid INT PRIMARY KEY AUTO_INCREMENT,
   pic VARCHAR(128)
);
INSERT INTO zxx_carousel VALUES
(NULL,'["http://127.0.0.1:3000/img/1.jpg","http://127.0.0.1:3000/img/2.jpg"]'),
(NULL,'["http://127.0.0.1:3000/img/3.jpg","http://127.0.0.1:3000/img/4.jpg"]'),
(NULL,'["http://127.0.0.1:3000/img/5.jpg","http://127.0.0.1:3000/img/6.jpg"]'),
(NULL,'["http://127.0.0.1:3000/img/7.jpg","http://127.0.0.1:3000/img/8.png"]');
/****详情商品****/
CREATE TABLE zxx_details(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),
  price DECIMAL(10,2),
  price_one DECIMAL(10,2),
  details VARCHAR(1280),
  details_a VARCHAR(1280),
  details_b VARCHAR(1280),
  details_c VARCHAR(1280),
  details_d VARCHAR(1280),
  details_e VARCHAR(1280),
  details_f VARCHAR(1280),
  details_i VARCHAR(1280),
  details_g VARCHAR(1280),
  details_k VARCHAR(1280)
);
INSERT INTO zxx_details VALUES
(NULL,'小山沟参茸酒','108.00','128.00','产品参数:','配料表：白酒、人参、灵芝、玛卡、鹿茸、狗杞、红枣','度数：45vol；　　酒类型：高粱酒白酒','保质期：2年','食品添加剂：无','净含量: 400ml/瓶/盒','包装种类: 玻璃瓶+纸盒','产地: 中国大陆','是否新货: 是','储藏方法：置于通风阴凉干燥处，密封保存'),
(NULL,'小山沟参茸酒(特供)','128.00','158.00','产品参数:','配料表：白酒、人参、灵芝、玛卡、鹿茸、狗杞、红枣','度数：45vol；　　酒类型：高粱酒白酒','保质期：2年','食品添加剂：无','净含量: 400ml/瓶/盒','包装种类: 玻璃瓶+红色精装纸盒','产地: 中国大陆','是否新货: 是','储藏方法：置于通风阴凉干燥处，密封保存'),
(NULL,'小山沟参茸酒','388.00','432.00','产品参数:','配料表：白酒、人参、灵芝、玛卡、鹿茸、狗杞、红枣','度数：45vol；　　酒类型：高粱酒白酒','保质期：2年','食品添加剂：无','净含量: 大于或等于1900g','包装种类:坛装+盒装 ','产地: 中国大陆','是否新货: 是','储藏方法：置于通风阴凉干燥处，密封保存'),
(NULL,'小山沟参茸酒','1000000.00','10000000000.00','产品参数:','配料表：白酒、人参、灵芝、玛卡、鹿茸、狗杞、红枣','度数：45vol；　　酒类型：高粱酒白酒','保质期：2年','食品添加剂：无','净含量: 大于或等于1900g','包装种类:坛装+盒装 ','产地: 中国大陆','是否新货: 是','储藏方法：置于通风阴凉干燥处，密封保存');
/**用户信息**/
#用户注册
# 用户登录:id name pwd 
# 用户信息:avatar phone addr..
CREATE TABLE zxx_login(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80),
  pwd  VARCHAR(32)
);
INSERT INTO zxx_login VALUES(null,'promise',md5('88888888'));
INSERT INTO zxx_login VALUES(null,'promise8',md5('88888888'));

#购物车:
#xz_cart
#id     编号
#count  数量
#price  价格
#title   商品名称
#pid    商品编号
#uid    用户编号

#SELECT id,count,price,name,pid,uid
#FROM  xz_cart
#WHERE  uid = ?
# pno2-029282823-
CREATE TABLE zxx_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  pid INT, 
  title VARCHAR(64),
  price DECIMAL(10,2),
  count INT
);
INSERT INTO zxx_cart VALUES(null,1,10,1111,1,1);
INSERT INTO zxx_cart VALUES(null,2,12,1111,1,1); 
/*
#创建表 xz_comment 评论表
CREATE TABLE xz_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(2000),
  ctime DATETIME,
  nid   INT
);
INSERT INTO xz_comment VALUES(null,'1',now(),1);
INSERT INTO xz_comment VALUES(null,'2',now(),1);
INSERT INTO xz_comment VALUES(null,'3',now(),1);
INSERT INTO xz_comment VALUES(null,'4',now(),1);
INSERT INTO xz_comment VALUES(null,'5',now(),1);
INSERT INTO xz_comment VALUES(null,'6',now(),1);
INSERT INTO xz_comment VALUES(null,'7',now(),1);
INSERT INTO xz_comment VALUES(null,'8',now(),1);
INSERT INTO xz_comment VALUES(null,'9',now(),1);
INSERT INTO xz_comment VALUES(null,'10',now(),1);
INSERT INTO xz_comment VALUES(null,'11',now(),1);
INSERT INTO xz_comment VALUES(null,'12',now(),1);
INSERT INTO xz_comment VALUES(null,'13',now(),1);
INSERT INTO xz_comment VALUES(null,'14',now(),1);
INSERT INTO xz_comment VALUES(null,'15',now(),1);
INSERT INTO xz_comment VALUES(null,'16',now(),1);
INSERT INTO xz_comment VALUES(null,'17',now(),1);
INSERT INTO xz_comment VALUES(null,'18',now(),1);
INSERT INTO xz_comment VALUES(null,'19',now(),1);
INSERT INTO xz_comment VALUES(null,'20',now(),1);
INSERT INTO xz_comment VALUES(null,'21',now(),1);
INSERT INTO xz_comment VALUES(null,'22',now(),1);

#创建商品表
#xz_product
#id       INT
#name     VARCHAR(255)
#img_url  VARCHAR(255)
#price    DECIMAL(10,2) 
#bank     INT

CREATE TABLE xz_product(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  img_url VARCHAR(255),
  price DECIMAL(10,2),
  bank  INT
);
INSERT INTO xz_product VALUES(1,'辣椒1','http://127.0.0.1:3000/img/banner1.png',10.50,1);
INSERT INTO xz_product VALUES(2,'辣椒2','http://127.0.0.1:3000/img/banner1.png',13.50,1);
INSERT INTO xz_product VALUES(3,'辣椒3','http://127.0.0.1:3000/img/banner1.png',12.50,1);
INSERT INTO xz_product VALUES(4,'辣椒4','http://127.0.0.1:3000/img/banner1.png',11.50,1);



#分析:查询购物信息
#[id,uid,price,count],[name]
#xz_cart              xz_product
#多表查询套路
#-将所有表名保存FROM 后
#FROM xz_cart,xz_product
#-为每一张表起一个别名
#FROM xz_cart c,xz_product p
#-查找两张表1个列有关系(= != <= >= )
#WHERE  c.pid = p.id 

SELECT c.uid,c.id,c.count,c.price,p.name
FROM xz_cart c,xz_product p
WHERE  c.pid = p.id 
*/
