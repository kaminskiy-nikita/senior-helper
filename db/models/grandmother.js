"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grandmother extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Image, GrandSon}) {
      Grandmother.hasMany(Image),
      Grandmother.hasMany(GrandSon)
    }
  }
  Grandmother.init(
    {
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
    },
    {
      sequelize,
      modelName: "Grandmother",
    }
  );
  return Grandmother;
};
