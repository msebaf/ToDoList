'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lista.hasMany(models.tarea, {foreignKey:"idLista"})
      lista.belongsTo(models.usuario,{foreignKey:"id"})
      // define association here
    }
  }
  lista.init({
    idDueño:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull:false
    },
    fechaCreacion:{
      type:DataTypes.DATE(6),
      allowNull:true
    },
    estado:{
      type:DataTypes.STRING,
      allowNull:true
    },
    fechaResolucion:{
      type:DataTypes.DATE
      
    },
    archivada:{
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    tAsignadas:{
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
  },
  {
    sequelize,
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    modelName: "lista",
    tableName: "listas"
  });
  return lista;
};