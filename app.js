var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const session = require("express-session")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');
var authRouter = require('./routes/auth').router;
var EstaAutenticado = require('./routes/auth').EstaAutenticado;
var bodyParser = require('body-parser');


var methodOverride = require('method-override');
var app = express();
const {usuario, lista} = require("./models");


var GitHubStrategy = require("passport-github2").Strategy;
// view engine setup
app.use(
  session({
    secret: "perro",
    resave:true,
    saveUninitialized:true,
    cookie:{ 
      
      maxAge: 1*60*60*1000
    }
   
  })
)

passport.use(
  new GitHubStrategy(
    {
      clientID: "4aaf466c78642cc8b2ed",
      clientSecret: "49320ff622b2ca96bc01aaf2018444c44f3257cc",
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb){
      
      
      console.log(profile);
       usuario.findOrCreate({
        where: {mail:profile.emails[0].value, nombre:profile.username }
       
      }).then(async(usuario, cargado)=>{
        console.log("lola ")
        console.log(usuario[0].id)
        await lista.findOrCreate({where:{titulo:"Tareas Asignadas", idDueño:usuario[0].id, archivada:false, tAsignadas:true}})
        return cb(null,usuario);
      });
    }
  )
)



passport.serializeUser(function(user, done){
  done(null,user);
});

passport.deserializeUser(function(user,done){
  done(null, user);
})




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo',EstaAutenticado, todoRouter);
app.use('/auth', authRouter);
app.use(express.static(__dirname + '/public'));







// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
