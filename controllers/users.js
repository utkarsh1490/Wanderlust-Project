const User = require("../models/user.js");

module.exports.signupForm = (req,res)=>{
    res.render("users/signup.ejs",{title:"WANDERLUST | Sign Up Form"});
};

module.exports.signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            };
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    };
};

module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs",{title:"WANDERLUST | Login Page"});
};

module.exports.login = async(req,res)=>{
    req.flash("success","You logged in");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        };
        req.flash("success","You logged out");
        res.redirect("/listings");
    });
};