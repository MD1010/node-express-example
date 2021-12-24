import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.init";

class User extends Model {}
// !! User model represents a table in DB calles Users (plurazlized) if you want to connect a model (schema representation)
// !! to a table name called otherwise you can add another property called tableName
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false /*tableName:"my_table" */ } //!! add tableName property here!!!
);
export { User };
