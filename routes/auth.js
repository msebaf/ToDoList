var express = require('express');
const passport = require('passport');
const bcrypt = require("bcrypt");
const {usuario, lista} = require("../models")
var router = express.Router();





router.get("/github", passport.authenticate("github"));

router.get("/github/callback", passport.authenticate("github", {failureRedirect: "/index"}), (req,res)=>{
    console.log("a la grande le puse cuca")
    console.log(req.user[0].id)
    req.session.user = req.user[0].id
    res.redirect(301,"/todo")}

)

router.post("/registrar", async(req,res)=>{
    try{
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.passw, salt);
    const user = await usuario.create({mail:req.body.Email, nombre:req.body.nombreUsuario, contrasenia: password })
    if(user){
        lista.create({titulo:"Tareas Asignadas", idDueño:user.id,fechaCreacion:new Date(), estado:"pendiente", archivada:false, tAsignadas:true})
    }
    
    res.send('<script>alert("Usuario Creado"); window.location.href = "/index"; </script>')
        
    }
    catch{
        res.send('<script>alert("Ya existe una cuenta con ese mail"); window.location.href = "/index"; </script>')
    }
    
})

router.post("/login", async (req,res)=>{
   
    const user = await usuario.findOne({where:{mail:req.body.mail}})
    if(user){
       const validado = await bcrypt.compare(req.body.pass, user.contrasenia)
       if(validado){
        req.session.isAuthenticated=true;
        req.session.user= user.id;
        res.redirect("/todo");
       }
       else{
        res.send('<script>alert("Password incorrectas"); window.location.href = "/index"; </script>')
       }
    }
    else{
        res.send('<script>alert("Email no registrado"); window.location.href = "/index"; </script>')
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    
    res.redirect("/")
})

var EstaAutenticado = function(req,res,next){
    console.log(req.session.user)
    console.log(req.isAuthenticated() + "----" + req.user);
    if(req.user || req.session.isAuthenticated){ return next()}
    else{
    res.redirect("/index");
    }
}

module.exports.router = router;
module.exports.EstaAutenticado = EstaAutenticado;