'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Category.hasMany(models.Room, {
        foreignKey: 'category_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};