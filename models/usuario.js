'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usuario.hasMany(models.lista, {foreignKey:"idDueño"})
    }
  }
  usuario.init({
   
    mail:{
       type: DataTypes.STRING,
       allowNull: true
    },
    contrasenia :{
      type : DataTypes.STRING,
      allowNull: true
    },
    nombre: {
      type:DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    timestmaps:false,
    createdAt:false,
    updatedAt:false,
    modelName: 'usuario',
    tableName:"usuarios"
  });
  return usuario;
};