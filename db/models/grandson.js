'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrandSon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Grandmother}) {
      GrandSon.belongsTo(Grandmother)
      // define association here
    }
  };
  GrandSon.init({
    username: {
      type: DataTypes.TEXT,
      allowNull: false,},
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    GrandmotherId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Grandmother',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'GrandSon',
  });
  return GrandSon;
};
