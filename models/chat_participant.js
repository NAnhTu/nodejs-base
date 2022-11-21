'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, chat_room}) {
      // define association here
      this.belongsTo(user, {
        foreignKey: 'user_code',
        targetKey: 'code'
      })
      this.belongsTo(chat_room, {
        foreignKey: 'chat_room_id',
      })
    }
  }
  chat_participant.init({
    chat_room_id: DataTypes.INTEGER,
    user_code: DataTypes.STRING,
    exited_at: DataTypes.DATE,
    invited_by: DataTypes.STRING,
    role: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'chat_participant',
  });
  return chat_participant;
};
