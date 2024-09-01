"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Cart
      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: 'user_id',
        as: 'products'
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true, // Validate that email is in a valid format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("customer", "admin"),
        defaultValue: "customer",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW, // Automatically update timestamp on row update
      },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true, // Use snake_case for column names
      tableName: "Users", // Explicitly set table name if it differs from model name
    }
  );
  return User;
};
