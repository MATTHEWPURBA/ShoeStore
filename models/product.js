"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with the User model through the Cart model (Many-to-Many)
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'product_id',
        as: 'users'
      });

      // Define association with the Category model (Many-to-One)
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
