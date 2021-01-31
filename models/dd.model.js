module.exports = (sequelize, Sequelize) => {
    const dd = sequelize.define("dd", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      district: {
        type: Sequelize.STRING
      },
      uname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      ad_id: {
        type: Sequelize.INTEGER
      },
      pd_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return dd;
  };