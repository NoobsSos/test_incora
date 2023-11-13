import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
  });

export default sequelize;