'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({chat_participant, chat_message}) {
      // define association here
      this.hasMany(chat_participant, {
        foreignKey: 'chat_room_id'
      })
      this.hasMany(chat_message)
    }
  }
  chat_room.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'chat_room',
  });
  return chat_room;
};
