const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.dd = require("./dd.model.js")(sequelize, Sequelize);
db.upazilla = require("./upazilla.model.js")(sequelize, Sequelize);
db.blockProgress = require("./blockProgress.model.js")(sequelize, Sequelize);
db.honey = require("./honey.model.js")(sequelize, Sequelize);
db.recievedCrops = require("./recievedCrops.model.js")(sequelize, Sequelize);
db.seedInitial = require("./seedInitial.model.js")(sequelize, Sequelize);
db.seedProgress = require("./seedProgress.model.js")(sequelize, Sequelize);
db.progress = require("./progress.model.js")(sequelize, Sequelize);
db.preservedProgress = require("./preservedProgress.model.js")(sequelize, Sequelize);


module.exports = db;