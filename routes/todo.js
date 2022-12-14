var express = require('express');
var router = express.Router();



const todoControl = require("../controllers/todoController")






/* GET users listing. */
router.get('/', todoControl.generarVistaPrincipal)

router.get('/:id', todoControl.generarVistaLista)

 //Paso intermedio para convertir el post en un get-------
router.post('/select', todoControl.selectDePostAget)
//-----------------------------------------------------


router.post('/add', todoControl.agregarTarea)

    

  router.post('/delete/:id', todoControl.borrarTarea)

  
  router.post('/update', todoControl.actualizarTarea)

 router.post('/archivar/:id', todoControl.archivarLista)

router.post("/nList", todoControl.crearLista)


router.post('/deleteList', todoControl.borrarLista)

module.exports = router;
