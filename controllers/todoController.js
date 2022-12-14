const {lista,tarea,usuario} = require("../models")
const { QueryTypes } = require('sequelize');
const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("todo","root", "",{
  host: "localhost",
  dialect: "mysql"
})
exports.generarVistaPrincipal = async(req, res)=>{
 
    const listaListas = await lista.findAll({where: {idDueño: req.session.user}})
    
    const listasAmigos = await sequelize.query((" select listas.id, listas.idDueño, usuarios.mail, usuarios.nombre from listas inner join usuarios WHERE listas.idDueño=usuarios.id AND listas.tAsignadas=true AND listas.idDueño != "+ req.session.user), { type: QueryTypes.SELECT });
    
    console.log(listasAmigos)
    res.render("todo", {listas:listaListas, listasAmigos:listasAmigos})
  }

  exports.generarVistaLista = async(req, res)=>{

    const listaListas = await lista.findAll({where: {idDueño: req.session.user}})
    const listasAmigos = await sequelize.query(("select listas.id, listas.idDueño, usuarios.mail, usuarios.nombre from listas inner join usuarios WHERE listas.idDueño=usuarios.id AND listas.tAsignadas=true AND listas.idDueño != "+ req.session.user), { type: QueryTypes.SELECT });
    try{
    let listaN = await lista.findByPk(req.params.id)
    const tareasLista = await listaN.getTareas()
    if(listaN.titulo == "Tareas Asignadas" && listaN.idDueño!= req.session.user){
      let dueño = await usuario.findByPk(listaN.idDueño);
      res.render("todo", {tareas:tareasLista, listas:listaListas, nombre:listaN.titulo, archivada:listaN.archivada, idL: req.params.id,listasAmigos:listasAmigos, dueñoLista:dueño.nombre, miId:req.session.user})
    }else{
   
    res.render("todo", {tareas:tareasLista, listas:listaListas, nombre:listaN.titulo, archivada:listaN.archivada, idL: req.params.id,listasAmigos:listasAmigos, miId:req.session.user})}
    }catch{
      res.redirect(`/todo`)
    }
    //console.log(listaN.titulo)
    
}

exports.selectDePostAget = async(req, res)=>{
  
    res.redirect(`/todo/${req.body.opcion}`)
    
  }

  exports.agregarTarea = async function(req, res, next) {
    const nTarea= tarea.build({idLista:req.body.idList, tarea:req.body.tarea, fechaCreacionTarea: new Date(),
       prioridad: req.body.prioridad, fechaLimiteTarea:req.body.fechaLimite, estadoTarea: "sin resolver", idCreador: req.session.user})
      await nTarea.save()
      
      // abajo: si agrego una tarea a una lista terminada no archivada vuelve a estado "en proceso"
      let listaa = await lista.findByPk(nTarea.idLista);
    let tareasDeLista = await listaa.getTareas()
    if(listaa.estado == "resuelta" && !tareasDeLista.every(tarea => tarea.estadoTarea== "resuelta")){
      listaa.estado = "en proceso"
      listaa.fechaResolucion= null
      await listaa.save()
    }
    res.redirect(`/todo/${req.body.idList}`)
}


exports.borrarTarea = async (req, res, next) =>{
    const destruir = await tarea.findByPk(req.params.id)
   
    await destruir.destroy()
    res.redirect(`/todo/${destruir.idLista}`)
   
   
 }

 exports.actualizarTarea = async (req, res, next) =>{
    let actualizar = await tarea.findByPk(req.body.id)
    if(req.body.estado=="comenzar"){
      actualizar.estadoTarea="resolviendo"
    }
    else if(req.body.estado=="terminar"){
      actualizar.estadoTarea="resuelta"
      actualizar.fechaResolucionTarea = new Date()
    }
    await actualizar.save()
    //checkear si la lista esta comenzada o completa
    let listaa = await lista.findByPk(actualizar.idLista);
    let tareasDeLista = await listaa.getTareas()
    if(listaa.estado == "pendiente"){
      listaa.estado = "en proceso"
      await listaa.save()
    }
    else if(listaa.estado == "en proceso" && tareasDeLista.every(tarea => tarea.estadoTarea== "resuelta")){
      listaa.estado = "resuelta"
      listaa.fechaResolucion = new Date()
      await listaa.save()
    }
   

    
    res.redirect(`/todo/${actualizar.idLista}`)
   
   
 }


 exports.archivarLista = async (req, res, next) =>{
    let archivar = await lista.findByPk(req.params.id)
    if(archivar.fechaResolucion){
      archivar.archivada = true;
      await archivar.save()
      res.redirect(`/todo`)
    }
    else{
      res.send(`<script>alert("La lista tiene tareas pendientes"); window.location.href = "/todo/${req.params.id}"</script>; `);
    }
   
  }


  exports.crearLista = async (req, res, next) =>{
    if(req.body.nombre=="Tareas Asignadas"){
      req.body.nombre+="[PROPIA]"
    }
    let nuevaLista = lista.build({titulo:req.body.nombre, idDueño:req.session.user, fechaCreacion:new Date(), estado:"pendiente", archivada:false, tAsignadas:false})
    await nuevaLista.save()
    let fecha = ""+nuevaLista.fechaCreacion.getFullYear()+"-"+ (nuevaLista.fechaCreacion.getMonth()+1)+"-"+ nuevaLista.fechaCreacion.getDate()
    +" "+nuevaLista.fechaCreacion.getHours()+":"+ nuevaLista.fechaCreacion.getMinutes()+":"+ nuevaLista.fechaCreacion.getSeconds()
    
    let nuevaListainfo = await lista.findAll({
      where:{titulo:req.body.nombre, fechaCreacion:fecha}
    })
  
    
    res.redirect(`/todo/${nuevaListainfo[0].id}`)
   
   
  }

  exports.borrarLista = async (req, res, next) =>{
    const tareas= await tarea.findAll({
      where: {idLista: req.body.id}
    })
    if(tareas.length==0){
        const destruir = await lista.findByPk(req.body.id)
        await destruir.destroy()
        res.redirect(`/todo`)
      }
    else{
      res.send(`<script>alert("Solo las listas vacias pueden ser eliminadas"); window.location.href = "/todo/${req.body.id}"</script>; `)
    }
   
  }
   