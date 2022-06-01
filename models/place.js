/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('place', {
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
    tableName: 'place'
  });
};
