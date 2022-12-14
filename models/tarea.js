'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tarea.belongsTo(models.lista,{foreignKey:"idLista"})
    }
  }
  tarea.init({
    idLista:{
      type:DataTypes.INTEGER,
      allowNull:false
      
    },
    tarea:{
      type:DataTypes.STRING,
      allowNull:false
    },
    fechaCreacionTarea:{
      type:DataTypes.DATE,
      allowNull:false
    },
    prioridad:{
      type:DataTypes.STRING,
      allowNull:false
    },
    estadoTarea:{
      type:DataTypes.STRING,
      allowNull:false
    },
    fechaResolucionTarea:{
      type:DataTypes.DATE,
     
    },
    fechaLimiteTarea:{
      type:DataTypes.DATE,
      
    },
  
  idCreador:{
    type:DataTypes.INTEGER,
    allowNull:false
    
  },},
    
    {
      sequelize,
      timestmaps:false,
      createdAt:false,
      updatedAt:false,
      modelName: "tarea",
      tableName: "tareas"
    });
  return tarea;
};