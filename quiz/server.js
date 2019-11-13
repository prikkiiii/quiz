//require statements
const express=require("express");
var mongoose=require("mongoose");
const path=require("path");
var bodyParser = require('body-parser');

//assign variables
const app=express();
const router = express.Router();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/Script'));
app.use('/', router);
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// get requests to html pages
router.get('/checkout',function(req,res){
  res.sendFile(path.join(__dirname+'/views/checkout.html'));
});

router.get('/listproducts',function(req,res){
  res.sendFile(path.join(__dirname+'/views/listproducts.html'));
});
router.get('/listquestion',function(req,res){
  res.sendFile(path.join(__dirname+'/views/question.html'));
});

app.get('/login',function(req,res){
    res.render('login',{
    });
});

router.get('/page11',function(req,res){
  res.sendFile(path.join(__dirname+'/views/page11.html'));
});

app.get('/register',function(req,res){
    res.render('register',{
        topicHead : 'Register',
    });
});



// mongoose connection stuff
mongoose.connect("mongodb://localhost/shopping_portal",{ useNewUrlParser: true });
var db=mongoose.connection;
var Schema=mongoose.Schema;
mongoose.set('useFindAndModify', false);
var Questions=new Schema({
  Topic:String,
  Question:String,
  option1:String,
  option2:String,
  option3:String,
  option4:String,
  answer:String,
})
var questions=mongoose.model("questions",Questions);

//  array cart
var Cart=new Schema({
  User:String,
  Id:String,
  Name:String,
  Price:Number,
  Quantity:Number,
})
var cart=mongoose.model("cart",Cart);
app.post('/addToCart',(req,res)=>
{
  
  var myData=new cart();
  myData.User=req.body.user;
  myData.Id=req.body.id;
  myData.Name=req.body.name;
  myData.Price=req.body.price;
  myData.Quantity=req.body.quantity;
  myData.save(function(err)
  {
  //body ..
  if(!err)
  {
    
 
  }
  else {
    console.log(err)
  }
  })
    return res.redirect('listproducts');
})

app.get('/getcart',(req,res)=>
{
  cart.find({User:req.query.user},function(err,docs)
{
  res.send(docs);
})
})

app.get('/checkquantity',(req,res)=>
{
  products.findOne({_id:req.query.id},function(err,docs)
{
  if(!err)
  {
   
    res.send(docs);
  }
});
})

app.post('/removeFromCart',(req,res)=>
{
 
  filter={_id:req.body.id};
  cart.findOneAndDelete(filter,function(err)
{
  if(!err)
  {
    
  }
})
})

app.get('/checkPrevEntry',(req,res)=>
{
  
  filter={Id:req.query.id,User:req.query.user};
  cart.findOne(filter,function(err,docs){
    
    if(docs==null)
    {
      res.send({Name:null});
    }
    else {
      res.send(docs);
    }
  })
})

app.post('/removeOldEntry',(req,res)=>
{
  filter={_id:req.body.id};
  cart.findOneAndDelete(filter,function(err)
{
  if(!err)
  {
    
  }
  else {
    console.log('error',err);
  }
})
})

// array users
var User=new Schema({
  Name:String,
  Username:String,
  Password:String,
//  Password1:String,
})
var users=mongoose.model("users",User);
app.post('/registerform',(req,res)=>
{
  var myData=new users();
  myData.Name=req.body.name;
  myData.Username=req.body.username;
  myData.Password=req.body.password;
  myData.save(function(err)
{
  //body ..
  if(!err)
  {

    res.redirect('/listquestion');
  }
  else {
    console.log(err)
  }
})
})
app.get('/actualpassword',(req,res)=>
{
  usernameSent=req.query.username;

  users.findOne({Username:usernameSent},function(err,docs)
{
  
  if(docs==null)
  {
    res.send({Password: ""});
  }
  else {

    res.send(docs);
  }
})
})

app.get('/users',(req,res)=>
{
  users.find({},function(err,docs)
{
  res.send(docs);
})
})

app.get('/checkUsername',(req,res)=>
{
  inputUsername=req.query.username;

  users.findOne({Username:inputUsername},function(err,docs)
{
  if(docs==null)
  {
    
    res.send({Username:null});
  }
  else {
    
    res.send(docs);
  }
})
})

// array products
var Products=new Schema({
  Name:String,
  Description:String,
  Price:Number,
  Quantity:Number,
})
var products=mongoose.model("products",Products);
var productNumber=1;
app.get('/main',(req,res)=>
{
  products.find().sort({_id:-1}).limit(1).exec(function(err, docs) {
  productNumber=docs._id

  res.redirect('/page11');
});
});
app.get('/server',(req,res)=>
{
  questions.find().sort({_id:-1}).limit(1).exec(function(err, docs) {
  questionNumber=docs._id

  res.redirect('/page11');
});
});

app.post('/addProduct',(req,res)=>
{
  /*products.find().sort({Number:-1}).limit(1).exec(function(err, docs) {
    var productNumber=docs._id;
    console.log('latest entry   ',docs);
  });*/

  var myData=new products();
    myData.Name=req.body.Name;
    myData.Description=req.body.Descp;
    myData.Price=req.body.Price;
    myData.Quantity=req.body.Quantity;
  myData.save(function(err)
{
  //body ..---

  res.redirect('/page11');
})
})
app.post('/addQuestion',(req,res)=>
{
  /*products.find().sort({Number:-1}).limit(1).exec(function(err, docs) {
    var productNumber=docs._id;
    console.log('latest entry   ',docs);
  });*/

  var myData=new questions();
    myData.Name=req.body.Name;
    myData.Description=req.body.Descp;
    myData.option1=req.body.option1;
    myData.option2=req.body.option2;
    myData.option3=req.body.option3;
    myData.option4=req.body.option4;
    myData.answer=req.body.answer;
  myData.save(function(err)
{
  //body ..---

  res.redirect('/page11');
})
})
app.get('/questions',(req,res)=>
{
  skipno=parseInt(req.query.since);
  limitno=parseInt(req.query.per_page);
  questions.find({},null,{skip:skipno,limit:limitno},function(err,docs)
{
 //console.log('database products are',docs);
  res.send(docs);
});
})
app.get('/products',(req,res)=>
{
  skipno=parseInt(req.query.since);
  limitno=parseInt(req.query.per_page);
  products.find({},null,{skip:skipno,limit:limitno},function(err,docs)
{
 //console.log('database products are',docs);
  res.send(docs);
});
})

app.get('/getToBeEditedProduct',(req,res)=>
{
  products.findOne({_id:req.query.number},function(err,docs)
{
  if(!err)
  {
    res.send(docs);
  }
});
})
app.get('/getToBeEditedQuestion',(req,res)=>
{
  questions.findOne({_id:req.query.number},function(err,docs)
{
  if(!err)
  {
    res.send(docs);
  }
});
})
app.post('/editQuestion',(req,res)=>
{
  
  filter={_id:req.body.number};
  update={Name:req.body.name,Description:req.body.descp,Price:req.body.price,Quantity:req.body.quantity};
  questions.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    //console.log("Hooray!");
    //res.redirect('/page11');
  }
});
app.post('/editProduct',(req,res)=>
{
  
  filter={_id:req.body.number};
  update={Name:req.body.name,Description:req.body.descp,Price:req.body.price,Quantity:req.body.quantity};
  products.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    //console.log("Hooray!");
    //res.redirect('/page11');
  }
});

})
app.post('/editQuestion',(req,res)=>
{
  
  filter={_id:req.body.number};
  update={Name:req.body.name,Description:req.body.descp,option1:req.body.option1,option2:req.body.option2,option3:req.body.option3,option4:req.body.option4};
  questions.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    //console.log("Hooray!");
    //res.redirect('/page11');
  }
});

})

app.post('/deleteProduct',(req,res)=>{
 
  filter={_id:req.body.number};
  products.findOneAndDelete(filter,function(err,docs)
{
  res.redirect('/page11');
});
})
app.post('/deleteQuestion',(req,res)=>{
 
  filter={_id:req.body.number};
  questions.findOneAndDelete(filter,function(err,docs)
{
  res.redirect('/page11');
});
})

app.post('/updateProductDatabase',(req,res)=>
{
 
  filter={_id:req.body.id};
  update={Quantity:req.body.quantity};
  products.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    
    //res.redirect('/page11');
  }
});
})
app.post('/updateQuestionDatabase',(req,res)=>
{
 
  filter={_id:req.body.id};
  update={Quantity:req.body.quantity};
  questions.findOneAndUpdate(filter,update,function(err,docs)
{
  if(!err)
  {
    
    //res.redirect('/page11');
  }
});
})

app.get('/getProductCount',(req,res)=>
{
  products.countDocuments(function(err,docs)
{
 
  res.send({count2:docs})
})
})
app.get('/getQuestionCount',(req,res)=>
{
  qiestions.countDocuments(function(err,docs)
{
 
  res.send({count2:docs})
})
})
})
app.listen(3000)
