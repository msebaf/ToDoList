var express = require('express');
var router = express.Router();

const {Sequelize} = require("sequelize");
const todoControl = require("../controllers/todoController")


const sequelize = new Sequelize("todo","root", "",{
  host: "localhost",
  dialect: "mysql"
})

sequelize.authenticate().then(()=>{ console.log("conectado")}).catch(err=>{console.log("imposible conectar"); console.log(err)})
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
