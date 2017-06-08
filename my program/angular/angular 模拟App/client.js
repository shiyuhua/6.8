//var request=require("request");
var nodegrass=require("nodegrass")
var mysql=require("./mysql.js");

var cheerio=require("cheerio");
var Iconv = require('iconv').Iconv;
//var iconv = new Iconv('GBK', 'UTF-8');
nodegrass.get("http://tech.qq.com/all/newtech.htm",function(body,info,head){

    var $=cheerio.load(body);

    //异步
    var categoryArr=[];

 $("#smnav").find("li").each(function(index,obj){

 })

   process.exit();






    var arr=[];
    $("#listZone .Q-tpList").each(function(){
        var obj={};
        var str=$(this).find("h3").find("a").html();
        obj.title=unescape(str.replace(/&#x/g,"%u").replace(/;/g,""));
        obj.url=($(this).find("h3").find("a")[0].attribs.href);

         var str=$(this).find("p").html();;
        obj.info=unescape(str.replace(/&#x/g,"%u").replace(/;/g,""));

        obj.img=$(this).find(".pic").find("img")[0].attribs.src;

        arr.push(obj);

    })
/*
    arr.forEach(function(obj,index){
       mysql.query("insert into ")
    })
*/

},"gbk")