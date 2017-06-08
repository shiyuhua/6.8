var express=require("express");
var router=express.Router();

router.get("/",function(req,res){
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("后台首页")
})
router.get("/list",function(req,res){
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("后台首页列表")
})
router.get("/show",function(req,res){
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("后台内容页")
})

module.exports=router;