'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.place);
      this.belongsTo(models.user);
    }
  }
  review.init({
    reviewId: {
      type: DataTypes.INTEGER (100),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    rating: DataTypes.INTEGER,
    placePlaceId: DataTypes.INTEGER.UNSIGNED,
    review_message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};