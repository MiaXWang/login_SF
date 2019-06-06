var express=require("express"),
    app=express(),
    jsforce=require("jsforce");

//http:
/* 
var http = require('http');
var server=require("http").createServer(app); 
*/


//https:
var fs = require('fs');
var privateKey  = fs.readFileSync('cert/server.key', 'utf8');
var certificate = fs.readFileSync('cert/server.crt', 'utf8');
var https = require('https');
var credentials = {key: privateKey, cert: certificate};

//var cors=require('cors');
/* //app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  */
app.use('/',express.static(__dirname+"/www"));

//server.listen(8888);
var httpsServer=https.createServer(credentials,app);
httpsServer.listen(8888);
console.log('server is running...');

//OAuth2
const oauth2=new jsforce.OAuth2({
    loginUrl : 'https://login.salesforce.com/',
    clientId: '3MVG9IHf89I1t8hoiPsd17DiHErGyAAxaHCqn3.38w5JEdc.5V_QkFPaplQjhdLxGxZGOUrkMdZJaDjuhg1bu',
    clientSecret:'4C84E7334354120CE5889F0D8B4CE82C08EBBF4F840E0DC3F9682A243C0E4568',
    redirectUri:'/oauth2/callback'
});
app.get('/oauth2/auth', function(req, res) {
    console.log('t4');
    res.redirect(oauth2.getAuthorizationUrl({ scope : 'api id web' }));
    console.log('t5');
});

/*
app.get('/oauth2/callback', function(req, res) {
    var conn = new jsforce.Connection({ oauth2 : oauth2 });
    var code = req.param('code');
    conn.authorize(code, function(err, userInfo) {
      if (err) { return console.error(err); }
      // Now you can get the access token, refresh token, and instance URL information.
      // Save them to establish connection next time.
      console.log(conn.accessToken);
      console.log(conn.refreshToken);
      console.log(conn.instanceUrl);
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
      // ...
      //res.send('success'); // or your desired response
    });
  }); 
*/
/*
var io=require("socket.io").listen(server);
io.sockets.on("connection",function(socket){
    console.log('connected');
    socket.on("login1",function(){
        console.log('t1');
       //temp();
        //authorization();
    })
});
*/