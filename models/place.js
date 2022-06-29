// /* jshint indent: 2 */

// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('place', {
//     place_id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     place_name: {
//       type: DataTypes.STRING(45),
//       allowNull: false,
//       unique: true
//     },
//     place_location: {
//       type: DataTypes.STRING(45),
//       allowNull: false
//     },
//     place_phonenumber: {
//       type: DataTypes.INTEGER,
//       allowNull: true
//     },
//     place_category: {
//       type: DataTypes.STRING(45),
//       allowNull: false
//     }
//   }, {
//     tableName: 'place'
//   });
// };

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.review);
    }
  }
  place.init({
    place_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    place_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    place_location: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    place_phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    place_category: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'place',
  });
  return place;
};
