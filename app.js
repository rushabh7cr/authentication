let  express               = require("express"),
     app                   = express(),
     mongoose              = require("mongoose"),
     passport              = require("passport"),
     bodyParser            = require("body-parser"),
     LocalStrategy         =require("passport-local"),
     User                  = require("./models/user");


app.use(bodyParser.urlencoded({extended:true}));



app.use(require("express-session")({
    secret:"testing",
    resave:false,
    saveUninitialized :false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/auth_demo_app");

app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());

//======
//Routes
//======

app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    
    
    User.register(new User({username:req.body.username}) ,req.body.password,function(err,user){
        
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.render("secret");
        });
        
    });
});

app.get("/login",function(req, res) {
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req,res){
    console.log("hello");  //wont work because we havent mentioned next in the middleware
});

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} 

app.listen(1255,function(){
    console.log("server has started..........");
});