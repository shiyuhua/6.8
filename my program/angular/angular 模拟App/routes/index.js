var express=require("express");
var path=require("path");
var router=express.Router();

router.get("/",function(req,res){
   res.render("index")
})
router.get("/welcome",function(req,res){
    res.render("welcome")
})
router.get("/tpl/:name",function(req,res){
   res.sendFile(path.join(process.cwd(),"public/tpl/"+req.params.name))
})

module.exports=router;