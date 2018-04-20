var express = require('express');
var config = require('./config/index');
var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next){
    req.url = '/index.html';
    next();
})
app.use(router);

let elmData = require('./data.json');
//使用express路由
var appRouter = express.Router();

appRouter.get('/seller',(request,response)=>{
    response.json({
        errno:0,
        data:elmData.seller
    })
})
appRouter.get('/goods',(request,response)=>{
    response.json({
        errno:0,
        data:elmData.goods
    })
})
appRouter.get('/ratings',(request,response)=>{
    response.json({
        errno:0,
        data:elmData.ratings
    })
})

app.use('/api',appRouter);

app.use(express.static('./dist'));

module.exports = app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
})
