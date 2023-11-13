import { validateEmail, validatePhone } from "../utils/validators.js";

import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING
  },
  email: {
    unique: true,
    type: DataTypes.STRING,
    validate: {
      validateEmail(value) {
        if (!validateEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      validatePhone(value) {
        if (!validatePhone(value)) {
          throw new Error('Phone number is invalid');
        }
      
      }
    }
  },
  password: {
    type: DataTypes.STRING
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

export default User;