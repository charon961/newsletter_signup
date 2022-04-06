const bodyParser = require("body-parser");
const express=require("express");
const https=require("https"); 
const { status } = require("express/lib/response");
const { dir } = require("console");
const app=express();
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.use('*/css',express.static('public/css'));
app.use('*/images',express.static('public/images'));
const api="7e393bc95e0cb804b8e456ce296cdf08-us14"
const list_id= "4fd4c3568a"

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

})
app.post("/",function(req, res){
  var name1=req.body.fname;
  var name2=req.body.lname;
  var  email=req.body.email;
  //console.log(name1,name2,email);
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:name1,
          LNAME:name2
        }
       
      }
    ]
  }
  var jsonData=JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/"+list_id;
  const option={
    method:"POST",
    auth:"yash:7e393bc95e0cb804b8e456ce296cdf08-us14"
  }
  const request=https.request(url,option,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html")
    }
    else(
      res.sendFile(__dirname+"/failure.html")
    )
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
  })
  request.write(jsonData);
  request.end();
})
// curl --request GET \
// --url 'https://<dc>.api.mailchimp.com/3.0/' \
// --user 'anystring:TOKEN
app.listen(3000,function () {  
    console.log("Server is starting ");
});


// 7e393bc95e0cb804b8e456ce296cdf08-us14
// 4fd4c3568a