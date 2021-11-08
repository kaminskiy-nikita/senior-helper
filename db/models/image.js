"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Grandmother}) {
      Image.belongsTo(Grandmother)
      // define association here
    }
  }
  Image.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      describe: {
        type: DataTypes.TEXT,
      },
      path: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      GrandmotherId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Grandmother",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
